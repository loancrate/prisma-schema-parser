import { PrismaSchema } from "../src/ast";

const ast: PrismaSchema = {
  kind: "schema",
  declarations: [
    {
      kind: "commentBlock",
      comments: [
        {
          kind: "comment",
          text: "Schema comment",
          location: {
            start: { offset: 0, line: 1, column: 1 },
            end: { offset: 17, line: 1, column: 18 },
          },
        },
        {
          kind: "docComment",
          text: "Doc comment",
          location: {
            start: { offset: 19, line: 3, column: 1 },
            end: { offset: 34, line: 3, column: 16 },
          },
        },
      ],
    },
    {
      kind: "generator",
      name: {
        kind: "name",
        value: "client",
        location: {
          start: { offset: 45, line: 4, column: 11 },
          end: { offset: 51, line: 4, column: 17 },
        },
      },
      members: [
        {
          kind: "config",
          name: {
            kind: "name",
            value: "provider",
            location: {
              start: { offset: 56, line: 5, column: 3 },
              end: { offset: 64, line: 5, column: 11 },
            },
          },
          value: { kind: "literal", value: "prisma-client-js" },
          comment: {
            kind: "comment",
            text: "Trailing comment",
            location: {
              start: { offset: 86, line: 5, column: 33 },
              end: { offset: 105, line: 5, column: 52 },
            },
          },
          location: {
            start: { offset: 56, line: 5, column: 3 },
            end: { offset: 105, line: 5, column: 52 },
          },
        },
        {
          kind: "config",
          name: {
            kind: "name",
            value: "output",
            location: {
              start: { offset: 108, line: 6, column: 3 },
              end: { offset: 114, line: 6, column: 9 },
            },
          },
          value: { kind: "literal", value: "src/__generated__/PrismaClient" },
          comment: null,
          location: {
            start: { offset: 108, line: 6, column: 3 },
            end: { offset: 151, line: 6, column: 46 },
          },
        },
      ],
      location: {
        start: { offset: 35, line: 4, column: 1 },
        end: { offset: 153, line: 7, column: 2 },
      },
    },
    {
      kind: "datasource",
      name: {
        kind: "name",
        value: "postgresql",
        location: {
          start: { offset: 166, line: 9, column: 12 },
          end: { offset: 176, line: 9, column: 22 },
        },
      },
      members: [
        {
          kind: "config",
          name: {
            kind: "name",
            value: "provider",
            location: {
              start: { offset: 181, line: 10, column: 3 },
              end: { offset: 189, line: 10, column: 11 },
            },
          },
          value: { kind: "literal", value: "mongodb" },
          comment: null,
          location: {
            start: { offset: 181, line: 10, column: 3 },
            end: { offset: 201, line: 10, column: 23 },
          },
        },
        {
          kind: "config",
          name: {
            kind: "name",
            value: "url",
            location: {
              start: { offset: 204, line: 11, column: 3 },
              end: { offset: 207, line: 11, column: 6 },
            },
          },
          value: {
            kind: "functionCall",
            path: {
              kind: "path",
              value: ["env"],
              location: {
                start: { offset: 215, line: 11, column: 14 },
                end: { offset: 218, line: 11, column: 17 },
              },
            },
            args: [{ kind: "literal", value: "DATABASE_URL" }],
          },
          comment: null,
          location: {
            start: { offset: 204, line: 11, column: 3 },
            end: { offset: 234, line: 11, column: 33 },
          },
        },
      ],
      location: {
        start: { offset: 155, line: 9, column: 1 },
        end: { offset: 236, line: 12, column: 2 },
      },
    },
    {
      kind: "enum",
      name: {
        kind: "name",
        value: "MyEnum",
        location: {
          start: { offset: 243, line: 14, column: 6 },
          end: { offset: 249, line: 14, column: 12 },
        },
      },
      members: [
        {
          kind: "enumValue",
          name: {
            kind: "name",
            value: "FirstValue",
            location: {
              start: { offset: 254, line: 15, column: 3 },
              end: { offset: 264, line: 15, column: 13 },
            },
          },
          attributes: [
            {
              kind: "fieldAttribute",
              path: {
                kind: "path",
                value: ["map"],
                location: {
                  start: { offset: 267, line: 15, column: 16 },
                  end: { offset: 270, line: 15, column: 19 },
                },
              },
              args: [{ kind: "literal", value: "v1" }],
              location: {
                start: { offset: 266, line: 15, column: 15 },
                end: { offset: 276, line: 15, column: 25 },
              },
            },
          ],
          comment: {
            kind: "comment",
            text: "Enum value comment",
            location: {
              start: { offset: 277, line: 15, column: 26 },
              end: { offset: 298, line: 15, column: 47 },
            },
          },
          location: {
            start: { offset: 254, line: 15, column: 3 },
            end: { offset: 298, line: 15, column: 47 },
          },
        },
        {
          kind: "enumValue",
          name: {
            kind: "name",
            value: "SecondValue",
            location: {
              start: { offset: 301, line: 16, column: 3 },
              end: { offset: 312, line: 16, column: 14 },
            },
          },
          attributes: [],
          comment: null,
          location: {
            start: { offset: 301, line: 16, column: 3 },
            end: { offset: 312, line: 16, column: 14 },
          },
        },
        {
          kind: "enumValue",
          name: {
            kind: "name",
            value: "ThirdValue",
            location: {
              start: { offset: 315, line: 17, column: 3 },
              end: { offset: 325, line: 17, column: 13 },
            },
          },
          attributes: [],
          comment: null,
          location: {
            start: { offset: 315, line: 17, column: 3 },
            end: { offset: 325, line: 17, column: 13 },
          },
        },
      ],
      location: {
        start: { offset: 238, line: 14, column: 1 },
        end: { offset: 327, line: 18, column: 2 },
      },
    },
    {
      kind: "model",
      name: {
        kind: "name",
        value: "MyModel",
        location: {
          start: { offset: 335, line: 20, column: 7 },
          end: { offset: 342, line: 20, column: 14 },
        },
      },
      members: [
        {
          kind: "field",
          name: {
            kind: "name",
            value: "id",
            location: {
              start: { offset: 347, line: 21, column: 3 },
              end: { offset: 349, line: 21, column: 5 },
            },
          },
          type: {
            kind: "typeId",
            name: {
              kind: "name",
              value: "String",
              location: {
                start: { offset: 357, line: 21, column: 13 },
                end: { offset: 363, line: 21, column: 19 },
              },
            },
          },
          attributes: [
            {
              kind: "fieldAttribute",
              path: {
                kind: "path",
                value: ["id"],
                location: {
                  start: { offset: 367, line: 21, column: 23 },
                  end: { offset: 370, line: 21, column: 26 },
                },
              },
              args: [],
              location: {
                start: { offset: 366, line: 21, column: 22 },
                end: { offset: 370, line: 21, column: 26 },
              },
            },
            {
              kind: "fieldAttribute",
              path: {
                kind: "path",
                value: ["default"],
                location: {
                  start: { offset: 371, line: 21, column: 27 },
                  end: { offset: 378, line: 21, column: 34 },
                },
              },
              args: [
                {
                  kind: "functionCall",
                  path: {
                    kind: "path",
                    value: ["uuid"],
                    location: {
                      start: { offset: 379, line: 21, column: 35 },
                      end: { offset: 383, line: 21, column: 39 },
                    },
                  },
                  args: [],
                },
              ],
              location: {
                start: { offset: 370, line: 21, column: 26 },
                end: { offset: 386, line: 21, column: 42 },
              },
            },
            {
              kind: "fieldAttribute",
              path: {
                kind: "path",
                value: ["map"],
                location: {
                  start: { offset: 388, line: 21, column: 44 },
                  end: { offset: 391, line: 21, column: 47 },
                },
              },
              args: [{ kind: "literal", value: "_id" }],
              location: {
                start: { offset: 387, line: 21, column: 43 },
                end: { offset: 398, line: 21, column: 54 },
              },
            },
          ],
          comment: {
            kind: "comment",
            text: "Field comment",
            location: {
              start: { offset: 399, line: 21, column: 55 },
              end: { offset: 415, line: 21, column: 71 },
            },
          },
          location: {
            start: { offset: 347, line: 21, column: 3 },
            end: { offset: 415, line: 21, column: 71 },
          },
        },
        {
          kind: "field",
          name: {
            kind: "name",
            value: "type",
            location: {
              start: { offset: 418, line: 22, column: 3 },
              end: { offset: 422, line: 22, column: 7 },
            },
          },
          type: {
            kind: "optional",
            type: {
              kind: "typeId",
              name: {
                kind: "name",
                value: "MyEnum",
                location: {
                  start: { offset: 428, line: 22, column: 13 },
                  end: { offset: 434, line: 22, column: 19 },
                },
              },
            },
          },
          attributes: [],
          comment: null,
          location: {
            start: { offset: 418, line: 22, column: 3 },
            end: { offset: 435, line: 22, column: 20 },
          },
        },
        {
          kind: "field",
          name: {
            kind: "name",
            value: "version",
            location: {
              start: { offset: 438, line: 23, column: 3 },
              end: { offset: 445, line: 23, column: 10 },
            },
          },
          type: {
            kind: "typeId",
            name: {
              kind: "name",
              value: "Int",
              location: {
                start: { offset: 448, line: 23, column: 13 },
                end: { offset: 451, line: 23, column: 16 },
              },
            },
          },
          attributes: [
            {
              kind: "fieldAttribute",
              path: {
                kind: "path",
                value: ["default"],
                location: {
                  start: { offset: 458, line: 23, column: 23 },
                  end: { offset: 465, line: 23, column: 30 },
                },
              },
              args: [{ kind: "literal", value: 0 }],
              location: {
                start: { offset: 457, line: 23, column: 22 },
                end: { offset: 468, line: 23, column: 33 },
              },
            },
          ],
          comment: null,
          location: {
            start: { offset: 438, line: 23, column: 3 },
            end: { offset: 468, line: 23, column: 33 },
          },
        },
        {
          kind: "field",
          name: {
            kind: "name",
            value: "uniqueKey",
            location: {
              start: { offset: 471, line: 24, column: 3 },
              end: { offset: 480, line: 24, column: 12 },
            },
          },
          type: {
            kind: "typeId",
            name: {
              kind: "name",
              value: "String",
              location: {
                start: { offset: 481, line: 24, column: 13 },
                end: { offset: 487, line: 24, column: 19 },
              },
            },
          },
          attributes: [
            {
              kind: "fieldAttribute",
              path: {
                kind: "path",
                value: ["unique"],
                location: {
                  start: { offset: 491, line: 24, column: 23 },
                  end: { offset: 497, line: 24, column: 29 },
                },
              },
              args: [
                {
                  kind: "namedArgument",
                  name: {
                    kind: "name",
                    value: "sort",
                    location: {
                      start: { offset: 498, line: 24, column: 30 },
                      end: { offset: 502, line: 24, column: 34 },
                    },
                  },
                  expression: {
                    kind: "path",
                    value: ["Asc"],
                    location: {
                      start: { offset: 504, line: 24, column: 36 },
                      end: { offset: 507, line: 24, column: 39 },
                    },
                  },
                },
              ],
              location: {
                start: { offset: 490, line: 24, column: 22 },
                end: { offset: 508, line: 24, column: 40 },
              },
            },
            {
              kind: "fieldAttribute",
              path: {
                kind: "path",
                value: ["map"],
                location: {
                  start: { offset: 510, line: 24, column: 42 },
                  end: { offset: 513, line: 24, column: 45 },
                },
              },
              args: [{ kind: "literal", value: "unique_key" }],
              location: {
                start: { offset: 509, line: 24, column: 41 },
                end: { offset: 527, line: 24, column: 59 },
              },
            },
          ],
          comment: null,
          location: {
            start: { offset: 471, line: 24, column: 3 },
            end: { offset: 527, line: 24, column: 59 },
          },
        },
        {
          kind: "field",
          name: {
            kind: "name",
            value: "createdAt",
            location: {
              start: { offset: 530, line: 25, column: 3 },
              end: { offset: 539, line: 25, column: 12 },
            },
          },
          type: {
            kind: "typeId",
            name: {
              kind: "name",
              value: "DateTime",
              location: {
                start: { offset: 540, line: 25, column: 13 },
                end: { offset: 548, line: 25, column: 21 },
              },
            },
          },
          attributes: [
            {
              kind: "fieldAttribute",
              path: {
                kind: "path",
                value: ["default"],
                location: {
                  start: { offset: 550, line: 25, column: 23 },
                  end: { offset: 557, line: 25, column: 30 },
                },
              },
              args: [
                {
                  kind: "functionCall",
                  path: {
                    kind: "path",
                    value: ["now"],
                    location: {
                      start: { offset: 558, line: 25, column: 31 },
                      end: { offset: 561, line: 25, column: 34 },
                    },
                  },
                  args: [],
                },
              ],
              location: {
                start: { offset: 549, line: 25, column: 22 },
                end: { offset: 564, line: 25, column: 37 },
              },
            },
            {
              kind: "fieldAttribute",
              path: {
                kind: "path",
                value: ["map"],
                location: {
                  start: { offset: 566, line: 25, column: 39 },
                  end: { offset: 569, line: 25, column: 42 },
                },
              },
              args: [{ kind: "literal", value: "created_at" }],
              location: {
                start: { offset: 565, line: 25, column: 38 },
                end: { offset: 583, line: 25, column: 56 },
              },
            },
          ],
          comment: null,
          location: {
            start: { offset: 530, line: 25, column: 3 },
            end: { offset: 583, line: 25, column: 56 },
          },
        },
        {
          kind: "field",
          name: {
            kind: "name",
            value: "updatedAt",
            location: {
              start: { offset: 586, line: 26, column: 3 },
              end: { offset: 595, line: 26, column: 12 },
            },
          },
          type: {
            kind: "typeId",
            name: {
              kind: "name",
              value: "DateTime",
              location: {
                start: { offset: 596, line: 26, column: 13 },
                end: { offset: 604, line: 26, column: 21 },
              },
            },
          },
          attributes: [
            {
              kind: "fieldAttribute",
              path: {
                kind: "path",
                value: ["default"],
                location: {
                  start: { offset: 606, line: 26, column: 23 },
                  end: { offset: 613, line: 26, column: 30 },
                },
              },
              args: [
                {
                  kind: "functionCall",
                  path: {
                    kind: "path",
                    value: ["now"],
                    location: {
                      start: { offset: 614, line: 26, column: 31 },
                      end: { offset: 617, line: 26, column: 34 },
                    },
                  },
                  args: [],
                },
              ],
              location: {
                start: { offset: 605, line: 26, column: 22 },
                end: { offset: 620, line: 26, column: 37 },
              },
            },
            {
              kind: "fieldAttribute",
              path: {
                kind: "path",
                value: ["updatedAt"],
                location: {
                  start: { offset: 622, line: 26, column: 39 },
                  end: { offset: 632, line: 26, column: 49 },
                },
              },
              args: [],
              location: {
                start: { offset: 621, line: 26, column: 38 },
                end: { offset: 632, line: 26, column: 49 },
              },
            },
            {
              kind: "fieldAttribute",
              path: {
                kind: "path",
                value: ["map"],
                location: {
                  start: { offset: 633, line: 26, column: 50 },
                  end: { offset: 636, line: 26, column: 53 },
                },
              },
              args: [{ kind: "literal", value: "updated_at" }],
              location: {
                start: { offset: 632, line: 26, column: 49 },
                end: { offset: 650, line: 26, column: 67 },
              },
            },
          ],
          comment: null,
          location: {
            start: { offset: 586, line: 26, column: 3 },
            end: { offset: 650, line: 26, column: 67 },
          },
        },
        {
          kind: "field",
          name: {
            kind: "name",
            value: "children",
            location: {
              start: { offset: 654, line: 28, column: 3 },
              end: { offset: 662, line: 28, column: 11 },
            },
          },
          type: {
            kind: "list",
            type: {
              kind: "typeId",
              name: {
                kind: "name",
                value: "MyOtherModel",
                location: {
                  start: { offset: 663, line: 28, column: 12 },
                  end: { offset: 675, line: 28, column: 24 },
                },
              },
            },
          },
          attributes: [],
          comment: null,
          location: {
            start: { offset: 654, line: 28, column: 3 },
            end: { offset: 677, line: 28, column: 26 },
          },
        },
        {
          kind: "blockAttribute",
          path: {
            kind: "path",
            value: ["unique"],
            location: {
              start: { offset: 683, line: 30, column: 5 },
              end: { offset: 689, line: 30, column: 11 },
            },
          },
          args: [
            {
              kind: "array",
              items: [
                {
                  kind: "path",
                  value: ["type"],
                  location: {
                    start: { offset: 691, line: 30, column: 13 },
                    end: { offset: 695, line: 30, column: 17 },
                  },
                },
                {
                  kind: "path",
                  value: ["version"],
                  location: {
                    start: { offset: 697, line: 30, column: 19 },
                    end: { offset: 704, line: 30, column: 26 },
                  },
                },
              ],
            },
          ],
          comment: {
            kind: "comment",
            text: "Block attribute comment",
            location: {
              start: { offset: 707, line: 30, column: 29 },
              end: { offset: 733, line: 30, column: 55 },
            },
          },
          location: {
            start: { offset: 681, line: 30, column: 3 },
            end: { offset: 733, line: 30, column: 55 },
          },
        },
        {
          kind: "blockAttribute",
          path: {
            kind: "path",
            value: ["index"],
            location: {
              start: { offset: 738, line: 31, column: 5 },
              end: { offset: 743, line: 31, column: 10 },
            },
          },
          args: [
            {
              kind: "array",
              items: [
                {
                  kind: "functionCall",
                  path: {
                    kind: "path",
                    value: ["createdAt"],
                    location: {
                      start: { offset: 745, line: 31, column: 12 },
                      end: { offset: 754, line: 31, column: 21 },
                    },
                  },
                  args: [
                    {
                      kind: "namedArgument",
                      name: {
                        kind: "name",
                        value: "sort",
                        location: {
                          start: { offset: 755, line: 31, column: 22 },
                          end: { offset: 759, line: 31, column: 26 },
                        },
                      },
                      expression: {
                        kind: "path",
                        value: ["Desc"],
                        location: {
                          start: { offset: 761, line: 31, column: 28 },
                          end: { offset: 765, line: 31, column: 32 },
                        },
                      },
                    },
                    {
                      kind: "namedArgument",
                      name: {
                        kind: "name",
                        value: "ops",
                        location: {
                          start: { offset: 767, line: 31, column: 34 },
                          end: { offset: 770, line: 31, column: 37 },
                        },
                      },
                      expression: {
                        kind: "functionCall",
                        path: {
                          kind: "path",
                          value: ["raw"],
                          location: {
                            start: { offset: 772, line: 31, column: 39 },
                            end: { offset: 775, line: 31, column: 42 },
                          },
                        },
                        args: [{ kind: "literal", value: "other" }],
                      },
                    },
                  ],
                },
              ],
            },
            {
              kind: "namedArgument",
              name: {
                kind: "name",
                value: "type",
                location: {
                  start: { offset: 788, line: 31, column: 55 },
                  end: { offset: 792, line: 31, column: 59 },
                },
              },
              expression: {
                kind: "path",
                value: ["BTree"],
                location: {
                  start: { offset: 794, line: 31, column: 61 },
                  end: { offset: 799, line: 31, column: 66 },
                },
              },
            },
          ],
          comment: null,
          location: {
            start: { offset: 736, line: 31, column: 3 },
            end: { offset: 800, line: 31, column: 67 },
          },
        },
        {
          kind: "blockAttribute",
          path: {
            kind: "path",
            value: ["map"],
            location: {
              start: { offset: 805, line: 32, column: 5 },
              end: { offset: 808, line: 32, column: 8 },
            },
          },
          args: [{ kind: "literal", value: "my_model" }],
          comment: null,
          location: {
            start: { offset: 803, line: 32, column: 3 },
            end: { offset: 820, line: 32, column: 20 },
          },
        },
      ],
      location: {
        start: { offset: 329, line: 20, column: 1 },
        end: { offset: 822, line: 33, column: 2 },
      },
    },
    {
      kind: "type",
      name: {
        kind: "name",
        value: "MyType",
        location: {
          start: { offset: 829, line: 35, column: 6 },
          end: { offset: 835, line: 35, column: 12 },
        },
      },
      members: [
        {
          kind: "field",
          name: {
            kind: "name",
            value: "field1",
            location: {
              start: { offset: 840, line: 36, column: 3 },
              end: { offset: 846, line: 36, column: 9 },
            },
          },
          type: {
            kind: "typeId",
            name: {
              kind: "name",
              value: "Float",
              location: {
                start: { offset: 847, line: 36, column: 10 },
                end: { offset: 852, line: 36, column: 15 },
              },
            },
          },
          attributes: [],
          comment: null,
          location: {
            start: { offset: 840, line: 36, column: 3 },
            end: { offset: 852, line: 36, column: 15 },
          },
        },
        {
          kind: "field",
          name: {
            kind: "name",
            value: "field2",
            location: {
              start: { offset: 855, line: 37, column: 3 },
              end: { offset: 861, line: 37, column: 9 },
            },
          },
          type: {
            kind: "typeId",
            name: {
              kind: "name",
              value: "Boolean",
              location: {
                start: { offset: 862, line: 37, column: 10 },
                end: { offset: 869, line: 37, column: 17 },
              },
            },
          },
          attributes: [
            {
              kind: "fieldAttribute",
              path: {
                kind: "path",
                value: ["default"],
                location: {
                  start: { offset: 883, line: 37, column: 31 },
                  end: { offset: 890, line: 37, column: 38 },
                },
              },
              args: [{ kind: "literal", value: true }],
              location: {
                start: { offset: 882, line: 37, column: 30 },
                end: { offset: 896, line: 37, column: 44 },
              },
            },
          ],
          comment: null,
          location: {
            start: { offset: 855, line: 37, column: 3 },
            end: { offset: 896, line: 37, column: 44 },
          },
        },
        {
          kind: "field",
          name: {
            kind: "name",
            value: "field3",
            location: {
              start: { offset: 899, line: 38, column: 3 },
              end: { offset: 905, line: 38, column: 9 },
            },
          },
          type: {
            kind: "typeId",
            name: {
              kind: "name",
              value: "Json",
              location: {
                start: { offset: 906, line: 38, column: 10 },
                end: { offset: 910, line: 38, column: 14 },
              },
            },
          },
          attributes: [],
          comment: null,
          location: {
            start: { offset: 899, line: 38, column: 3 },
            end: { offset: 910, line: 38, column: 14 },
          },
        },
        {
          kind: "field",
          name: {
            kind: "name",
            value: "field4",
            location: {
              start: { offset: 913, line: 39, column: 3 },
              end: { offset: 919, line: 39, column: 9 },
            },
          },
          type: {
            kind: "unsupported",
            type: { kind: "literal", value: "type" },
          },
          attributes: [],
          comment: null,
          location: {
            start: { offset: 913, line: 39, column: 3 },
            end: { offset: 939, line: 39, column: 29 },
          },
        },
      ],
      location: {
        start: { offset: 824, line: 35, column: 1 },
        end: { offset: 941, line: 40, column: 2 },
      },
    },
    {
      kind: "model",
      name: {
        kind: "name",
        value: "MyOtherModel",
        location: {
          start: { offset: 949, line: 42, column: 7 },
          end: { offset: 961, line: 42, column: 19 },
        },
      },
      members: [
        {
          kind: "field",
          name: {
            kind: "name",
            value: "id",
            location: {
              start: { offset: 966, line: 43, column: 3 },
              end: { offset: 968, line: 43, column: 5 },
            },
          },
          type: {
            kind: "typeId",
            name: {
              kind: "name",
              value: "String",
              location: {
                start: { offset: 975, line: 43, column: 12 },
                end: { offset: 981, line: 43, column: 18 },
              },
            },
          },
          attributes: [
            {
              kind: "fieldAttribute",
              path: {
                kind: "path",
                value: ["id"],
                location: {
                  start: { offset: 983, line: 43, column: 20 },
                  end: { offset: 986, line: 43, column: 23 },
                },
              },
              args: [],
              location: {
                start: { offset: 982, line: 43, column: 19 },
                end: { offset: 986, line: 43, column: 23 },
              },
            },
            {
              kind: "fieldAttribute",
              path: {
                kind: "path",
                value: ["default"],
                location: {
                  start: { offset: 987, line: 43, column: 24 },
                  end: { offset: 994, line: 43, column: 31 },
                },
              },
              args: [
                {
                  kind: "functionCall",
                  path: {
                    kind: "path",
                    value: ["uuid"],
                    location: {
                      start: { offset: 995, line: 43, column: 32 },
                      end: { offset: 999, line: 43, column: 36 },
                    },
                  },
                  args: [],
                },
              ],
              location: {
                start: { offset: 986, line: 43, column: 23 },
                end: { offset: 1002, line: 43, column: 39 },
              },
            },
            {
              kind: "fieldAttribute",
              path: {
                kind: "path",
                value: ["map"],
                location: {
                  start: { offset: 1004, line: 43, column: 41 },
                  end: { offset: 1007, line: 43, column: 44 },
                },
              },
              args: [{ kind: "literal", value: "_id" }],
              location: {
                start: { offset: 1003, line: 43, column: 40 },
                end: { offset: 1014, line: 43, column: 51 },
              },
            },
          ],
          comment: null,
          location: {
            start: { offset: 966, line: 43, column: 3 },
            end: { offset: 1014, line: 43, column: 51 },
          },
        },
        {
          kind: "field",
          name: {
            kind: "name",
            value: "parentId",
            location: {
              start: { offset: 1017, line: 44, column: 3 },
              end: { offset: 1025, line: 44, column: 11 },
            },
          },
          type: {
            kind: "typeId",
            name: {
              kind: "name",
              value: "String",
              location: {
                start: { offset: 1026, line: 44, column: 12 },
                end: { offset: 1032, line: 44, column: 18 },
              },
            },
          },
          attributes: [],
          comment: null,
          location: {
            start: { offset: 1017, line: 44, column: 3 },
            end: { offset: 1032, line: 44, column: 18 },
          },
        },
        {
          kind: "field",
          name: {
            kind: "name",
            value: "text",
            location: {
              start: { offset: 1035, line: 45, column: 3 },
              end: { offset: 1039, line: 45, column: 7 },
            },
          },
          type: {
            kind: "typeId",
            name: {
              kind: "name",
              value: "String",
              location: {
                start: { offset: 1044, line: 45, column: 12 },
                end: { offset: 1050, line: 45, column: 18 },
              },
            },
          },
          attributes: [],
          comment: null,
          location: {
            start: { offset: 1035, line: 45, column: 3 },
            end: { offset: 1050, line: 45, column: 18 },
          },
        },
        {
          kind: "field",
          name: {
            kind: "name",
            value: "parent",
            location: {
              start: { offset: 1054, line: 47, column: 3 },
              end: { offset: 1060, line: 47, column: 9 },
            },
          },
          type: {
            kind: "typeId",
            name: {
              kind: "name",
              value: "MyModel",
              location: {
                start: { offset: 1061, line: 47, column: 10 },
                end: { offset: 1068, line: 47, column: 17 },
              },
            },
          },
          attributes: [
            {
              kind: "fieldAttribute",
              path: {
                kind: "path",
                value: ["relation"],
                location: {
                  start: { offset: 1070, line: 47, column: 19 },
                  end: { offset: 1078, line: 47, column: 27 },
                },
              },
              args: [
                {
                  kind: "namedArgument",
                  name: {
                    kind: "name",
                    value: "fields",
                    location: {
                      start: { offset: 1079, line: 47, column: 28 },
                      end: { offset: 1085, line: 47, column: 34 },
                    },
                  },
                  expression: {
                    kind: "array",
                    items: [
                      {
                        kind: "path",
                        value: ["parentId"],
                        location: {
                          start: { offset: 1088, line: 47, column: 37 },
                          end: { offset: 1096, line: 47, column: 45 },
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "namedArgument",
                  name: {
                    kind: "name",
                    value: "references",
                    location: {
                      start: { offset: 1099, line: 47, column: 48 },
                      end: { offset: 1109, line: 47, column: 58 },
                    },
                  },
                  expression: {
                    kind: "array",
                    items: [
                      {
                        kind: "path",
                        value: ["id"],
                        location: {
                          start: { offset: 1112, line: 47, column: 61 },
                          end: { offset: 1114, line: 47, column: 63 },
                        },
                      },
                    ],
                  },
                },
              ],
              location: {
                start: { offset: 1069, line: 47, column: 18 },
                end: { offset: 1116, line: 47, column: 65 },
              },
            },
          ],
          comment: null,
          location: {
            start: { offset: 1054, line: 47, column: 3 },
            end: { offset: 1116, line: 47, column: 65 },
          },
        },
      ],
      location: {
        start: { offset: 943, line: 42, column: 1 },
        end: { offset: 1118, line: 48, column: 2 },
      },
    },
  ],
};

export default ast;
