import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "./util/helperTest.ts";

testRule("Fel01", [
    {
      name: "giltigt testfall - goes here",
      document: {
        openapi: "3.1.0",
        info: { version: "1.0" },
        paths: {
          "/": {
            get: {},
          },
        },
      },
      errors: [],
    },
    {
      name: "ogiltigt testfall - goes here",
      document: {
        openapi: "3.1.0",
        info: { version: "1.0" },
        paths: {
          "/": {
          },
        },
      },
      errors: [
        {
            //TOO
        },
      ],
    }  
    ]);