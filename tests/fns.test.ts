import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "./util/helperTest.ts";

testRule("Fns01", [
  {
      name: "giltigt testfall",
      document: {
        openapi: "3.1.0",
        info: { version: "1.0" },
        paths: { "/camelCase": {} },
      },
      errors: [],
    },
      {
      name: "ogiltigt testfall",
      document: {
        openapi: "3.1.0",
        info: { version: "1.0" },
        paths: { "/pets": {} },
        parameters: [{ name: "Thisisnotcamelcase", in: "query"}]
     },
      errors: [
        {
          message: "Thisisnotcamelcase Parameternamn SKALL anges med en konsekvent namnkonvention exempelvis antingen snake_case eller camelCase",
          path: ["parameters", "0", "name"],
          severity: DiagnosticSeverity.Error,
        }
      ],
    },  
  ]);

  