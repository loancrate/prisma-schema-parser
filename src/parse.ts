import { PrismaSchema, PrismaType, SchemaExpression } from "./ast";

import { parse } from "./__generated__/parser";

export function parsePrismaSchema(source: string): PrismaSchema {
  return parse(source) as PrismaSchema;
}

export function parsePrismaType(source: string): PrismaType {
  return parse(source, { startRule: "field_type" }) as unknown as PrismaType;
}

export function parsePrismaExpression(source: string): SchemaExpression {
  return parse(source, {
    startRule: "expression",
  }) as unknown as SchemaExpression;
}
