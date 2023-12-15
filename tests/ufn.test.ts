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

testRule("Ufn08", [
  {
      name: "giltigt testfall",
      document: {
        openapi: "3.1.0",
        info: { version: "1.0" },
        paths: { "/correct-use-of-dash/in-path": {} },
      },
      errors: [],
    },
    {
      name: "ogiltigt testfall - underscore i path",
      document: {
        openapi: "3.1.0",
        info: { version: "1.0" },
        paths: { "/invalid_path": {} },
      },
      errors: [
        {
          message: "Endast bindestreck '-' SKALL användas för att separera ord för att öka läsbarheten samt förenkla för sökmotorer att indexera varje ord för sig.",
          severity: DiagnosticSeverity.Error,
        }
      ],
    },
    {
      name: "ogiltigt testfall - två eller flera bindestreck i rad",
      document: {
        openapi: "3.1.0",
        info: { version: "1.0" },
        paths: { "/invalid--path": {} },
      },
      errors: [
        {
          message: "Endast bindestreck '-' SKALL användas för att separera ord för att öka läsbarheten samt förenkla för sökmotorer att indexera varje ord för sig.",
          severity: DiagnosticSeverity.Error,
        }
      ],
    },
    {
      name: "ogiltigt testfall - börjar med bindestreck",
      document: {
        openapi: "3.1.0",
        info: { version: "1.0" },
        paths: { "/-invalid-path": {} },
      },
      errors: [
        {
          message: "Endast bindestreck '-' SKALL användas för att separera ord för att öka läsbarheten samt förenkla för sökmotorer att indexera varje ord för sig.",
          severity: DiagnosticSeverity.Error,
        }
      ],
    },
    {
      name: "ogiltigt testfall - slutar med bindestreck",
      document: {
        openapi: "3.1.0",
        info: { version: "1.0" },
        paths: { "/invalid-path-": {} },
      },
      errors: [
        {
          message: "Endast bindestreck '-' SKALL användas för att separera ord för att öka läsbarheten samt förenkla för sökmotorer att indexera varje ord för sig.",
          severity: DiagnosticSeverity.Error,
        }
      ],
    },
    {
      name: "ogiltigt testfall - versaler i path",
      document: {
        openapi: "3.1.0",
        info: { version: "1.0" },
        paths: { "/Invalid-Path": {} },
      },
      errors: [
        {
          message: "Endast bindestreck '-' SKALL användas för att separera ord för att öka läsbarheten samt förenkla för sökmotorer att indexera varje ord för sig.",
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
testRule("Ufn10", [
  {
    name: "giltigt testfall",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      paths: {
        "/foo": {
          get: {
            description: "get",
            parameters: [
              {
                name: "tags",
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
        "/pets": {
          get: {
            description: "get",
            parameters: [
              {
                name: "t.a-g~s",
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
          "Understreck '_' SKALL (UFN.10) endast användas för att separera ord i query parameternamn.",
        path: ["paths", "/pets", "get", "parameters", "0","name"],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },
]);
