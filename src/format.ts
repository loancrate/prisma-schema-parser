import { PrismaAstNode, SourceLocation, SourceRange } from "./ast";
import { PrismaAstReducer, reduceAst } from "./visit";

const formatReducer: PrismaAstReducer<string> = {
  schema({ declarations }) {
    return declarations.join("\n\n");
  },
  model({ name, members }) {
    return `model ${name} {\n${members.join("\n")}\n}`;
  },
  type({ name, members }) {
    return `type ${name} {\n${members.join("\n")}\n}`;
  },
  view({ name, members }) {
    return `view ${name} {\n${members.join("\n")}\n}`;
  },
  enum({ name, members }) {
    return `enum ${name} {\n${members.join("\n")}\n}`;
  },
  datasource({ name, members }) {
    return `datasource ${name} {\n${members.join("\n")}\n}`;
  },
  generator({ name, members }) {
    return `generator ${name} {\n${members.join("\n")}\n}`;
  },
  field({ name, type, attributes, comment }) {
    let result = `  ${name} ${type}`;
    if (attributes?.length) result += ` ${attributes.join(" ")}`;
    if (comment) result += ` ${comment}`;
    return result;
  },
  typeId({ name }) {
    return name;
  },
  list({ type }) {
    return `${type}[]`;
  },
  optional({ type }) {
    return `${type}?`;
  },
  required({ type }) {
    return `${type}!`;
  },
  unsupported({ type }) {
    return `Unsupported(${type})`;
  },
  enumValue({ name, attributes, comment }) {
    let result = `  ${name}`;
    if (attributes?.length) result += ` ${attributes.join(" ")}`;
    if (comment) result += ` ${comment}`;
    return result;
  },
  typeAlias({ name, type, attributes }) {
    let result = `type ${name} = ${type}`;
    if (attributes?.length) result += ` ${attributes.join(" ")}`;
    return result;
  },
  config({ name, value, comment }) {
    let result = `  ${name} = ${value}`;
    if (comment) result += ` ${comment}`;
    return result;
  },
  blockAttribute({ path, args, comment }) {
    let result = `  @@${path}`;
    if (args?.length) result += `(${args.join(", ")})`;
    if (comment) result += ` ${comment}`;
    return result;
  },
  fieldAttribute({ path, args }) {
    let result = `@${path}`;
    if (args?.length) result += `(${args.join(", ")})`;
    return result;
  },
  namedArgument({ name, expression }) {
    return `${name}: ${expression}`;
  },
  name({ value }) {
    return value;
  },
  literal({ value }) {
    return typeof value === "string" ? JSON.stringify(value) : String(value);
  },
  path({ value }) {
    return value.join(".");
  },
  array({ items }) {
    return `[${items.join(", ")}]`;
  },
  functionCall({ path, args }) {
    return `${path}(${args?.join(", ") ?? ""})`;
  },
  commentBlock({ comments }) {
    return comments.join("\n");
  },
  comment({ text }) {
    return `// ${text}`;
  },
  docComment({ text }) {
    return `/// ${text}`;
  },
};

export function formatAst(node: PrismaAstNode): string {
  return reduceAst(node, formatReducer) || /* istanbul ignore next */ "";
}

export function formatSourceLocation(loc: SourceLocation): string {
  return `${loc.line}:${loc.column}`;
}

export function formatSourceRange(loc: SourceRange): string {
  const { start, end } = loc;
  if (start.line === end.line) {
    return `${start.line}:${start.column}-${end.column}`;
  }
  return `${formatSourceLocation(start)}-${formatSourceLocation(end)}`;
}

export function joinPath(path: string[]): string {
  return path.join(".");
}
