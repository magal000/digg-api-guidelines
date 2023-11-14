import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "./util/helperTest.ts";
testRule("Ufn09", [
    {
        name: "giltigt testfall",
        document: {
          openapi: "3.1.0",
          info: { version: "1.0" },
          paths: { "/detta-är-kebab-case": {} },
        },
        errors: [],
      },
      {
        name: "ogiltigt testfall",
        document: {
          openapi: "3.1.0",
          info: { version: "1.0" },
          paths: { "/Detta_är_snake_case": {} },
        },
        errors: [
          {
            message:
              "Blanksteg ' ' och understreck '_' SKALL INTE användas i URL:er med undantag av parameter-delen.",
            path: ["paths", "/Detta_är_snake_case"],
            severity: DiagnosticSeverity.Error,
          },
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
        name: "ogiltigt testfall",
        document: {
          openapi: "3.1.0",
          info: { version: "1.0" },
          paths: { "http://www.example.com": {} },
        },
        errors: [
          {
            message:
              "Alla API:er SKALL exponeras via HTTPS på port 443",
            path: ["paths", "http://www.example.com"],
            severity: DiagnosticSeverity.Error,
          },
        ],
      },
      {
        name: "ogiltigt testfall",
        document: {
          openapi: "3.1.0",
          info: { version: "1.0" },
          paths: { "https://": {} }, // Det behöver finnas något mer i pathen efter https://
        },
        errors: [
          {
            message:
              "Alla API:er SKALL exponeras via HTTPS på port 443",
            path: ["paths", "http://www.example.com"],
            severity: DiagnosticSeverity.Error,
          },
        ],
      },      
]);

