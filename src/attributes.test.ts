import {
  DefaultFieldAttribute,
  findDefaultFieldAttribute,
  findIdBlockAttribute,
  findIdFieldAttribute,
  findIndexBlockAttributes,
  findMapBlockAttribute,
  findMapFieldAttribute,
  findRelationFieldAttribute,
  findUniqueBlockAttributes,
  findUniqueFieldAttribute,
  IdBlockAttribute,
  IdFieldAttribute,
  IndexBlockAttribute,
  MapBlockAttribute,
  MapFieldAttribute,
  RelationFieldAttribute,
  UniqueBlockAttribute,
  UniqueFieldAttribute,
} from "./attributes";

describe("findIdFieldAttribute", () => {
  test("it", () => {
    expect(
      findIdFieldAttribute({
        kind: "field",
        name: { kind: "name", value: "id" },
        type: { kind: "typeId", name: { kind: "name", value: "String" } },
        attributes: [
          {
            kind: "fieldAttribute",
            path: { kind: "path", value: ["id"] },
            args: [
              {
                kind: "namedArgument",
                name: { kind: "name", value: "map" },
                expression: { kind: "literal", value: "_id" },
              },
              {
                kind: "namedArgument",
                name: { kind: "name", value: "length" },
                expression: { kind: "literal", value: 10 },
              },
              {
                kind: "namedArgument",
                name: { kind: "name", value: "sort" },
                expression: { kind: "path", value: ["Desc"] },
              },
              {
                kind: "namedArgument",
                name: { kind: "name", value: "clustered" },
                expression: { kind: "literal", value: true },
              },
            ],
          },
        ],
      })
    ).toStrictEqual<IdFieldAttribute>({
      map: "_id",
      length: 10,
      sort: "Desc",
      clustered: true,
    });
  });

  test("invalid sort", () => {
    expect(() =>
      findIdFieldAttribute({
        kind: "field",
        name: { kind: "name", value: "id" },
        type: { kind: "typeId", name: { kind: "name", value: "String" } },
        attributes: [
          {
            kind: "fieldAttribute",
            path: { kind: "path", value: ["id"] },
            args: [
              {
                kind: "namedArgument",
                name: { kind: "name", value: "sort" },
                expression: { kind: "path", value: ["none"] },
              },
            ],
          },
        ],
      })
    ).toThrow("Invalid attribute @id for field id: Invalid sort order: none");
  });
});

describe("findIdBlockAttribute", () => {
  test("it", () => {
    expect(
      findIdBlockAttribute({
        kind: "model",
        name: { kind: "name", value: "M" },
        members: [
          {
            kind: "blockAttribute",
            path: { kind: "path", value: ["id"] },
            args: [
              {
                kind: "array",
                items: [
                  { kind: "path", value: ["a"] },
                  { kind: "path", value: ["b"] },
                ],
              },
            ],
          },
        ],
      })
    ).toStrictEqual<IdBlockAttribute>({
      fields: [{ name: "a" }, { name: "b" }],
      name: undefined,
      map: undefined,
      clustered: undefined,
    });
  });
});

describe("findDefaultFieldAttribute", () => {
  test("it", () => {
    expect(
      findDefaultFieldAttribute({
        kind: "field",
        name: { kind: "name", value: "id" },
        type: { kind: "typeId", name: { kind: "name", value: "String" } },
        attributes: [
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
      })
    ).toStrictEqual<DefaultFieldAttribute>({
      expression: {
        kind: "functionCall",
        path: { kind: "path", value: ["uuid"] },
        args: [],
      },
      map: undefined,
    });
  });
});

describe("findUniqueFieldAttribute", () => {
  test("it", () => {
    expect(
      findUniqueFieldAttribute({
        kind: "field",
        name: { kind: "name", value: "uniqueKey" },
        type: { kind: "typeId", name: { kind: "name", value: "String" } },
        attributes: [
          {
            kind: "fieldAttribute",
            path: { kind: "path", value: ["unique"] },
          },
        ],
      })
    ).toStrictEqual<UniqueFieldAttribute>({
      map: undefined,
      length: undefined,
      sort: undefined,
      clustered: undefined,
    });
  });
});

describe("findUniqueBlockAttributes", () => {
  test("it", () => {
    expect(
      findUniqueBlockAttributes({
        kind: "model",
        name: { kind: "name", value: "M" },
        members: [
          {
            kind: "blockAttribute",
            path: { kind: "path", value: ["unique"] },
            args: [
              {
                kind: "array",
                items: [
                  { kind: "path", value: ["a"] },
                  { kind: "path", value: ["b"] },
                ],
              },
            ],
          },
        ],
      })
    ).toStrictEqual<UniqueBlockAttribute[]>([
      {
        fields: [{ name: "a" }, { name: "b" }],
        name: undefined,
        map: undefined,
        clustered: undefined,
      },
    ]);
  });
});

describe("findIndexBlockAttributes", () => {
  test("it", () => {
    expect(
      findIndexBlockAttributes({
        kind: "model",
        name: { kind: "name", value: "M" },
        members: [
          {
            kind: "blockAttribute",
            path: { kind: "path", value: ["index"] },
            args: [
              {
                kind: "array",
                items: [
                  { kind: "path", value: ["a"] },
                  {
                    kind: "functionCall",
                    path: { kind: "path", value: ["b"] },
                    args: [
                      {
                        kind: "namedArgument",
                        name: { kind: "name", value: "ops" },
                        expression: { kind: "path", value: ["op"] },
                      },
                    ],
                  },
                ],
              },
              {
                kind: "namedArgument",
                name: { kind: "name", value: "type" },
                expression: { kind: "path", value: ["BTree"] },
              },
            ],
          },
          {
            kind: "blockAttribute",
            path: { kind: "path", value: ["index"] },
            args: [
              {
                kind: "array",
                items: [
                  { kind: "path", value: ["c"] },
                  {
                    kind: "functionCall",
                    path: { kind: "path", value: ["d"] },
                    args: [
                      {
                        kind: "namedArgument",
                        name: { kind: "name", value: "ops" },
                        expression: {
                          kind: "functionCall",
                          path: { kind: "path", value: ["op"] },
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            kind: "blockAttribute",
            path: { kind: "path", value: ["index"] },
            args: [{ kind: "path", value: ["e"] }],
          },
        ],
      })
    ).toStrictEqual<IndexBlockAttribute[]>([
      {
        fields: [
          { name: "a" },
          { name: "b", length: undefined, sort: undefined, ops: "op" },
        ],
        name: undefined,
        map: undefined,
        clustered: undefined,
        type: "BTree",
      },
      {
        fields: [
          { name: "c" },
          { name: "d", length: undefined, sort: undefined, ops: "op()" },
        ],
        name: undefined,
        map: undefined,
        clustered: undefined,
        type: undefined,
      },
      {
        fields: [{ name: "e" }],
        name: undefined,
        map: undefined,
        clustered: undefined,
        type: undefined,
      },
    ]);
  });

  test("invalid field", () => {
    expect(() =>
      findIndexBlockAttributes({
        kind: "model",
        name: { kind: "name", value: "M" },
        members: [
          {
            kind: "blockAttribute",
            path: { kind: "path", value: ["index"] },
            args: [
              {
                kind: "array",
                items: [{ kind: "literal", value: "a" }],
              },
            ],
            location: {
              start: { offset: 647, line: 31, column: 3 },
              end: { offset: 667, line: 31, column: 23 },
            },
          },
        ],
      })
    ).toThrow(
      "Invalid attribute @@index at 31:3-23 for model M: Field reference or function call expected but got literal"
    );
  });

  test("invalid ops", () => {
    expect(() =>
      findIndexBlockAttributes({
        kind: "model",
        name: { kind: "name", value: "M" },
        members: [
          {
            kind: "blockAttribute",
            path: { kind: "path", value: ["index"] },
            args: [
              {
                kind: "array",
                items: [
                  { kind: "path", value: ["a"] },
                  {
                    kind: "functionCall",
                    path: { kind: "path", value: ["b"] },
                    args: [
                      {
                        kind: "namedArgument",
                        name: { kind: "name", value: "ops" },
                        expression: { kind: "literal", value: 42 },
                      },
                    ],
                  },
                ],
              },
            ],
            location: {
              start: { offset: 647, line: 31, column: 3 },
              end: { offset: 667, line: 31, column: 23 },
            },
          },
        ],
      })
    ).toThrow(
      "Invalid attribute @@index at 31:3-23 for model M: Identifier or function call expected for argument ops but got literal"
    );
  });
});

describe("findRelationFieldAttribute", () => {
  test("it", () => {
    expect(
      findRelationFieldAttribute({
        kind: "field",
        name: { kind: "name", value: "parent" },
        type: { kind: "typeId", name: { kind: "name", value: "MyModel" } },
        attributes: [
          {
            kind: "fieldAttribute",
            path: { kind: "path", value: ["relation"] },
            args: [
              {
                kind: "namedArgument",
                name: { kind: "name", value: "fields" },
                expression: {
                  kind: "array",
                  items: [{ kind: "path", value: ["parentId"] }],
                },
              },
              {
                kind: "namedArgument",
                name: { kind: "name", value: "references" },
                expression: {
                  kind: "array",
                  items: [{ kind: "path", value: ["id"] }],
                },
              },
              {
                kind: "namedArgument",
                name: { kind: "name", value: "onDelete" },
                expression: {
                  kind: "path",
                  value: ["Restrict"],
                },
              },
              {
                kind: "namedArgument",
                name: { kind: "name", value: "onUpdate" },
                expression: {
                  kind: "path",
                  value: ["Cascade"],
                },
              },
            ],
          },
        ],
      })
    ).toStrictEqual<RelationFieldAttribute>({
      name: undefined,
      fields: ["parentId"],
      references: ["id"],
      onDelete: "Restrict",
      onUpdate: "Cascade",
    });
  });

  test("invalid referential action", () => {
    expect(() =>
      findRelationFieldAttribute({
        kind: "field",
        name: { kind: "name", value: "parent" },
        type: { kind: "typeId", name: { kind: "name", value: "MyModel" } },
        attributes: [
          {
            kind: "fieldAttribute",
            path: { kind: "path", value: ["relation"] },
            args: [
              {
                kind: "namedArgument",
                name: { kind: "name", value: "onDelete" },
                expression: {
                  kind: "path",
                  value: ["Explode"],
                },
              },
            ],
          },
        ],
      })
    ).toThrow(
      "Invalid attribute @relation for field parent: Invalid referential action: Explode"
    );
  });

  test("invalid referential action kind", () => {
    expect(() =>
      findRelationFieldAttribute({
        kind: "field",
        name: { kind: "name", value: "parent" },
        type: { kind: "typeId", name: { kind: "name", value: "MyModel" } },
        attributes: [
          {
            kind: "fieldAttribute",
            path: { kind: "path", value: ["relation"] },
            args: [
              {
                kind: "namedArgument",
                name: { kind: "name", value: "onDelete" },
                expression: {
                  kind: "literal",
                  value: "Cascade",
                },
              },
            ],
          },
        ],
      })
    ).toThrow(
      "Invalid attribute @relation for field parent: Referential action expected for argument onDelete but got literal"
    );
  });
});

describe("findMapFieldAttribute", () => {
  test("one", () => {
    expect(
      findMapFieldAttribute({
        kind: "field",
        name: { kind: "name", value: "id" },
        type: { kind: "typeId", name: { kind: "name", value: "String" } },
        attributes: [
          {
            kind: "fieldAttribute",
            path: { kind: "path", value: ["map"] },
            args: [{ kind: "literal", value: "_id" }],
          },
        ],
      })
    ).toStrictEqual<MapFieldAttribute>({
      name: "_id",
    });
  });
  test("none", () => {
    expect(
      findMapFieldAttribute({
        kind: "field",
        name: { kind: "name", value: "id" },
        type: { kind: "typeId", name: { kind: "name", value: "String" } },
      })
    ).toBeUndefined();
  });
  test("multiple", () => {
    expect(() =>
      findMapFieldAttribute({
        kind: "field",
        name: { kind: "name", value: "id" },
        type: { kind: "typeId", name: { kind: "name", value: "String" } },
        attributes: [
          {
            kind: "fieldAttribute",
            path: { kind: "path", value: ["map"] },
            args: [{ kind: "literal", value: "id1" }],
          },
          {
            kind: "fieldAttribute",
            path: { kind: "path", value: ["map"] },
            args: [{ kind: "literal", value: "id2" }],
          },
        ],
      })
    ).toThrow("Multiple instances of @map attribute");
  });
});

describe("findMapBlockAttribute", () => {
  test("one", () => {
    expect(
      findMapBlockAttribute({
        kind: "model",
        name: { kind: "name", value: "M" },
        members: [
          {
            kind: "blockAttribute",
            path: { kind: "path", value: ["map"] },
            args: [{ kind: "literal", value: "m" }],
          },
        ],
      })
    ).toStrictEqual<MapBlockAttribute>({
      name: "m",
    });
  });
  test("none", () => {
    expect(
      findMapBlockAttribute({
        kind: "model",
        name: { kind: "name", value: "M" },
        members: [],
      })
    ).toBeUndefined();
  });
  test("multiple", () => {
    expect(() =>
      findMapBlockAttribute({
        kind: "model",
        name: { kind: "name", value: "M" },
        members: [
          {
            kind: "blockAttribute",
            path: { kind: "path", value: ["map"] },
            args: [{ kind: "literal", value: "m1" }],
          },
          {
            kind: "blockAttribute",
            path: { kind: "path", value: ["map"] },
            args: [{ kind: "literal", value: "m2" }],
          },
        ],
      })
    ).toThrow("Multiple instances of @@map attribute");
  });
});
