import testAst from "../test-data/ast";
import { ModelDeclaration } from "./ast";
import { visitAst } from "./visit";

describe("visit", () => {
  test("basic", () => {
    const enterModel = jest.fn();
    const leaveModel = jest.fn();
    const enterBlockAttribute = jest.fn();
    const leaveBlockAttribute = jest.fn();
    visitAst<ModelDeclaration>(
      {
        kind: "model",
        name: { kind: "name", value: "M" },
        members: [
          {
            kind: "blockAttribute",
            path: { kind: "path", value: ["map"] },
            args: [{ kind: "literal", value: "m" }],
          },
        ],
      },
      {
        model: {
          enter: enterModel,
          leave: leaveModel,
        },
        blockAttribute: {
          enter: enterBlockAttribute,
          leave: leaveBlockAttribute,
        },
      }
    );
    expect(enterModel).toHaveBeenCalled();
    expect(leaveModel).toHaveBeenCalled();
    expect(enterBlockAttribute).toHaveBeenCalled();
    expect(leaveBlockAttribute).toHaveBeenCalled();
  });

  test("full schema", () => {
    visitAst(testAst, {});
  });
});
