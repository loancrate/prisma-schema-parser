import { JsonArray, JsonObject } from "type-fest";
import {
  findAllAttributes,
  findFirstAttribute,
  getArgument,
  getArgumentValues,
  getDeclarationAttributes,
  getDeclarationName,
  hasBlockAttributes,
  hasFieldAttributes,
  readBooleanArgument,
  readFieldReferenceArgument,
  readFieldReferencesArgument,
  readNumberArgument,
  readStringArgument,
} from "./access";
import { SchemaAttribute } from "./ast";

describe("getDeclarationName", () => {
  test("it", () => {
    expect(
      getDeclarationName({
        kind: "datasource",
        name: { kind: "name", value: "db" },
        members: [],
      }),
    ).toBe("datasource db");
    expect(
      getDeclarationName({
        kind: "commentBlock",
        comments: [],
      }),
    ).toBe("comment block");
  });
});

describe("hasBlockAttributes", () => {
  test("true", () => {
    expect(
      hasBlockAttributes({
        kind: "enum",
        name: { kind: "name", value: "x" },
        members: [],
      }),
    ).toBe(true);
  });
  test("false", () => {
    expect(
      hasBlockAttributes({
        kind: "commentBlock",
        comments: [],
      }),
    ).toBe(false);
  });
});

describe("hasFieldAttributes", () => {
  test("true", () => {
    expect(
      hasFieldAttributes({
        kind: "enumValue",
        name: { kind: "name", value: "x" },
      }),
    ).toBe(true);
  });
  test("false", () => {
    expect(
      hasFieldAttributes({
        kind: "commentBlock",
        comments: [],
      }),
    ).toBe(false);
  });
});

describe("getDeclarationAttributes", () => {
  test("enum", () => {
    expect(
      getDeclarationAttributes({
        kind: "enum",
        name: { kind: "name", value: "x" },
        members: [
          { kind: "blockAttribute", path: { kind: "path", value: ["map"] } },
          { kind: "enumValue", name: { kind: "name", value: "y" } },
        ],
      }),
    ).toStrictEqual([
      { kind: "blockAttribute", path: { kind: "path", value: ["map"] } },
    ]);
  });
  test("enumValue", () => {
    expect(
      getDeclarationAttributes({
        kind: "enumValue",
        name: { kind: "name", value: "x" },
        attributes: [
          { kind: "fieldAttribute", path: { kind: "path", value: ["map"] } },
        ],
      }),
    ).toStrictEqual([
      { kind: "fieldAttribute", path: { kind: "path", value: ["map"] } },
    ]);
  });
  test("commentBlock", () => {
    expect(
      getDeclarationAttributes({
        kind: "commentBlock",
        comments: [],
      }),
    ).toStrictEqual([]);
  });
});

describe("findFirstAttribute", () => {
  test("it", () => {
    expect(
      findFirstAttribute(
        [
          {
            kind: "blockAttribute",
            path: { kind: "path", value: ["a"] },
            args: [{ kind: "literal", value: 1 }],
          },
          {
            kind: "blockAttribute",
            path: { kind: "path", value: ["b"] },
            args: [{ kind: "literal", value: 2 }],
          },
          {
            kind: "blockAttribute",
            path: { kind: "path", value: ["b"] },
            args: [{ kind: "literal", value: 3 }],
          },
        ],
        "b",
      ),
    ).toStrictEqual<SchemaAttribute>({
      kind: "blockAttribute",
      path: { kind: "path", value: ["b"] },
      args: [{ kind: "literal", value: 2 }],
    });
  });
});

describe("findAllAttributes", () => {
  test("some", () => {
    expect(
      findAllAttributes(
        [
          {
            kind: "blockAttribute",
            path: { kind: "path", value: ["a"] },
            args: [{ kind: "literal", value: 1 }],
          },
          {
            kind: "blockAttribute",
            path: { kind: "path", value: ["b"] },
            args: [{ kind: "literal", value: 2 }],
          },
          {
            kind: "blockAttribute",
            path: { kind: "path", value: ["b"] },
            args: [{ kind: "literal", value: 3 }],
          },
        ],
        "b",
      ),
    ).toStrictEqual<SchemaAttribute[]>([
      {
        kind: "blockAttribute",
        path: { kind: "path", value: ["b"] },
        args: [{ kind: "literal", value: 2 }],
      },
      {
        kind: "blockAttribute",
        path: { kind: "path", value: ["b"] },
        args: [{ kind: "literal", value: 3 }],
      },
    ]);
  });

  test("none", () => {
    expect(findAllAttributes(undefined, "x")).toStrictEqual([]);
  });
});

describe("getArgument", () => {
  test("not found", () => {
    expect(() => getArgument([], "name")).toThrow(
      'Argument "name" is required',
    );
  });
});

describe("readBooleanArgument", () => {
  test("boolean", () => {
    expect(readBooleanArgument({ kind: "literal", value: true })).toBe(true);
  });

  test("not boolean", () => {
    expect(() => readBooleanArgument({ kind: "literal", value: 1 })).toThrow(
      "Boolean literal expected but got literal number",
    );
  });
});

describe("readNumberArgument", () => {
  test("number", () => {
    expect(readNumberArgument({ kind: "literal", value: 1 })).toBe(1);
  });

  test("not number", () => {
    expect(() => readNumberArgument({ kind: "literal", value: true })).toThrow(
      "Number literal expected but got literal boolean",
    );
  });
});

describe("readStringArgument", () => {
  test("string", () => {
    expect(readStringArgument({ kind: "literal", value: "1" })).toBe("1");
  });

  test("not string", () => {
    expect(() => readStringArgument({ kind: "literal", value: 1 })).toThrow(
      "String literal expected but got literal number",
    );
  });
});

describe("readFieldReferenceArgument", () => {
  test("field reference", () => {
    expect(readFieldReferenceArgument({ kind: "path", value: ["x"] })).toBe(
      "x",
    );
  });

  test("not field reference", () => {
    expect(() =>
      readFieldReferenceArgument({ kind: "literal", value: "x" }),
    ).toThrow("Field reference expected but got literal string");
  });
});

describe("readFieldReferencesArgument", () => {
  test("field references", () => {
    expect(
      readFieldReferencesArgument({
        kind: "array",
        items: [
          { kind: "path", value: ["x"] },
          { kind: "path", value: ["y"] },
        ],
      }),
    ).toStrictEqual(["x", "y"]);
  });

  test("not field references", () => {
    expect(() =>
      readFieldReferencesArgument({ kind: "literal", value: "x" }),
    ).toThrow("Field references expected but got literal string");
  });
});

describe("getArgumentValues", () => {
  test("only named arguments", () => {
    expect(
      getArgumentValues([
        {
          kind: "namedArgument",
          name: { kind: "name", value: "map" },
          expression: { kind: "path", value: ["_id"] },
        },
        {
          kind: "namedArgument",
          name: { kind: "name", value: "sort" },
          expression: { kind: "literal", value: "Desc" },
        },
      ]),
    ).toStrictEqual<JsonObject>({
      map: "_id",
      sort: "Desc",
    });
  });

  test("mixed arguments", () => {
    expect(
      getArgumentValues([
        {
          kind: "array",
          items: [
            { kind: "literal", value: 1 },
            { kind: "literal", value: 2 },
          ],
        },
        {
          kind: "namedArgument",
          name: { kind: "name", value: "fn" },
          expression: {
            kind: "functionCall",
            path: { kind: "path", value: ["now"] },
          },
        },
      ]),
    ).toStrictEqual<JsonArray>([[1, 2], "now()"]);
  });
});
