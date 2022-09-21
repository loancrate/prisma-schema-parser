// Based on https://github.com/prisma/prisma-engines/blob/main/libs/datamodel/schema-ast/src/parser/datamodel.pest

{
  function buildList(head, tail, index) {
    return [head].concat(extractList(tail, index));
  }

  function extractList(list, index) {
    return list.map(function(element) { return element[index]; });
  }

  function optionalList(value) {
    return value !== null ? value : [];
  }
}

schema = WS body:declarations? WS
{ return { kind: "schema", declarations: optionalList(body) }; }

declarations = head:declaration tail:(WS declaration)*
{ return buildList(head, tail, 1); }

declaration = model_declaration / enum_declaration / config_block / type_alias / comment_block

// ######################################
// Model and composite types
// ######################################

// At the syntax level, models and composite types are the same.
model_declaration = kind:("model" / "type") __ name:name __ "{" WS members:model_declaration_members? WS "}"
{ return { kind, name, members: optionalList(members), location: location() }; }

model_declaration_members = head:model_declaration_member tail:(WS model_declaration_member)*
{ return buildList(head, tail, 1); }

model_declaration_member = field_declaration / block_attribute / comment_block

field_declaration = name:name __ ":"? __ type:field_type? __ attributes:field_attributes? __ comment:trailing_comment?
{ return { kind: "field", name, type, attributes: optionalList(attributes), comment, location: location() }; }

// ######################################
// Field Type
// ######################################

field_type = list_type / optional_type / legacy_required_type / legacy_list_type / base_type

list_type = type:base_type __ "[]"
{ return { kind: "list", type }; }

optional_type = type:base_type __ "?"
{ return { kind: "optional", type }; }

legacy_required_type = type:base_type __ "!"
{ return { kind: "required", type }; }

legacy_list_type = "[" __ type:base_type __ "]"
{ return { kind: "list", type }; }

base_type = unsupported_type
  / name:name { return { kind: "typeId", name }; }

unsupported_type = "Unsupported(" __ type:string_literal __ ")"
{ return { kind: "unsupported", type }; }

// ######################################
// Type Alias
// ######################################

type_alias = "type" __ name:name __ "=" __ type:base_type __ attributes:field_attributes?
{ return { kind: "typeAlias", name, type, attributes: optionalList(attributes), location: location() }; }

// ######################################
// Configuration blocks
// ######################################

config_block = kind:("datasource" / "generator") __ name:name __ "{" WS members:config_block_members? WS "}"
{ return { kind, name, members: optionalList(members), location: location() }; }

config_block_members = head:config_block_member tail:(WS config_block_member)*
{ return buildList(head, tail, 1); }

config_block_member = key_value / comment_block

key_value = name:name __ "=" __ value:expression __ comment:trailing_comment?
{ return { kind: "config", name, value, comment, location: location() }; }

// ######################################
// Enum
// ######################################

enum_declaration = kind:"enum" __ name:name __ "{" WS members:enum_declaration_members? WS "}"
{ return { kind, name, members: optionalList(members), location: location() }; }

enum_declaration_members = head:enum_declaration_member tail:(WS enum_declaration_member)*
{ return buildList(head, tail, 1); }

enum_declaration_member = enum_value_declaration / block_attribute / comment_block

enum_value_declaration = name:name __ attributes:field_attributes? __ comment:trailing_comment?
{ return { kind: "enumValue", name, attributes: optionalList(attributes), comment, location: location() }; }

// ######################################
// Attributes
// ######################################

block_attribute = "@@" __ path:path __ args:arguments_list? __ comment:trailing_comment?
{ return { kind: "blockAttribute", path, args: optionalList(args), comment, location: location() }; }

field_attribute = "@" __ path:path __ args:arguments_list?
{ return { kind: "fieldAttribute", path, args: optionalList(args), location: location() }; }

field_attributes = head:field_attribute tail:(__ field_attribute)*
{ return buildList(head, tail, 1); }

// ######################################
// Arguments
// ######################################

arguments_list = "(" __ args:arguments? __ ","? __ ")"
{ return optionalList(args); }

arguments = head:argument __ tail:("," __ argument)*
{ return buildList(head, tail, 2); }

argument = named_argument / expression

named_argument = name:name __ ":" __ expression:expression
{ return { kind: "namedArgument", name, expression }; }

// ######################################
// Comments and Documentation Comments
// ######################################

comment_block = head:trailing_comment tail:(WS trailing_comment)*
{ return { kind: "commentBlock", comments: buildList(head, tail, 1) }; }

trailing_comment = doc_comment / comment

doc_comment = "///" __ text:doc_content
{ return { kind: "docComment", text, location: location() }; }

comment = "//" __ text:doc_content
{ return { kind: "comment", text, location: location() }; }

doc_content = (!EOL .)*
{ return text(); }

// ######################################
// Shared building blocks
// ######################################

name = id:identifier
{ return { kind: "name", value: id, location: location() }; }

path = head:identifier __ tail:("." __ identifier)*
{ return { kind: "path", value: buildList(head, tail, 2), location: location() }; }

identifier = head:[0-9a-z]i tail:[0-9a-z_-]i*
{ return head + tail.join(""); }

// ######################################
// Expressions & Functions
// ######################################

function_call = path:path __ args:arguments_list
{ return { kind: "functionCall", path, args }; }

array_expression = "[" __ items:expression_list? __ "]"
{ return { kind: "array", items: optionalList(items) }; }

expression_list = head:expression __ tail:("," __ expression)*
{ return buildList(head, tail, 2); }

expression
  = function_call
  / array_expression
  / boolean_literal
  / numeric_literal
  / string_literal
  / path

// ######################################
// Literals / Values
// ######################################

boolean_literal = ("false" / "true")
{ return { kind: "literal", value: text() === "true" }; }

numeric_literal = "-"? [0-9]+ ("." [0-9]+)?
{ return { kind: "literal", value: parseInt(text()) }; }

string_literal = '"' value:string_content '"'
{ return { kind: "literal", value }; }

string_content = ("\\" . / [^\0-\x1F"])*
{ return text(); }

__ "horizontal whitespace" = [ \t]*

WS "any whitespace" = [ \t\n\r]*

EOL "end of line" = [\n\r]
