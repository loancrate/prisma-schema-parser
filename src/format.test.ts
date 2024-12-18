import testAst from "../test-data/ast";
import { formatAst, formatSourceLocation, formatSourceRange } from "./format";
import { readFileSync } from "fs";
import { join, dirname } from "path";

const testData = join(dirname(__dirname), "test-data");

function normalizeWhitespace(s: string): string {
  // Collapse horizontal spaces and remove blank lines and trailing newlines
  return s.replace(/ +/g, " ").replace(/\n+/g, "\n").replace(/\n+$/, "");
}

describe("formatAst", () => {
  test("complete schema", () => {
    const schema = readFileSync(join(testData, "schema.prisma"), {
      encoding: "utf8",
    });
    expect(normalizeWhitespace(formatAst(testAst))).toBe(
      normalizeWhitespace(schema),
    );
  });

  test("literal", () => {
    expect(formatAst({ kind: "literal", value: 42 })).toBe("42");
  });

  test("path", () => {
    expect(formatAst({ kind: "path", value: ["foo", "bar"] })).toBe("foo.bar");
  });

  test("array", () => {
    expect(
      formatAst({
        kind: "array",
        items: [
          { kind: "literal", value: 1 },
          { kind: "literal", value: true },
        ],
      }),
    ).toBe("[1, true]");
  });

  test("function call", () => {
    expect(
      formatAst({
        kind: "functionCall",
        path: { kind: "path", value: ["foo", "bar"] },
        args: [
          { kind: "literal", value: 1 },
          {
            kind: "namedArgument",
            name: { kind: "name", value: "name" },
            expression: { kind: "literal", value: "abc" },
          },
        ],
      }),
    ).toBe('foo.bar(1, name: "abc")');
  });

  test("no-argument function call", () => {
    expect(
      formatAst({
        kind: "functionCall",
        path: { kind: "path", value: ["foo", "bar"] },
      }),
    ).toBe("foo.bar()");
  });

  test("type alias", () => {
    expect(
      formatAst({
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
      }),
    ).toBe("type UUID = String @id @default(uuid())");
  });

  test("legacy required", () => {
    expect(
      formatAst({
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
      }),
    ).toBe("model M {\n  f String!\n}");
  });
});

describe("formatSourceLocation", () => {
  test("it", () => {
    expect(formatSourceLocation({ line: 1, column: 2, offset: 3 })).toBe("1:2");
  });
});

describe("formatSourceRange", () => {
  test("same line", () => {
    expect(
      formatSourceRange({
        start: { line: 1, column: 2, offset: 3 },
        end: { line: 1, column: 5, offset: 6 },
      }),
    ).toBe("1:2-5");
  });
  test("different lines", () => {
    expect(
      formatSourceRange({
        start: { line: 1, column: 2, offset: 3 },
        end: { line: 4, column: 5, offset: 6 },
      }),
    ).toBe("1:2-4:5");
  });
});
