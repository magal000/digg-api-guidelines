import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "./util/helperTest.ts";
testRule("Ufn09", [
    {
        name: "giltigt testfall",
        document: {
          openapi: "3.1.0",
          info: { version: "1.0" },
          paths: { "/this-is-kebab-case": {} },
        },
        errors: [],
      },
      {
        name: "ogiltigt testfall",
        document: {
          openapi: "3.1.0",
          info: { version: "1.0" },
          paths: { "/Detta_e_snake_case": {} },
        },
        errors: [
          {
            message:
              "/Detta_e_snake_case --> ska vara kebab-case (gemener och separerade med ett '-').[Kategori: URL format och namngivning, Typ: SKALL INTE]",
            path: ["paths", "/Detta_e_snake_case"],
            severity: DiagnosticSeverity.Error,
          }
        ],
      },
]);
testRule("Ufn06", [
  {
      name: "giltigt testfall",
      document: {
        openapi: "3.1.0",
        info: { version: "1.0" },
        paths: { "/thisisnotanuppercaseurl": {} },
      },
      errors: [],
    },
    {
      name: "ogiltigt testfall",
      document: {
        openapi: "3.1.0",
        info: { version: "1.0" },
        paths: { "/ThisIsAnUpperCaseUrl": {} },
      },
      errors: [
        {
          message:
            "/ThisIsAnUpperCaseUrl - Bokstäver i URL:n SKALL bestå av enbart gemener",
          path: ["paths", "/ThisIsAnUpperCaseUrl"],
          severity: DiagnosticSeverity.Error,
        }
      ],
    },
]);
testRule("Ufn02", [
    {
        name: "giltigt testfall",
        document: {
          openapi: "3.1.0",
          info: { version: "1.0" },
          paths: { "https://www.example.com": {} },
        },
        errors: [],
      },
      {
        name: "ogiltigt testfall 1",
        document: {
          openapi: "3.1.0",
          info: { version: "1.0" },
          paths: { "/": {} },
          servers: [{ url: "http://api.example.com/" }],
        },
        errors: [
          {
            message: "url Alla API:er SKALL exponeras via HTTPS på port 443.",
            path: ["servers", "0", "url"],
            severity: DiagnosticSeverity.Error,
          },
        ],
      },
]);
