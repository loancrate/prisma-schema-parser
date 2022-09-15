import { readFileSync } from "fs";
import { dirname, join } from "path";
import testAst from "../test-data/ast";
import {
  PrismaAstNode,
  PrismaSchema,
  PrismaType,
  SchemaExpression,
} from "./ast";
import {
  parsePrismaExpression,
  parsePrismaSchema,
  parsePrismaType,
} from "./parse";

const testData = join(dirname(__dirname), "test-data");

// Strip location and null/undefined from AST nodes for simpler testing
function stripAst<T extends PrismaAstNode>(node: T): T {
  return Object.entries(node).reduce<Record<string, unknown>>((obj, [k, v]) => {
    if (k !== "location" && v != null) {
      if (typeof v === "object") {
        if (!Array.isArray(v)) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          v = stripAst(v);
        } else if (v.length > 0) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          v = v.map((e) => (typeof e === "object" ? stripAst(e) : e));
        }
      }
      obj[k] = v;
    }
    return obj;
  }, {}) as T;
}

describe("parsePrismaSchema", () => {
  test("empty schema", () => {
    expect(parsePrismaSchema("")).toStrictEqual<PrismaSchema>({
      kind: "schema",
      declarations: [],
    });
  });

  test("complete schema", () => {
    const ast = parsePrismaSchema(
      readFileSync(join(testData, "schema.prisma"), { encoding: "utf8" })
    );
    // Uncomment temporarily to fix test-data/ast.json
    // console.log(JSON.stringify(ast));
    expect(JSON.parse(JSON.stringify(ast))).toStrictEqual(testAst);
  });

  test("type alias", () => {
    const ast = parsePrismaSchema(`type UUID = String @id @default(uuid())`);
    expect(stripAst(ast)).toStrictEqual<PrismaSchema>({
      kind: "schema",
      declarations: [
        {
          kind: "typeAlias",
          name: { kind: "name", value: "UUID" },
          type: {
            kind: "typeId",
            name: { kind: "name", value: "String" },
          },
          attributes: [
            {
              kind: "fieldAttribute",
              path: { kind: "path", value: ["id"] },
              args: [],
            },
            {
              kind: "fieldAttribute",
              path: { kind: "path", value: ["default"] },
              args: [
                {
                  kind: "functionCall",
                  path: { kind: "path", value: ["uuid"] },
                  args: [],
                },
              ],
            },
          ],
        },
      ],
    });
  });

  test("legacy required", () => {
    const ast = parsePrismaSchema(`
model M {
  f String!
}
`);
    expect(stripAst(ast)).toStrictEqual<PrismaSchema>({
      kind: "schema",
      declarations: [
        {
          kind: "model",
          name: { kind: "name", value: "M" },
          members: [
            {
              kind: "field",
              name: { kind: "name", value: "f" },
              type: {
                kind: "required",
                type: {
                  kind: "typeId",
                  name: { kind: "name", value: "String" },
                },
              },
              attributes: [],
            },
          ],
        },
      ],
    });
  });

  test("legacy list", () => {
    const ast = parsePrismaSchema(`
model M {
  f [String]
}
`);
    expect(stripAst(ast)).toStrictEqual<PrismaSchema>({
      kind: "schema",
      declarations: [
        {
          kind: "model",
          name: { kind: "name", value: "M" },
          members: [
            {
              kind: "field",
              name: { kind: "name", value: "f" },
              type: {
                kind: "list",
                type: {
                  kind: "typeId",
                  name: { kind: "name", value: "String" },
                },
              },
              attributes: [],
            },
          ],
        },
      ],
    });
  });
});

describe("parsePrismaType", () => {
  test("base type", () => {
    const id = "Identifier";
    expect(stripAst(parsePrismaType(id))).toStrictEqual<PrismaType>({
      kind: "typeId",
      name: { kind: "name", value: id },
    });
  });

  test("optional", () => {
    const id = "Identifier";
    expect(stripAst(parsePrismaType(`${id}?`))).toStrictEqual<PrismaType>({
      kind: "optional",
      type: {
        kind: "typeId",
        name: { kind: "name", value: id },
      },
    });
  });

  test("list", () => {
    const id = "Identifier";
    expect(stripAst(parsePrismaType(`${id}[]`))).toStrictEqual<PrismaType>({
      kind: "list",
      type: {
        kind: "typeId",
        name: { kind: "name", value: id },
      },
    });
  });
});

describe("parsePrismaExpression", () => {
  test("path", () => {
    expect(
      stripAst(parsePrismaExpression("foo.bar"))
    ).toStrictEqual<SchemaExpression>({
      kind: "path",
      value: ["foo", "bar"],
    });
  });

  test("array", () => {
    expect(
      stripAst(parsePrismaExpression('["foo", "bar"]'))
    ).toStrictEqual<SchemaExpression>({
      kind: "array",
      items: [
        {
          kind: "literal",
          value: "foo",
        },
        {
          kind: "literal",
          value: "bar",
        },
      ],
    });
  });

  test("literal", () => {
    expect(
      stripAst(parsePrismaExpression('"foo.bar"'))
    ).toStrictEqual<SchemaExpression>({
      kind: "literal",
      value: "foo.bar",
    });
  });

  test("function call", () => {
    expect(
      stripAst(parsePrismaExpression('foo("bar")'))
    ).toStrictEqual<SchemaExpression>({
      kind: "functionCall",
      path: { kind: "path", value: ["foo"] },
      args: [{ kind: "literal", value: "bar" }],
    });
  });
});
