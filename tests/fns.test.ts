import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "./util/helperTest.ts";

testRule("Fns01", [
  {
      name: "giltigt testfall",
      document: {
        openapi: "3.1.0",
        info: { version: "1.0" },
        parameter: { "/{petId}": {} },
      },
      errors: [],
    },
      {
      name: "ogiltigt testfall",
      document: {
        openapi: "3.1.0",
        info: { version: "1.0" },
        parameter: { "/thisisnotcamelcase": {} },
      },
      errors: [
        {
          message: "/thisisnotcamelcase--> Parameternamn SKALL anges med en konsekvent namnkonvention exempelvis antingen snake_case eller camelCase",
          path: ["parameter", "/thisisnotcamelcase"],
          severity: DiagnosticSeverity.Error,
        }
      ],
    },  
  ]);

  