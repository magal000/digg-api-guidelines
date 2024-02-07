import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "./util/helperTest.ts";

testRule("For02", [
    {
      name: "giltigt testfall",
      document: {
        openapi: "3.1.0",
        info: { version: "1.0" },
        paths: {
          "/bodycheck": {
            get: {
              description: "EN GET -förfrågan SKALL INTE acceptera ett body",
              parameters: [
                {
                  name: "veryLongName",
                  in: "query",
                  required: false,
                },
              ],
            },
          },
        },
      },
      errors: [],
    },
  
    {
      name: "ogiltigt testfall",
      document: {
        openapi: "3.1.0",
        info: { version: "1.0" },
        paths: {
          "/bodycheck": {
            get: {
              description: "EN GET -förfrågan SKALL INTE acceptera ett body",
              parameters: [
                {
                  name: "body",
                  in: "query",
                  required: false,
                },
              ],
            },
          },
        },
      },
      errors: [
        {
          message:
            "EN GET -förfrågan SKALL INTE acceptera ett body",
          path: ["paths", "/bodycheck", "get", "parameters", "0","name"],
          severity: DiagnosticSeverity.Error,
        },
      ],
    }
  ]);