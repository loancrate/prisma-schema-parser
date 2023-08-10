import { noCase } from "no-case";
import { JsonArray, JsonObject, JsonValue } from "type-fest";
import {
  BlockAttribute,
  BlockAttributed,
  EnumDeclaration,
  FieldAttributed,
  ModelDeclaration,
  NamedArgument,
  PrismaDeclaration,
  SchemaArgument,
  SchemaAttribute,
  SchemaExpression,
} from "./ast";
import { formatAst, joinPath } from "./format";

export function getDeclarationName(decl: PrismaDeclaration): string {
  switch (decl.kind) {
    case "datasource":
    case "enum":
    case "enumValue":
    case "field":
    case "generator":
    case "model":
    case "view":
    case "type":
    case "typeAlias":
      return `${noCase(decl.kind)} ${decl.name.value}`;
    case "commentBlock":
      return "comment block";
  }
}

export function hasBlockAttributes(
  decl: PrismaDeclaration
): decl is BlockAttributed {
  switch (decl.kind) {
    case "enum":
    case "model":
    case "view":
    case "type":
      return true;
  }
  return false;
}

export function hasFieldAttributes(
  decl: PrismaDeclaration
): decl is FieldAttributed {
  switch (decl.kind) {
    case "enumValue":
    case "field":
    case "typeAlias":
      return true;
  }
  return false;
}

export function getDeclarationAttributes(
  decl: PrismaDeclaration
): readonly SchemaAttribute[] {
  switch (decl.kind) {
    case "enum":
      return getEnumAttributes(decl);
    case "model":
    case "view":
    case "type":
      return getModelAttributes(decl);
    case "enumValue":
    case "field":
    case "typeAlias":
      return decl.attributes ?? [];
    default:
      return [];
  }
}

export function getModelAttributes(decl: ModelDeclaration): BlockAttribute[] {
  return decl.members.filter(
    (m): m is BlockAttribute => m.kind === "blockAttribute"
  );
}

export function getEnumAttributes(decl: EnumDeclaration): BlockAttribute[] {
  return decl.members.filter(
    (m): m is BlockAttribute => m.kind === "blockAttribute"
  );
}

export function findFirstAttribute(
  attributes: readonly SchemaAttribute[] | undefined,
  name: string
): SchemaAttribute | undefined {
  return attributes?.find(
    (attribute) => joinPath(attribute.path.value) === name
  );
}

export function findAllAttributes(
  attributes: readonly SchemaAttribute[] | undefined,
  name: string
): SchemaAttribute[] {
  return (
    attributes?.filter(
      (attribute) => joinPath(attribute.path.value) === name
    ) ?? []
  );
}

export function findArgument(
  args: readonly SchemaArgument[] | undefined,
  name: string,
  position?: number
): NamedArgument | undefined {
  if (args) {
    const namedArg = args.find(
      (arg): arg is NamedArgument =>
        arg.kind === "namedArgument" && arg.name.value === name
    );
    if (namedArg) {
      return namedArg;
    }
    const unnamedArgs = args.filter(
      (arg): arg is SchemaExpression => arg.kind !== "namedArgument"
    );
    if (position != null && position < unnamedArgs.length) {
      const expression = unnamedArgs[position];
      return {
        kind: "namedArgument",
        name: { kind: "name", value: name },
        expression,
      };
    }
  }
}

export function getArgument(
  args: readonly SchemaArgument[] | undefined,
  name: string,
  position?: number
): NamedArgument {
  const arg = findArgument(args, name, position);
  if (!arg) {
    throw new Error(`Argument "${name}" is required`);
  }
  return arg;
}

export function getArgumentExpression(arg: SchemaArgument): SchemaExpression {
  return arg.kind === "namedArgument" ? arg.expression : arg;
}

export function asBooleanArgument(
  arg: SchemaArgument | undefined
): boolean | undefined {
  if (arg) {
    const expr = getArgumentExpression(arg);
    if (expr.kind === "literal" && typeof expr.value === "boolean") {
      return expr.value;
    }
  }
}

export function readBooleanArgument(arg: SchemaArgument): boolean {
  const value = asBooleanArgument(arg);
  if (value === undefined) {
    throw getArgumentTypeError(arg, "Boolean literal");
  }
  return value;
}

export function asNumberArgument(
  arg: SchemaArgument | undefined
): number | undefined {
  if (arg) {
    const expr = getArgumentExpression(arg);
    if (expr.kind === "literal" && typeof expr.value === "number") {
      return expr.value;
    }
  }
}

export function readNumberArgument(arg: SchemaArgument): number {
  const value = asNumberArgument(arg);
  if (value === undefined) {
    throw getArgumentTypeError(arg, "Number literal");
  }
  return value;
}

export function asStringArgument(
  arg: SchemaArgument | undefined
): string | undefined {
  if (arg) {
    const expr = getArgumentExpression(arg);
    if (expr.kind === "literal" && typeof expr.value === "string") {
      return expr.value;
    }
  }
}

export function readStringArgument(arg: SchemaArgument): string {
  const value = asStringArgument(arg);
  if (value === undefined) {
    throw getArgumentTypeError(arg, "String literal");
  }
  return value;
}

export function asFieldReferenceArgument(
  arg: SchemaArgument | undefined
): string | undefined {
  if (arg) {
    const expr = getArgumentExpression(arg);
    if (expr.kind === "path") {
      return joinPath(expr.value);
    }
  }
}

export function readFieldReferenceArgument(arg: SchemaArgument): string {
  const value = asFieldReferenceArgument(arg);
  if (value === undefined) {
    throw getArgumentTypeError(arg, "Field reference");
  }
  return value;
}

export function asFieldReferencesArgument(
  arg: SchemaArgument | undefined
): string[] | undefined {
  if (arg) {
    const expr = getArgumentExpression(arg);
    if (expr.kind === "array") {
      const items = expr.items.map(asFieldReferenceArgument);
      if (items.every((item): item is string => typeof item === "string")) {
        return items;
      }
    }
  }
}

export function readFieldReferencesArgument(arg: SchemaArgument): string[] {
  const value = asFieldReferencesArgument(arg);
  if (value === undefined) {
    throw getArgumentTypeError(arg, "Field references");
  }
  return value;
}

export function getArgumentTypeError(
  arg: SchemaArgument,
  expectedType: string
): Error {
  let message = `${expectedType} expected`;
  let { kind } = arg;
  if (arg.kind === "namedArgument") {
    message += ` for argument ${arg.name.value}`;
    ({ kind } = arg.expression);
  }
  message += ` but got ${noCase(kind)}`;
  if (arg.kind === "literal") {
    message += ` ${typeof arg.value}`;
  }
  return new Error(message);
}

export function getExpressionValue(expr: SchemaExpression): JsonValue {
  switch (expr.kind) {
    case "literal":
      return expr.value;
    case "path":
      return joinPath(expr.value);
    case "array":
      return expr.items.map(getExpressionValue);
    case "functionCall":
      return formatAst(expr);
  }
}

export function getArgumentValues(
  args: SchemaArgument[]
): JsonObject | JsonArray {
  if (args.every((arg): arg is NamedArgument => arg.kind === "namedArgument")) {
    return getArgumentValuesObject(args);
  }
  return getArgumentValuesArray(args);
}

export function getArgumentValuesArray(args: SchemaArgument[]): JsonArray {
  return args.map((arg) =>
    getExpressionValue(arg.kind === "namedArgument" ? arg.expression : arg)
  );
}

export function getArgumentValuesObject(args: NamedArgument[]): JsonObject {
  return Object.fromEntries(
    args.map((arg) => {
      const name = arg.name.value;
      const value = getExpressionValue(arg.expression);
      return [name, value];
    })
  );
}
