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
        {
          kind: "config",
          name: {
            kind: "name",
            value: "previewFeatures",
            location: {
              start: { offset: 154, line: 7, column: 3 },
              end: { offset: 169, line: 7, column: 18 },
            },
          },
          value: {
            kind: "array",
            items: [
              { kind: "literal", value: "views" },
            ],
          },
          comment: null,
          location: {
            start: { offset: 154, line: 7, column: 3 },
            end: { offset: 181, line: 7, column: 30 },
          },
        },
      ],
      location: {
        start: { offset: 35, line: 4, column: 1 },
        end: { offset: 183, line: 8, column: 2 },
      },
    },
    {
      kind: "datasource",
      name: {
        kind: "name",
        value: "postgresql",
        location: {
          start: { offset: 196, line: 10, column: 12 },
          end: { offset: 206, line: 10, column: 22 },
        },
      },
      members: [
        {
          kind: "config",
          name: {
            kind: "name",
            value: "provider",
            location: {
              start: { offset: 211, line: 11, column: 3 },
              end: { offset: 219, line: 11, column: 11 },
            },
          },
          value: { kind: "literal", value: "mongodb" },
          comment: null,
          location: {
            start: { offset: 211, line: 11, column: 3 },
            end: { offset: 231, line: 11, column: 23 },
          },
        },
        {
          kind: "config",
          name: {
            kind: "name",
            value: "url",
            location: {
              start: { offset: 234, line: 12, column: 3 },
              end: { offset: 237, line: 12, column: 6 },
            },
          },
          value: {
            kind: "functionCall",
            path: {
              kind: "path",
              value: ["env"],
              location: {
                start: { offset: 245, line: 12, column: 14 },
                end: { offset: 248, line: 12, column: 17 },
              },
            },
            args: [{ kind: "literal", value: "DATABASE_URL" }],
          },
          comment: null,
          location: {
            start: { offset: 234, line: 12, column: 3 },
            end: { offset: 264, line: 12, column: 33 },
          },
        },
      ],
      location: {
        start: { offset: 185, line: 10, column: 1 },
        end: { offset: 266, line: 13, column: 2 },
      },
    },
    {
      kind: "enum",
      name: {
        kind: "name",
        value: "MyEnum",
        location: {
          start: { offset: 273, line: 15, column: 6 },
          end: { offset: 279, line: 15, column: 12 },
        },
      },
      members: [
        {
          kind: "enumValue",
          name: {
            kind: "name",
            value: "FirstValue",
            location: {
              start: { offset: 284, line: 16, column: 3 },
              end: { offset: 294, line: 16, column: 13 },
            },
          },
          attributes: [
            {
              kind: "fieldAttribute",
              path: {
                kind: "path",
                value: ["map"],
                location: {
                  start: { offset: 297, line: 16, column: 16 },
                  end: { offset: 300, line: 16, column: 19 },
                },
              },
              args: [{ kind: "literal", value: "v1" }],
              location: {
                start: { offset: 296, line: 16, column: 15 },
                end: { offset: 306, line: 16, column: 25 },
              },
            },
          ],
          comment: {
            kind: "comment",
            text: "Enum value comment",
            location: {
              start: { offset: 307, line: 16, column: 26 },
              end: { offset: 328, line: 16, column: 47 },
            },
          },
          location: {
            start: { offset: 284, line: 16, column: 3 },
            end: { offset: 328, line: 16, column: 47 },
          },
        },
        {
          kind: "enumValue",
          name: {
            kind: "name",
            value: "SecondValue",
            location: {
              start: { offset: 331, line: 17, column: 3 },
              end: { offset: 342, line: 17, column: 14 },
            },
          },
          attributes: [],
          comment: null,
          location: {
            start: { offset: 331, line: 17, column: 3 },
            end: { offset: 342, line: 17, column: 14 },
          },
        },
        {
          kind: "enumValue",
          name: {
            kind: "name",
            value: "ThirdValue",
            location: {
              start: { offset: 345, line: 18, column: 3 },
              end: { offset: 355, line: 18, column: 13 },
            },
          },
          attributes: [],
          comment: null,
          location: {
            start: { offset: 345, line: 18, column: 3 },
            end: { offset: 355, line: 18, column: 13 },
          },
        },
      ],
      location: {
        start: { offset: 268, line: 15, column: 1 },
        end: { offset: 357, line: 19, column: 2 },
      },
    },
    {
      kind: "model",
      name: {
        kind: "name",
        value: "MyModel",
        location: {
          start: { offset: 365, line: 21, column: 7 },
          end: { offset: 372, line: 21, column: 14 },
        },
      },
      members: [
        {
          kind: "field",
          name: {
            kind: "name",
            value: "id",
            location: {
              start: { offset: 377, line: 22, column: 3 },
              end: { offset: 379, line: 22, column: 5 },
            },
          },
          type: {
            kind: "typeId",
            name: {
              kind: "name",
              value: "String",
              location: {
                start: { offset: 387, line: 22, column: 13 },
                end: { offset: 393, line: 22, column: 19 },
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
                  start: { offset: 397, line: 22, column: 23 },
                  end: { offset: 400, line: 22, column: 26 },
                },
              },
              args: [],
              location: {
                start: { offset: 396, line: 22, column: 22 },
                end: { offset: 400, line: 22, column: 26 },
              },
            },
            {
              kind: "fieldAttribute",
              path: {
                kind: "path",
                value: ["default"],
                location: {
                  start: { offset: 401, line: 22, column: 27 },
                  end: { offset: 408, line: 22, column: 34 },
                },
              },
              args: [
                {
                  kind: "functionCall",
                  path: {
                    kind: "path",
                    value: ["uuid"],
                    location: {
                      start: { offset: 409, line: 22, column: 35 },
                      end: { offset: 413, line: 22, column: 39 },
                    },
                  },
                  args: [],
                },
              ],
              location: {
                start: { offset: 400, line: 22, column: 26 },
                end: { offset: 416, line: 22, column: 42 },
              },
            },
            {
              kind: "fieldAttribute",
              path: {
                kind: "path",
                value: ["map"],
                location: {
                  start: { offset: 418, line: 22, column: 44 },
                  end: { offset: 421, line: 22, column: 47 },
                },
              },
              args: [{ kind: "literal", value: "_id" }],
              location: {
                start: { offset: 417, line: 22, column: 43 },
                end: { offset: 428, line: 22, column: 54 },
              },
            },
          ],
          comment: {
            kind: "comment",
            text: "Field comment",
            location: {
              start: { offset: 429, line: 22, column: 55 },
              end: { offset: 445, line: 22, column: 71 },
            },
          },
          location: {
            start: { offset: 377, line: 22, column: 3 },
            end: { offset: 445, line: 22, column: 71 },
          },
        },
        {
          kind: "field",
          name: {
            kind: "name",
            value: "type",
            location: {
              start: { offset: 448, line: 23, column: 3 },
              end: { offset: 452, line: 23, column: 7 },
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
                  start: { offset: 458, line: 23, column: 13 },
                  end: { offset: 464, line: 23, column: 19 },
                },
              },
            },
          },
          attributes: [],
          comment: null,
          location: {
            start: { offset: 448, line: 23, column: 3 },
            end: { offset: 465, line: 23, column: 20 },
          },
        },
        {
          kind: "field",
          name: {
            kind: "name",
            value: "version",
            location: {
              start: { offset: 468, line: 24, column: 3 },
              end: { offset: 475, line: 24, column: 10 },
            },
          },
          type: {
            kind: "typeId",
            name: {
              kind: "name",
              value: "Int",
              location: {
                start: { offset: 478, line: 24, column: 13 },
                end: { offset: 481, line: 24, column: 16 },
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
                  start: { offset: 488, line: 24, column: 23 },
                  end: { offset: 495, line: 24, column: 30 },
                },
              },
              args: [{ kind: "literal", value: 0 }],
              location: {
                start: { offset: 487, line: 24, column: 22 },
                end: { offset: 498, line: 24, column: 33 },
              },
            },
          ],
          comment: null,
          location: {
            start: { offset: 468, line: 24, column: 3 },
            end: { offset: 498, line: 24, column: 33 },
          },
        },
        {
          kind: "field",
          name: {
            kind: "name",
            value: "uniqueKey",
            location: {
              start: { offset: 501, line: 25, column: 3 },
              end: { offset: 510, line: 25, column: 12 },
            },
          },
          type: {
            kind: "typeId",
            name: {
              kind: "name",
              value: "String",
              location: {
                start: { offset: 511, line: 25, column: 13 },
                end: { offset: 517, line: 25, column: 19 },
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
                  start: { offset: 521, line: 25, column: 23 },
                  end: { offset: 527, line: 25, column: 29 },
                },
              },
              args: [
                {
                  kind: "namedArgument",
                  name: {
                    kind: "name",
                    value: "sort",
                    location: {
                      start: { offset: 528, line: 25, column: 30 },
                      end: { offset: 532, line: 25, column: 34 },
                    },
                  },
                  expression: {
                    kind: "path",
                    value: ["Asc"],
                    location: {
                      start: { offset: 534, line: 25, column: 36 },
                      end: { offset: 537, line: 25, column: 39 },
                    },
                  },
                },
              ],
              location: {
                start: { offset: 520, line: 25, column: 22 },
                end: { offset: 538, line: 25, column: 40 },
              },
            },
            {
              kind: "fieldAttribute",
              path: {
                kind: "path",
                value: ["map"],
                location: {
                  start: { offset: 540, line: 25, column: 42 },
                  end: { offset: 543, line: 25, column: 45 },
                },
              },
              args: [{ kind: "literal", value: "unique_key" }],
              location: {
                start: { offset: 539, line: 25, column: 41 },
                end: { offset: 557, line: 25, column: 59 },
              },
            },
          ],
          comment: null,
          location: {
            start: { offset: 501, line: 25, column: 3 },
            end: { offset: 557, line: 25, column: 59 },
          },
        },
        {
          kind: "field",
          name: {
            kind: "name",
            value: "createdAt",
            location: {
              start: { offset: 560, line: 26, column: 3 },
              end: { offset: 569, line: 26, column: 12 },
            },
          },
          type: {
            kind: "typeId",
            name: {
              kind: "name",
              value: "DateTime",
              location: {
                start: { offset: 570, line: 26, column: 13 },
                end: { offset: 578, line: 26, column: 21 },
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
                  start: { offset: 580, line: 26, column: 23 },
                  end: { offset: 587, line: 26, column: 30 },
                },
              },
              args: [
                {
                  kind: "functionCall",
                  path: {
                    kind: "path",
                    value: ["now"],
                    location: {
                      start: { offset: 588, line: 26, column: 31 },
                      end: { offset: 591, line: 26, column: 34 },
                    },
                  },
                  args: [],
                },
              ],
              location: {
                start: { offset: 579, line: 26, column: 22 },
                end: { offset: 594, line: 26, column: 37 },
              },
            },
            {
              kind: "fieldAttribute",
              path: {
                kind: "path",
                value: ["map"],
                location: {
                  start: { offset: 596, line: 26, column: 39 },
                  end: { offset: 599, line: 26, column: 42 },
                },
              },
              args: [{ kind: "literal", value: "created_at" }],
              location: {
                start: { offset: 595, line: 26, column: 38 },
                end: { offset: 613, line: 26, column: 56 },
              },
            },
          ],
          comment: null,
          location: {
            start: { offset: 560, line: 26, column: 3 },
            end: { offset: 613, line: 26, column: 56 },
          },
        },
        {
          kind: "field",
          name: {
            kind: "name",
            value: "updatedAt",
            location: {
              start: { offset: 616, line: 27, column: 3 },
              end: { offset: 625, line: 27, column: 12 },
            },
          },
          type: {
            kind: "typeId",
            name: {
              kind: "name",
              value: "DateTime",
              location: {
                start: { offset: 626, line: 27, column: 13 },
                end: { offset: 634, line: 27, column: 21 },
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
                  start: { offset: 636, line: 27, column: 23 },
                  end: { offset: 643, line: 27, column: 30 },
                },
              },
              args: [
                {
                  kind: "functionCall",
                  path: {
                    kind: "path",
                    value: ["now"],
                    location: {
                      start: { offset: 644, line: 27, column: 31 },
                      end: { offset: 647, line: 27, column: 34 },
                    },
                  },
                  args: [],
                },
              ],
              location: {
                start: { offset: 635, line: 27, column: 22 },
                end: { offset: 650, line: 27, column: 37 },
              },
            },
            {
              kind: "fieldAttribute",
              path: {
                kind: "path",
                value: ["updatedAt"],
                location: {
                  start: { offset: 652, line: 27, column: 39 },
                  end: { offset: 662, line: 27, column: 49 },
                },
              },
              args: [],
              location: {
                start: { offset: 651, line: 27, column: 38 },
                end: { offset: 662, line: 27, column: 49 },
              },
            },
            {
              kind: "fieldAttribute",
              path: {
                kind: "path",
                value: ["map"],
                location: {
                  start: { offset: 663, line: 27, column: 50 },
                  end: { offset: 666, line: 27, column: 53 },
                },
              },
              args: [{ kind: "literal", value: "updated_at" }],
              location: {
                start: { offset: 662, line: 27, column: 49 },
                end: { offset: 680, line: 27, column: 67 },
              },
            },
          ],
          comment: null,
          location: {
            start: { offset: 616, line: 27, column: 3 },
            end: { offset: 680, line: 27, column: 67 },
          },
        },
        {
          kind: "field",
          name: {
            kind: "name",
            value: "children",
            location: {
              start: { offset: 684, line: 29, column: 3 },
              end: { offset: 692, line: 29, column: 11 },
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
                  start: { offset: 693, line: 29, column: 12 },
                  end: { offset: 705, line: 29, column: 24 },
                },
              },
            },
          },
          attributes: [],
          comment: null,
          location: {
            start: { offset: 684, line: 29, column: 3 },
            end: { offset: 707, line: 29, column: 26 },
          },
        },
        {
          kind: "blockAttribute",
          path: {
            kind: "path",
            value: ["unique"],
            location: {
              start: { offset: 713, line: 31, column: 5 },
              end: { offset: 719, line: 31, column: 11 },
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
                    start: { offset: 721, line: 31, column: 13 },
                    end: { offset: 725, line: 31, column: 17 },
                  },
                },
                {
                  kind: "path",
                  value: ["version"],
                  location: {
                    start: { offset: 727, line: 31, column: 19 },
                    end: { offset: 734, line: 31, column: 26 },
                  },
                },
              ],
            },
          ],
          comment: {
            kind: "comment",
            text: "Block attribute comment",
            location: {
              start: { offset: 737, line: 31, column: 29 },
              end: { offset: 763, line: 31, column: 55 },
            },
          },
          location: {
            start: { offset: 711, line: 31, column: 3 },
            end: { offset: 763, line: 31, column: 55 },
          },
        },
        {
          kind: "blockAttribute",
          path: {
            kind: "path",
            value: ["index"],
            location: {
              start: { offset: 768, line: 32, column: 5 },
              end: { offset: 773, line: 32, column: 10 },
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
                      start: { offset: 775, line: 32, column: 12 },
                      end: { offset: 784, line: 32, column: 21 },
                    },
                  },
                  args: [
                    {
                      kind: "namedArgument",
                      name: {
                        kind: "name",
                        value: "sort",
                        location: {
                          start: { offset: 785, line: 32, column: 22 },
                          end: { offset: 789, line: 32, column: 26 },
                        },
                      },
                      expression: {
                        kind: "path",
                        value: ["Desc"],
                        location: {
                          start: { offset: 791, line: 32, column: 28 },
                          end: { offset: 795, line: 32, column: 32 },
                        },
                      },
                    },
                    {
                      kind: "namedArgument",
                      name: {
                        kind: "name",
                        value: "ops",
                        location: {
                          start: { offset: 797, line: 32, column: 34 },
                          end: { offset: 800, line: 32, column: 37 },
                        },
                      },
                      expression: {
                        kind: "functionCall",
                        path: {
                          kind: "path",
                          value: ["raw"],
                          location: {
                            start: { offset: 802, line: 32, column: 39 },
                            end: { offset: 805, line: 32, column: 42 },
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
                  start: { offset: 818, line: 32, column: 55 },
                  end: { offset: 822, line: 32, column: 59 },
                },
              },
              expression: {
                kind: "path",
                value: ["BTree"],
                location: {
                  start: { offset: 824, line: 32, column: 61 },
                  end: { offset: 829, line: 32, column: 66 },
                },
              },
            },
          ],
          comment: null,
          location: {
            start: { offset: 766, line: 32, column: 3 },
            end: { offset: 830, line: 32, column: 67 },
          },
        },
        {
          kind: "blockAttribute",
          path: {
            kind: "path",
            value: ["map"],
            location: {
              start: { offset: 835, line: 33, column: 5 },
              end: { offset: 838, line: 33, column: 8 },
            },
          },
          args: [{ kind: "literal", value: "my_model" }],
          comment: null,
          location: {
            start: { offset: 833, line: 33, column: 3 },
            end: { offset: 850, line: 33, column: 20 },
          },
        },
      ],
      location: {
        start: { offset: 359, line: 21, column: 1 },
        end: { offset: 852, line: 34, column: 2 },
      },
    },
    {
      kind: "type",
      name: {
        kind: "name",
        value: "MyType",
        location: {
          start: { offset: 859, line: 36, column: 6 },
          end: { offset: 865, line: 36, column: 12 },
        },
      },
      members: [
        {
          kind: "field",
          name: {
            kind: "name",
            value: "field1",
            location: {
              start: { offset: 870, line: 37, column: 3 },
              end: { offset: 876, line: 37, column: 9 },
            },
          },
          type: {
            kind: "typeId",
            name: {
              kind: "name",
              value: "Float",
              location: {
                start: { offset: 877, line: 37, column: 10 },
                end: { offset: 882, line: 37, column: 15 },
              },
            },
          },
          attributes: [],
          comment: null,
          location: {
            start: { offset: 870, line: 37, column: 3 },
            end: { offset: 882, line: 37, column: 15 },
          },
        },
        {
          kind: "field",
          name: {
            kind: "name",
            value: "field2",
            location: {
              start: { offset: 885, line: 38, column: 3 },
              end: { offset: 891, line: 38, column: 9 },
            },
          },
          type: {
            kind: "typeId",
            name: {
              kind: "name",
              value: "Boolean",
              location: {
                start: { offset: 892, line: 38, column: 10 },
                end: { offset: 899, line: 38, column: 17 },
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
                  start: { offset: 913, line: 38, column: 31 },
                  end: { offset: 920, line: 38, column: 38 },
                },
              },
              args: [{ kind: "literal", value: true }],
              location: {
                start: { offset: 912, line: 38, column: 30 },
                end: { offset: 926, line: 38, column: 44 },
              },
            },
          ],
          comment: null,
          location: {
            start: { offset: 885, line: 38, column: 3 },
            end: { offset: 926, line: 38, column: 44 },
          },
        },
        {
          kind: "field",
          name: {
            kind: "name",
            value: "field3",
            location: {
              start: { offset: 929, line: 39, column: 3 },
              end: { offset: 935, line: 39, column: 9 },
            },
          },
          type: {
            kind: "typeId",
            name: {
              kind: "name",
              value: "Json",
              location: {
                start: { offset: 936, line: 39, column: 10 },
                end: { offset: 940, line: 39, column: 14 },
              },
            },
          },
          attributes: [],
          comment: null,
          location: {
            start: { offset: 929, line: 39, column: 3 },
            end: { offset: 940, line: 39, column: 14 },
          },
        },
        {
          kind: "field",
          name: {
            kind: "name",
            value: "field4",
            location: {
              start: { offset: 943, line: 40, column: 3 },
              end: { offset: 949, line: 40, column: 9 },
            },
          },
          type: {
            kind: "unsupported",
            type: { kind: "literal", value: "type" },
          },
          attributes: [],
          comment: null,
          location: {
            start: { offset: 943, line: 40, column: 3 },
            end: { offset: 969, line: 40, column: 29 },
          },
        },
      ],
      location: {
        start: { offset: 854, line: 36, column: 1 },
        end: { offset: 971, line: 41, column: 2 },
      },
    },
    {
      kind: "model",
      name: {
        kind: "name",
        value: "MyOtherModel",
        location: {
          start: { offset: 979, line: 43, column: 7 },
          end: { offset: 991, line: 43, column: 19 },
        },
      },
      members: [
        {
          kind: "field",
          name: {
            kind: "name",
            value: "id",
            location: {
              start: { offset: 996, line: 44, column: 3 },
              end: { offset: 998, line: 44, column: 5 },
            },
          },
          type: {
            kind: "typeId",
            name: {
              kind: "name",
              value: "String",
              location: {
                start: { offset: 1005, line: 44, column: 12 },
                end: { offset: 1011, line: 44, column: 18 },
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
                  start: { offset: 1013, line: 44, column: 20 },
                  end: { offset: 1016, line: 44, column: 23 },
                },
              },
              args: [],
              location: {
                start: { offset: 1012, line: 44, column: 19 },
                end: { offset: 1016, line: 44, column: 23 },
              },
            },
            {
              kind: "fieldAttribute",
              path: {
                kind: "path",
                value: ["default"],
                location: {
                  start: { offset: 1017, line: 44, column: 24 },
                  end: { offset: 1024, line: 44, column: 31 },
                },
              },
              args: [
                {
                  kind: "functionCall",
                  path: {
                    kind: "path",
                    value: ["uuid"],
                    location: {
                      start: { offset: 1025, line: 44, column: 32 },
                      end: { offset: 1029, line: 44, column: 36 },
                    },
                  },
                  args: [],
                },
              ],
              location: {
                start: { offset: 1016, line: 44, column: 23 },
                end: { offset: 1032, line: 44, column: 39 },
              },
            },
            {
              kind: "fieldAttribute",
              path: {
                kind: "path",
                value: ["map"],
                location: {
                  start: { offset: 1034, line: 44, column: 41 },
                  end: { offset: 1037, line: 44, column: 44 },
                },
              },
              args: [{ kind: "literal", value: "_id" }],
              location: {
                start: { offset: 1033, line: 44, column: 40 },
                end: { offset: 1044, line: 44, column: 51 },
              },
            },
          ],
          comment: null,
          location: {
            start: { offset: 996, line: 44, column: 3 },
            end: { offset: 1044, line: 44, column: 51 },
          },
        },
        {
          kind: "field",
          name: {
            kind: "name",
            value: "parentId",
            location: {
              start: { offset: 1047, line: 45, column: 3 },
              end: { offset: 1055, line: 45, column: 11 },
            },
          },
          type: {
            kind: "typeId",
            name: {
              kind: "name",
              value: "String",
              location: {
                start: { offset: 1056, line: 45, column: 12 },
                end: { offset: 1062, line: 45, column: 18 },
              },
            },
          },
          attributes: [],
          comment: null,
          location: {
            start: { offset: 1047, line: 45, column: 3 },
            end: { offset: 1062, line: 45, column: 18 },
          },
        },
        {
          kind: "field",
          name: {
            kind: "name",
            value: "text",
            location: {
              start: { offset: 1065, line: 46, column: 3 },
              end: { offset: 1069, line: 46, column: 7 },
            },
          },
          type: {
            kind: "typeId",
            name: {
              kind: "name",
              value: "String",
              location: {
                start: { offset: 1074, line: 46, column: 12 },
                end: { offset: 1080, line: 46, column: 18 },
              },
            },
          },
          attributes: [],
          comment: null,
          location: {
            start: { offset: 1065, line: 46, column: 3 },
            end: { offset: 1080, line: 46, column: 18 },
          },
        },
        {
          kind: "field",
          name: {
            kind: "name",
            value: "parent",
            location: {
              start: { offset: 1084, line: 48, column: 3 },
              end: { offset: 1090, line: 48, column: 9 },
            },
          },
          type: {
            kind: "typeId",
            name: {
              kind: "name",
              value: "MyModel",
              location: {
                start: { offset: 1091, line: 48, column: 10 },
                end: { offset: 1098, line: 48, column: 17 },
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
                  start: { offset: 1100, line: 48, column: 19 },
                  end: { offset: 1108, line: 48, column: 27 },
                },
              },
              args: [
                {
                  kind: "namedArgument",
                  name: {
                    kind: "name",
                    value: "fields",
                    location: {
                      start: { offset: 1109, line: 48, column: 28 },
                      end: { offset: 1115, line: 48, column: 34 },
                    },
                  },
                  expression: {
                    kind: "array",
                    items: [
                      {
                        kind: "path",
                        value: ["parentId"],
                        location: {
                          start: { offset: 1118, line: 48, column: 37 },
                          end: { offset: 1126, line: 48, column: 45 },
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
                      start: { offset: 1129, line: 48, column: 48 },
                      end: { offset: 1139, line: 48, column: 58 },
                    },
                  },
                  expression: {
                    kind: "array",
                    items: [
                      {
                        kind: "path",
                        value: ["id"],
                        location: {
                          start: { offset: 1142, line: 48, column: 61 },
                          end: { offset: 1144, line: 48, column: 63 },
                        },
                      },
                    ],
                  },
                },
              ],
              location: {
                start: { offset: 1099, line: 48, column: 18 },
                end: { offset: 1146, line: 48, column: 65 },
              },
            },
          ],
          comment: null,
          location: {
            start: { offset: 1084, line: 48, column: 3 },
            end: { offset: 1146, line: 48, column: 65 },
          },
        },
      ],
      location: {
        start: { offset: 973, line: 43, column: 1 },
        end: { offset: 1148, line: 49, column: 2 },
      },
    },
    {
      kind: "view",
      name: {
        kind: "name",
        value: "MyView",
        location: {
          start: { offset: 1155, line: 51, column: 6 },
          end: { offset: 1161, line: 51, column: 12 },
        },
      },
      members: [
        {
          kind: "field",
          name: {
            kind: "name",
            value: "id",
            location: {
              start: { offset: 1166, line: 52, column: 3 },
              end: { offset: 1168, line: 52, column: 5 },
            },
          },
          type: {
            kind: "typeId",
            name: {
              kind: "name",
              value: "Int",
              location: {
                start: { offset: 1172, line: 52, column: 9 },
                end: { offset: 1175, line: 52, column: 12 },
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
                  start: { offset: 1180, line: 52, column: 17 },
                  end: { offset: 1183, line: 52, column: 20 },
                },
              },
              args: [],
              location: {
                start: { offset: 1179, line: 52, column: 16 },
                end: { offset: 1183, line: 52, column: 20 },
              },
            },
            {
              kind: "fieldAttribute",
              path: {
                kind: "path",
                value: ["map"],
                location: {
                  start: { offset: 1184, line: 52, column: 21 },
                  end: { offset: 1187, line: 52, column: 24 },
                },
              },
              args: [{ kind: "literal", value: "_id" }],
              location: {
                start: { offset: 1183, line: 52, column: 20 },
                end: { offset: 1194, line: 52, column: 31 },
              },
            },
          ],
          comment: null,
          location: {
            start: { offset: 1166, line: 52, column: 3 },
            end: { offset: 1194, line: 52, column: 31 },
          },
        },
        {
          kind: "field",
          name: {
            kind: "name",
            value: "email",
            location: {
              start: { offset: 1197, line: 53, column: 3 },
              end: { offset: 1202, line: 53, column: 8 },
            },
          },
          type: {
            kind: "typeId",
            name: {
              kind: "name",
              value: "String",
              location: {
                start: { offset: 1203, line: 53, column: 9 },
                end: { offset: 1209, line: 53, column: 15 },
              },
            },
          },
          attributes: [],
          comment: null,
          location: {
            start: { offset: 1197, line: 53, column: 3 },
            end: { offset: 1209, line: 53, column: 15 },
          },
        },
        {
          kind: "field",
          name: {
            kind: "name",
            value: "name",
            location: {
              start: { offset: 1212, line: 54, column: 3 },
              end: { offset: 1216, line: 54, column: 7 },
            },
          },
          type: {
            kind: "typeId",
            name: {
              kind: "name",
              value: "String",
              location: {
                start: { offset: 1218, line: 54, column: 9 },
                end: { offset: 1224, line: 54, column: 15 },
              },
            },
          },
          attributes: [],
          comment: null,
          location: {
            start: { offset: 1212, line: 54, column: 3 },
            end: { offset: 1224, line: 54, column: 15 },
          },
        },
        {
          kind: "field",
          name: {
            kind: "name",
            value: "bio",
            location: {
              start: { offset: 1227, line: 55, column: 3 },
              end: { offset: 1230, line: 55, column: 6 },
            },
          },
          type: {
            kind: "typeId",
            name: {
              kind: "name",
              value: "String",
              location: {
                start: { offset: 1233, line: 55, column: 9 },
                end: { offset: 1239, line: 55, column: 15 },
              },
            },
          },
          attributes: [],
          comment: null,
          location: {
            start: { offset: 1227, line: 55, column: 3 },
            end: { offset: 1239, line: 55, column: 15 },
          },
        },
        {
          kind: "blockAttribute",
          path: {
            kind: "path",
            value: ["map"],
            location: {
              start: { offset: 1245, line: 57, column: 5 },
              end: { offset: 1248, line: 57, column: 8 },
            },
          },
          args: [
            { kind: "literal", value: "my_view" },
          ],
          comment: null,
          location: {
            start: { offset: 1243, line: 57, column: 3 },
            end: { offset: 1259, line: 57, column: 19 },
          },
        },
      ],
      location: {
        start: { offset: 1150, line: 51, column: 1 },
        end: { offset: 1261, line: 58, column: 2 },
      },
    },
  ],
};

export default ast;
