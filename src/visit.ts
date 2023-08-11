import { PrismaAstNode } from "./ast";

type MaybeArray<T> = T | T[] | null | undefined;

type MaybeNodes = MaybeArray<PrismaAstNode>;

const nestedNodeMap: {
  [T in PrismaAstNode as T["kind"]]: ReadonlyArray<keyof T>;
} = {
  schema: ["declarations"],
  model: ["name", "members"],
  type: ["name", "members"],
  view: ["name", "members"],
  enum: ["name", "members"],
  datasource: ["name", "members"],
  generator: ["name", "members"],
  field: ["name", "type", "attributes", "comment"],
  typeId: ["name"],
  list: ["type"],
  optional: ["type"],
  required: ["type"],
  unsupported: ["type"],
  enumValue: ["name", "attributes", "comment"],
  typeAlias: ["name", "type", "attributes"],
  config: ["name", "value", "comment"],
  blockAttribute: ["path", "args", "comment"],
  fieldAttribute: ["path", "args"],
  namedArgument: ["name", "expression"],
  name: ["value"],
  literal: ["value"],
  path: ["value"],
  array: ["items"],
  functionCall: ["path", "args"],
  commentBlock: ["comments"],
  comment: ["text"],
  docComment: ["text"],
};

function isPrismaAstNode(v: unknown): v is PrismaAstNode {
  return isRecord(v) && typeof v.kind === "string" && v.kind in nestedNodeMap;
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v != null;
}

export interface PrismaAstNodeVisitor<T extends PrismaAstNode> {
  enter?(node: T): void;
  leave?(node: T): void;
}

export type PrismaAstVisitor = {
  readonly [T in PrismaAstNode as T["kind"]]?: PrismaAstNodeVisitor<T>;
};

export function visitAst<T extends PrismaAstNode>(
  node: T,
  visitor: PrismaAstVisitor
): void {
  const nv = visitor[node.kind] as PrismaAstNodeVisitor<T> | undefined;
  nv?.enter?.(node);
  const keys = nestedNodeMap[node.kind] as ReadonlyArray<keyof T>;
  for (const key of keys) {
    const value = node[key];
    if (Array.isArray(value) && value.every(isPrismaAstNode)) {
      for (const member of value) {
        visitAst(member, visitor);
      }
    } else if (isPrismaAstNode(value)) {
      visitAst(value, visitor);
    }
  }
  nv?.leave?.(node);
}

type ReducedField<T, R> = T extends null | undefined
  ? T
  : T extends PrismaAstNode
  ? R
  : T extends ReadonlyArray<PrismaAstNode>
  ? ReadonlyArray<R>
  : T;

type ReducedNode<T, R> = {
  [K in keyof T]: ReducedField<T[K], R>;
};

export type PrismaAstNodeReducer<T extends PrismaAstNode, R> = (
  node: ReducedNode<T, R>
) => R;

export type PrismaAstReducer<R> = {
  readonly [T in PrismaAstNode as T["kind"]]?: PrismaAstNodeReducer<T, R>;
};

export function reduceAst<T extends PrismaAstNode, R>(
  node: T,
  reducer: PrismaAstReducer<R>
): R | undefined {
  const keys = nestedNodeMap[node.kind] as ReadonlyArray<keyof T>;
  const reducedNode = keys.reduce((rn, key) => {
    rn[key] = reduceField(node, key, reducer) as typeof rn[typeof key];
    return rn;
  }, {} as ReducedNode<T, R>);
  const nr = reducer[node.kind] as PrismaAstNodeReducer<T, R> | undefined;
  return nr?.(reducedNode);
}

function reduceField<T extends PrismaAstNode, R>(
  node: T,
  key: keyof T,
  reducer: PrismaAstReducer<R>
): MaybeArray<R> {
  const value = node[key] as MaybeNodes;
  if (Array.isArray(value) && value.every(isPrismaAstNode)) {
    return value.reduce<R[]>((arr, elem) => {
      const reduced = reduceAst(elem, reducer);
      if (reduced != null) {
        arr.push(reduced);
      }
      return arr;
    }, []);
  }
  if (isPrismaAstNode(value)) {
    return reduceAst(value, reducer);
  }
  return value;
}
