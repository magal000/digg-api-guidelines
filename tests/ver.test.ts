import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "./util/helperTest.ts";

testRule("Ver06", [
    {
        name: "giltigt testfall",
        document: {
          openapi: "3.1.0",
          info: { version: "1.0" },
          paths: { "/api-info": {} },
        },
        errors: [],
      },
      {
        name: "ogiltigt testfall",
        document: {
          openapi: "3.1.0",
          info: { version: "1.0" },
          paths: {},
        },
        errors: [
          {
            message:
              "Information om ett API SKALL tillgängliggöras via resursen api-info under roten '/' till API:et.",
            path: ["paths" ],
            severity: DiagnosticSeverity.Error,
          }
        ],
      },
  ]);