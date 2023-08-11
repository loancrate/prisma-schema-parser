export interface PrismaSchema {
  kind: "schema";
  declarations: SchemaDeclaration[];
}

export type PrismaDeclaration =
  | SchemaDeclaration
  | FieldDeclaration
  | EnumValue;

export type SchemaDeclaration =
  | ModelDeclaration
  | EnumDeclaration
  | TypeAlias
  | ConfigBlock
  | CommentBlock;

export interface ModelDeclaration {
  kind: "model" | "type" | "view";
  name: NameNode;
  members: ModelDeclarationMember[];
  location?: SourceRange;
}

export type ModelDeclarationMember =
  | FieldDeclaration
  | BlockAttribute
  | CommentBlock;

export interface FieldDeclaration {
  kind: "field";
  name: NameNode;
  type: PrismaType;
  attributes?: FieldAttribute[];
  comment?: TrailingComment | null;
  location?: SourceRange;
}

export type PrismaType = BaseType | ListType | OptionalType | RequiredType;

export type BaseType = TypeId | UnsupportedType;

export interface TypeId {
  kind: "typeId";
  name: NameNode;
}

export interface UnsupportedType {
  kind: "unsupported";
  type: ScalarLiteral<string>;
}

export interface ListType {
  kind: "list";
  type: BaseType;
}

export interface OptionalType {
  kind: "optional";
  type: BaseType;
}

export interface RequiredType {
  kind: "required";
  type: BaseType;
}

export interface EnumDeclaration {
  kind: "enum";
  name: NameNode;
  members: EnumDeclarationMember[];
  location?: SourceRange;
}

export type EnumDeclarationMember = EnumValue | BlockAttribute | CommentBlock;

export interface EnumValue {
  kind: "enumValue";
  name: NameNode;
  attributes?: FieldAttribute[];
  comment?: TrailingComment | null;
  location?: SourceRange;
}

export interface TypeAlias {
  kind: "typeAlias";
  name: NameNode;
  type: BaseType;
  attributes?: FieldAttribute[];
  location?: SourceRange;
}

export interface ConfigBlock {
  kind: "datasource" | "generator";
  name: NameNode;
  members: ConfigBlockMember[];
  location?: SourceRange;
}

export type ConfigBlockMember = Config | CommentBlock;

export interface Config {
  kind: "config";
  name: NameNode;
  value: SchemaExpression;
  comment?: TrailingComment | null;
  location?: SourceRange;
}

export type SchemaAttribute = BlockAttribute | FieldAttribute;

export type BlockAttributed = ModelDeclaration | EnumDeclaration;

export interface BlockAttribute {
  kind: "blockAttribute";
  path: PathExpression;
  args?: SchemaArgument[];
  comment?: TrailingComment | null;
  location?: SourceRange;
}

export type FieldAttributed = FieldDeclaration | EnumValue | TypeAlias;

export interface FieldAttribute {
  kind: "fieldAttribute";
  path: PathExpression;
  args?: SchemaArgument[];
  location?: SourceRange;
}

export type SchemaArgument = NamedArgument | SchemaExpression;

export interface NamedArgument {
  kind: "namedArgument";
  name: NameNode;
  expression: SchemaExpression;
}

export interface NameNode {
  kind: "name";
  value: string;
  location?: SourceRange;
}

export type SchemaExpression =
  | ScalarLiteral
  | PathExpression
  | ArrayExpression
  | FunctionCall;

export interface ScalarLiteral<T = string | number | boolean> {
  kind: "literal";
  value: T;
}

export interface PathExpression {
  kind: "path";
  value: string[];
  location?: SourceRange;
}

export interface ArrayExpression {
  kind: "array";
  items: SchemaExpression[];
}

export interface FunctionCall {
  kind: "functionCall";
  path: PathExpression;
  args?: SchemaArgument[];
}

export interface CommentBlock {
  kind: "commentBlock";
  comments: TrailingComment[];
}

export type TrailingComment = Comment | DocComment;

export interface Comment {
  kind: "comment";
  text: string;
  location?: SourceRange;
}

export interface DocComment {
  kind: "docComment";
  text: string;
  location?: SourceRange;
}

export interface SourceRange {
  start: SourceLocation;
  end: SourceLocation;
}

export interface SourceLocation {
  offset: number;
  line: number;
  column: number;
}

export type PrismaAstNode =
  | PrismaSchema
  | PrismaDeclaration
  | PrismaType
  | SchemaAttribute
  | SchemaArgument
  | Config
  | NameNode
  | TrailingComment;
