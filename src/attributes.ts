import { asError } from "catch-unknown";

import "error-cause/auto";
import {
  findAllAttributes,
  findArgument,
  getArgument,
  getArgumentExpression,
  getArgumentTypeError,
  getDeclarationAttributes,
  getDeclarationName,
  getModelAttributes,
  hasBlockAttributes,
  readBooleanArgument,
  readFieldReferenceArgument,
  readFieldReferencesArgument,
  readNumberArgument,
  readStringArgument,
} from "./access";
import {
  EnumDeclaration,
  EnumValue,
  FieldDeclaration,
  ModelDeclaration,
  SchemaArgument,
  SchemaAttribute,
  SchemaExpression,
} from "./ast";
import { formatAst, formatSourceRange, joinPath } from "./format";

export type SortOrder = "Asc" | "Desc";

export function isSortOrder(v: unknown): v is SortOrder {
  return v === "Asc" || v === "Desc";
}

export function asSortOrder(s: string): SortOrder {
  if (!isSortOrder(s)) {
    throw new Error(`Invalid sort order: ${s}`);
  }
  return s;
}

export interface IdFieldAttribute {
  map?: string;
  length?: number;
  sort?: SortOrder;
  clustered?: boolean;
}

export function findIdFieldAttribute(
  decl: FieldDeclaration
): IdFieldAttribute | undefined {
  return parseUniqueAttributeWith(decl, "id", parseIdFieldAttribute);
}

function parseIdFieldAttribute(attr: SchemaAttribute): IdFieldAttribute {
  return {
    map: applyOptional(findArgument(attr.args, "map"), readStringArgument),
    length: applyOptional(
      findArgument(attr.args, "length"),
      readNumberArgument
    ),
    sort: applyOptional(
      applyOptional(
        findArgument(attr.args, "sort"),
        readFieldReferenceArgument
      ),
      asSortOrder
    ),
    clustered: applyOptional(
      findArgument(attr.args, "clustered"),
      readBooleanArgument
    ),
  };
}

export interface IndexField {
  name: string;
  length?: number;
  sort?: SortOrder;
  ops?: string;
}

function readFieldArgument(arg: SchemaArgument): IndexField {
  const expr = getArgumentExpression(arg);
  if (expr.kind === "path") {
    return { name: joinPath(expr.value) };
  }
  if (expr.kind === "functionCall") {
    return {
      name: joinPath(expr.path.value),
      length: applyOptional(
        findArgument(expr.args, "length"),
        readNumberArgument
      ),
      sort: applyOptional(
        applyOptional(
          findArgument(expr.args, "sort"),
          readFieldReferenceArgument
        ),
        asSortOrder
      ),
      ops: applyOptional(findArgument(expr.args, "ops"), readOpsArgument),
    };
  }
  throw getArgumentTypeError(arg, "Field reference or function call");
}

function readFieldsArgument(arg: SchemaArgument): IndexField[] {
  const expr = getArgumentExpression(arg);
  if (expr.kind === "array") {
    return expr.items.map(readFieldArgument);
  }
  return [readFieldArgument(arg)];
}

export interface IdBlockAttribute {
  fields: IndexField[];
  name?: string;
  map?: string;
  clustered?: boolean;
}

export function findIdBlockAttribute(
  decl: ModelDeclaration
): IdBlockAttribute | undefined {
  return parseUniqueAttributeWith(decl, "id", parseIdBlockAttribute);
}

function parseIdBlockAttribute(attr: SchemaAttribute): IdBlockAttribute {
  return {
    fields: readFieldsArgument(getArgument(attr.args, "fields", 0)),
    name: applyOptional(findArgument(attr.args, "name"), readStringArgument),
    map: applyOptional(findArgument(attr.args, "map"), readStringArgument),
    clustered: applyOptional(
      findArgument(attr.args, "clustered"),
      readBooleanArgument
    ),
  };
}

export interface DefaultFieldAttribute {
  expression: SchemaExpression;
  map?: string;
}

export function findDefaultFieldAttribute(
  decl: FieldDeclaration
): DefaultFieldAttribute | undefined {
  return parseUniqueAttributeWith(decl, "default", (attr) => ({
    expression: getArgument(attr.args, "expression", 0).expression,
    map: applyOptional(findArgument(attr.args, "map"), readStringArgument),
  }));
}

export interface UniqueFieldAttribute {
  map?: string;
  length?: number;
  sort?: SortOrder;
  clustered?: boolean;
}

export function findUniqueFieldAttribute(
  decl: FieldDeclaration
): UniqueFieldAttribute | undefined {
  return parseUniqueAttributeWith(decl, "unique", parseIdFieldAttribute);
}

export interface UniqueBlockAttribute {
  fields: IndexField[];
  name?: string;
  map?: string;
  clustered?: boolean;
}

export function findUniqueBlockAttributes(
  decl: ModelDeclaration
): UniqueBlockAttribute[] {
  return parseAttributesWith(decl, "unique", parseIdBlockAttribute);
}

export interface IndexBlockAttribute {
  fields: IndexField[];
  name?: string;
  map?: string;
  clustered?: boolean;
  type?: string;
}

export function findIndexBlockAttributes(
  decl: ModelDeclaration
): IndexBlockAttribute[] {
  return parseAttributesWith(decl, "index", (attr) => ({
    ...parseIdBlockAttribute(attr),
    type: applyOptional(
      findArgument(attr.args, "type"),
      readFieldReferenceArgument
    ),
  }));
}

export function readOpsArgument(arg: SchemaArgument): string {
  const expr = getArgumentExpression(arg);
  if (expr.kind === "path") {
    return joinPath(expr.value);
  }
  if (expr.kind === "functionCall") {
    return formatAst(expr);
  }
  throw getArgumentTypeError(arg, "Identifier or function call");
}

const referentialActions = [
  "Cascade",
  "Restrict",
  "NoAction",
  "SetNull",
  "SetDefault",
] as const;

export type ReferentialAction = typeof referentialActions[number];

export function isReferentialAction(v: unknown): v is ReferentialAction {
  return referentialActions.some((a) => a === v);
}

export function asReferentialAction(s: string): ReferentialAction {
  if (!isReferentialAction(s)) {
    throw new Error(`Invalid referential action: ${s}`);
  }
  return s;
}

export interface RelationFieldAttribute {
  name?: string;
  fields?: string[];
  references?: string[];
  onDelete?: ReferentialAction;
  onUpdate?: ReferentialAction;
}

export function findRelationFieldAttribute(
  decl: FieldDeclaration
): RelationFieldAttribute | undefined {
  return parseUniqueAttributeWith(decl, "relation", (attr) => ({
    name: applyOptional(findArgument(attr.args, "name", 0), readStringArgument),
    fields: applyOptional(
      findArgument(attr.args, "fields"),
      readFieldReferencesArgument
    ),
    references: applyOptional(
      findArgument(attr.args, "references"),
      readFieldReferencesArgument
    ),
    onDelete: applyOptional(
      findArgument(attr.args, "onDelete"),
      readReferentialActionArgument
    ),
    onUpdate: applyOptional(
      findArgument(attr.args, "onUpdate"),
      readReferentialActionArgument
    ),
  }));
}

export function readReferentialActionArgument(
  arg: SchemaArgument
): ReferentialAction {
  const expr = getArgumentExpression(arg);
  if (expr.kind === "path") {
    return asReferentialAction(joinPath(expr.value));
  }
  throw getArgumentTypeError(arg, "Referential action");
}

export interface MapFieldAttribute {
  name: string;
}

export function findMapFieldAttribute(
  decl: FieldDeclaration | EnumValue
): MapFieldAttribute | undefined {
  return parseUniqueAttributeWith(decl, "map", parseMapAttribute);
}

export interface MapBlockAttribute {
  name: string;
}

export function findMapBlockAttribute(
  decl: ModelDeclaration | EnumDeclaration
): MapBlockAttribute | undefined {
  return parseUniqueAttributeWith(decl, "map", parseMapAttribute);
}

function parseMapAttribute(attr: SchemaAttribute): MapFieldAttribute {
  return {
    name: readStringArgument(getArgument(attr.args, "name", 0)),
  };
}

function parseUniqueAttributeWith<T>(
  decl: ModelDeclaration | EnumDeclaration | FieldDeclaration | EnumValue,
  name: string,
  parser: (attr: SchemaAttribute) => T
): T | undefined {
  const attrs = findAllAttributes(getDeclarationAttributes(decl), name);
  switch (attrs.length) {
    case 0:
      return undefined;
    case 1:
      return parseAttributeWith(attrs[0], decl, name, parser);
    default: {
      const prefixedName = prefixAttributeName(decl, name);
      throw new Error(`Multiple instances of ${prefixedName} attribute`);
    }
  }
}

function parseAttributesWith<T>(
  decl: ModelDeclaration,
  name: string,
  parser: (attr: SchemaAttribute) => T
): T[] {
  const attrs = findAllAttributes(getModelAttributes(decl), name);
  return attrs.map((attr) => parseAttributeWith(attr, decl, name, parser));
}

function parseAttributeWith<T>(
  attr: SchemaAttribute,
  decl: ModelDeclaration | EnumDeclaration | FieldDeclaration | EnumValue,
  name: string,
  parser: (attr: SchemaAttribute) => T
): T {
  try {
    return parser(attr);
  } catch (err) {
    const { message } = asError(err);
    const atName = prefixAttributeName(decl, name);
    const declName = getDeclarationName(decl);
    let msg = `Invalid attribute ${atName}`;
    if (attr.location) {
      msg += ` at ${formatSourceRange(attr.location)}`;
    }
    msg += ` for ${declName}: ${message}`;
    throw new Error(msg, { cause: err });
  }
}

function prefixAttributeName(
  decl: ModelDeclaration | EnumDeclaration | FieldDeclaration | EnumValue,
  name: string
): string {
  return (hasBlockAttributes(decl) ? "@@" : "@") + name;
}

export function applyOptional<T, U>(
  value: T | undefined,
  fn: (arg: T) => U
): U | undefined {
  return value !== undefined ? fn(value) : undefined;
}
