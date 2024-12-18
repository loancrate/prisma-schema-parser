/* eslint-disable no-console */
import { readFileSync } from "fs";
import { formatAst, parsePrismaSchema } from ".";

test("README", () => {
  console.log = jest.fn();
  const ast = parsePrismaSchema(
    readFileSync("test-data/schema.prisma", { encoding: "utf8" }),
  );
  // ... manipulate the schema ...
  console.log(formatAst(ast));
});
