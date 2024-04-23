import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "./util/helperTest.ts";

testRule("Ufn09Path", [
    {
        name: "giltigt testfall",
        document: {
          openapi: "3.1.0",
          info: { version: "1.0" },
          servers: [
            {url:"https://test.se/v1/dsa"}
          ],
          paths: { "/this-is-kebab-case": {} },
        },
        errors: [],
      },
      {
        name: "ogiltigt testfall",
        document: {
          openapi: "3.1.0",
          info: { version: "1.0" },
          servers: [
            {url:"https://test.se/v1/dsa"}
          ],
          paths: { "/Detta_e_snake_case": {} },
        },
        errors: [
          {
            message:
              "Blanksteg ' ' och understreck '_' SKALL INTE användas i URL:er med undantag av parameter-delen.",
            path: ["paths", "/Detta_e_snake_case"],
            severity: DiagnosticSeverity.Error,
          }
        ],
      },
      
]);

testRule("Ufn09Server", [
  {
      name: "giltigt testfall",
      document: {
        openapi: "3.1.0",
        info: { version: "1.0" },
        servers: [
          {url:"https://test.se/v1/dsa"}
        ],
        paths: { "/this-is-kebab-case": {} },
      },
      errors: [],
    },
    {
      name: "ogiltigt testfall - understreck i server url",
      document: {
        openapi: "3.1.0",
        info: { version: "1.0" },
        servers: [
          {url:"https://test.se/v1_/dsa"}
        ],
        paths: { "/Dettacase": {} },
      },
      errors: [
        {
          message:
            "Blanksteg ' ' och understreck '_' SKALL INTE användas i URL:er med undantag av parameter-delen.",
          path: ["servers", "0","url"],
          severity: DiagnosticSeverity.Error,
        }
      ],
    },
    
]);
testRule("Ufn09InPathParameters", [
  {
      name: "giltigt testfall",
      document: {
        openapi: "3.1.0",
        info: { version: "1.0" },
        servers: [
          {url:"https://test.se/v1/dsa"}
        ],
        paths: { "/this-is-kebab-case": {
          get: {
            description: "Ogiltigt testfall av CamelCase",
            parameters: [
              {
                name: "VeryLongName",
                in: "path",
                required: false,
              },
            ],
          },
        } },
      },
      errors: [],
    },
    {
      name: "ogiltigt testfall - understreck i server url",
      document: {
        openapi: "3.1.0",
        info: { version: "1.0" },
        servers: [
          {url:"https://test.se/v1_/dsa"}
        ],
        paths: { "/Dettacase": {
          get: {
            description: "Ogiltigt testfall av CamelCase",
            parameters: [
              {
                name: "Very_LongName",
                in: "path",
                required: false,
              },
            ],
          },
        } },
      },
      errors: [
        {
          message:
            "Blanksteg ' ' och understreck '_' SKALL INTE användas i URL:er med undantag av parameter-delen.",
          path: ["paths", "/Dettacase","get","parameters","0","name"],
          severity: DiagnosticSeverity.Error,
        }
      ],
    },
    
]);



testRule("Ufn07", [
  {
      name: "giltigt testfall",
      document: {
        openapi: "3.1.0",
        info: { version: "1.0" },
        servers: [
          { url: "http://api.example.com" },
          { url: "http://api.example.com" }
        ],
        paths: { "/abcdefghijklmnopqrstuvxyz-._~": {} },
      },
      errors: [],
    },
    {
      name: "ogiltigt testfall med asterisk i path",
      document: {
        openapi: "3.1.0",
        info: { version: "1.0" },
        servers: [{ url: "http://api.example.com" }],
        paths: { "/a-*:-is-not-allowed": {} },
      },
      errors: [
        {
          message: 'URL:n SKALL använda tecken som är URL-säkra (tecknen a-z, 0-9, \"-\", \".\", \"_\" samt \"~\", se vidare i RFC 3986).',
          severity: DiagnosticSeverity.Error,
        }
      ],
    },
    {
      name: "ogiltigt testfall med asterisk i server url",
      document: {
        openapi: "3.1.0",
        info: { version: "1.0" },
        servers: [{ url: "http://api.exa*mple.com" }],
        paths: { "/a--is-not-allowed": {} },
      },
      errors: [
        {
          message: 'URL:n SKALL använda tecken som är URL-säkra (tecknen a-z, 0-9, \"-\", \".\", \"_\" samt \"~\", se vidare i RFC 3986).',
          severity: DiagnosticSeverity.Error,
        }
      ],
    },
    {
      name: "ogiltigt testfall med # i server url",
      document: {
        openapi: "3.1.0",
        info: { version: "1.0" },
        servers: [
          { url: "http://api.example.com" },
          { url: "http://api.exam#ple.com" }
        ],
        paths: { "/a--is-not-allowed": {} },
      },
      errors: [
        {
          message: 'URL:n SKALL använda tecken som är URL-säkra (tecknen a-z, 0-9, \"-\", \".\", \"_\" samt \"~\", se vidare i RFC 3986).',
          severity: DiagnosticSeverity.Error,
        }
      ],
    },
    {
      name: "ogiltigt testfall med # i server path",
      document: {
        openapi: "3.1.0",
        info: { version: "1.0" },
        servers: [
          { url: "http://api.example.com" },
          { url: "http://api.example.com" }
        ],
        paths: { "/a--is-not-allowed": {},"/a--i#s-not-alslowed": {} },
      },
      errors: [
        {
          message: 'URL:n SKALL använda tecken som är URL-säkra (tecknen a-z, 0-9, \"-\", \".\", \"_\" samt \"~\", se vidare i RFC 3986).',
          severity: DiagnosticSeverity.Error,
        }
      ],
    },
]);

testRule("Ufn08", [
  {
    name: "giltigt testfall - bara gemener och bindestreck ('-')",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      paths: { "/correct-use-of-dash/in-path": {} },
    },
    errors: [],
  },
  {
    name: "giltigt testfall - ignorera path parametrar",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      paths: { "/correct-use-of-dash/in-path/{path_param_1}/{path_param_2}": {} },
    },
    errors: [],
  },
  {
    name: "giltigt testfall - ignorera versaler, finns annan regel för det",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      paths: { "p-ath-with-UPPERCASE": {} },
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
    name: "ogiltigt testfall - tilde i path",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      paths: { "/invalid~path": {} },
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
]);
testRule("Ufn06", [
  {
      name: "giltigt testfall",
      document: {
        openapi: "3.1.0",
        info: { version: "1.0" },
        paths: { "/this-is-not/{an_upper_case_url}": {} },
      },
      errors: [],
    },
    {
      name: "ogiltigt testfall - upper case",
      document: {
        openapi: "3.1.0",
        info: { version: "1.0" },
        paths: { "/This-IsAn_UpperCaseUrl": {} },
      },
      errors: [
        {
          message:
            "Bokstäver i URL:n SKALL bestå av enbart gemener.",
          path: ["paths", "/This-IsAn_UpperCaseUrl"],
          severity: DiagnosticSeverity.Error,
        }
      ],
    },
    {
      name: "ogiltigt testfall - upper case path param",
      document: {
        openapi: "3.1.0",
        info: { version: "1.0" },
        paths: { "/lower/{PathParam}": {} },
      },
      errors: [
        {
          message:
            "Bokstäver i URL:n SKALL bestå av enbart gemener.",
          path: ["paths", "/lower/{PathParam}"],
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
          message: "Alla API:er SKALL exponeras via HTTPS på port 443.",
          path: ["servers", "0", "url"],
          severity: DiagnosticSeverity.Error,
        },
      ],
    },
]);
testRule("Ufn05", [
    {
      name: "giltigt testfall",
      document: {
        servers: [{
          url:"https://pets.se/dsa/v1"
        }],
        openapi: "3.1.0",
        info: { version: "1.0" },
        paths: { "/pets/{id}": {} },
      },
      errors: [],
    },
    {
      name: "ogiltigt testfall",
      document: {
        servers: [{
          url:"https://pets.se/dsa/v1"
        }],
        openapi: "3.1.0",
        info: { version: "1.0" },
        paths: { "/asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf": {} },
      },
      errors: [
        {
          message: 'En URL BÖR INTE vara längre än 2048 tecken.',
          severity: DiagnosticSeverity.Warning,
          path: ['servers', "0"]
        },
        {
          message: 'En URL BÖR INTE vara längre än 2048 tecken.',
          severity: DiagnosticSeverity.Warning,
          path: ['paths','/asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf']
        }
      ],
    },
    {
      name: "ogiltigt testfall",
      document: {
        servers: [{
          url:"https://pets.se/dsa/v1"
        }],
        openapi: "3.1.0",
        info: { version: "1.0" },
        paths: { "/testpath": {
          "get": {
            "summary": "List all pets",
            "operationId": "listPets",
            "tags": [
              "pets"
            ],
            "parameters": [
              {
                "name": "PAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAramPAram",
                "in": "query",
                "description": "How many items to return at one time (max 100)",
                "required": false,
                "schema": {
                  "type": "integer",
                  "maximum": 100,
                  "format": "int32"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "A paged array of pets",
                "headers": {
                  "x-next": {
                    "description": "A link to the next page of responses",
                    "schema": {
                      "type": "string"
                    }
                  }
                },
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/Pets"
                    }
                  }
                }
              },
              "default": {
                "description": "unexpected error",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/Error"
                    }
                  }
                }
              }
            }
          }
        } },
      },
      errors: [
        {
          message: 'En URL BÖR INTE vara längre än 2048 tecken.',
          severity: DiagnosticSeverity.Warning,
          path: ['servers', "0"]
        },
        {
          message: 'En URL BÖR INTE vara längre än 2048 tecken.',
          severity: DiagnosticSeverity.Warning,
          path: ['paths','/testpath','get','parameters']
        }
      ],
    }
  
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
          "Understreck '_' SKALL endast användas för att separera ord i parameternamn.",
        path: ["paths", "/pets", "get", "parameters", "0","name"],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },
]);
testRule("Ufn11", [
  {
      name: "giltigt testfall",
      document: {
        openapi: "3.1.0",
        info: { version: "1.0" },
        paths: { "/": {} },
        servers: [{ url: "http://petstore.swwagger.com/api/v2" }],        
      },
      errors: [],
    },
    {
      name: "ogiltigt testfall",
      document: {
        openapi: "3.1.0",
        info: { version: "1.0" },
        paths: { "/": {} },
        servers: [{ url: "http://petstore.swwagger.com/a_pi/v_2" }],        
      },
      errors: [
        {
          message:
            "Understreck '_' SKALL INTE vara del av bas URL:en.",
          path: ["servers", "0","url"],
          severity: DiagnosticSeverity.Error,
        }
      ],
    },
]);

testRule("Ufn01", [
  {
    name: "giltigt testfall",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      paths: { "/exampletest": {} },
      servers: [{ url: "http://petstore.swwagger.com/api/v2/" }]
     
    },
    errors: [],
  },
  {
    name: "giltigt testfall",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      paths: { "/exampletest": {} },
      servers: [{ url: "http://api.petstore.sw/dsad/v22" }]
     
    },
    errors: [],
  },
  {
    name: "ogiltigt testfall - fel format på protokoll",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      paths: { "/exampletest232323": {} },
      servers: [{ url: "htt//petstore.swwagger.com/api/v2" }],
      
    },
    errors: [
      {
        message: "En URL för ett API BÖR följa namnstandarden nedan: {protokoll}://{domännamn}/{api}/{version}/{resurs}/{identifierare}?{parametrar}",
        severity: DiagnosticSeverity.Warning,
      },
    ],
  },  
  {
    name: "ogiltigt testfall - saknar major versions nummer",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      paths: { "/exampletest232323": {} },
      servers: [{ url: "http//petstore.swwagger.com/api/v" }],
      
    },
    errors: [
      {
        message: "En URL för ett API BÖR följa namnstandarden nedan: {protokoll}://{domännamn}/{api}/{version}/{resurs}/{identifierare}?{parametrar}",
        severity: DiagnosticSeverity.Warning,
      },
    ],
  },
  {
    name: "ogiltigt testfall - sknar : efter protokoll",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      paths: { "/exampletest232323": {} },
      servers: [{ url: "http//petstorecom/api/v2" }],
      
    },
    errors: [
      {
        message: "En URL för ett API BÖR följa namnstandarden nedan: {protokoll}://{domännamn}/{api}/{version}/{resurs}/{identifierare}?{parametrar}",
        severity: DiagnosticSeverity.Warning,
      },
    ],
  },
  {
    name: "ogiltigt testfall - Saknar api och version",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      paths: { "/exampletest232323": {} },
      servers: [{ url: "http://petstorecom/" }],
      
    },
    errors: [
      {
        message: "En URL för ett API BÖR följa namnstandarden nedan: {protokoll}://{domännamn}/{api}/{version}/{resurs}/{identifierare}?{parametrar}",
        severity: DiagnosticSeverity.Warning,
      },
    ],
  },
  {
    name: "ogiltigt testfall - fel plats version och api",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      paths: { "/exampletest232323": {} },
      servers: [{ url: "http://petstorecom/v2/api" }],
      
    },
    errors: [
      {
        message: "En URL för ett API BÖR följa namnstandarden nedan: {protokoll}://{domännamn}/{api}/{version}/{resurs}/{identifierare}?{parametrar}",
        severity: DiagnosticSeverity.Warning,
      },
    ],
  },
  {
    name: "ogiltigt testfall - Fel format på version",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      paths: { "/exampletest232323": {} },
      servers: [{ url: "http://petstorecom/test/v22dsa/" }],
      
    },
    errors: [
      {
        message: "En URL för ett API BÖR följa namnstandarden nedan: {protokoll}://{domännamn}/{api}/{version}/{resurs}/{identifierare}?{parametrar}",
        severity: DiagnosticSeverity.Warning,
      },
    ],
  },
  {
    name: "ogiltigt testfall - dubbel //",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      paths: { "/exampletest232323": {} },
      servers: [{ url: "https://myapi.example.com//v2" }],
      
    },
    errors: [
      {
        message: "En URL för ett API BÖR följa namnstandarden nedan: {protokoll}://{domännamn}/{api}/{version}/{resurs}/{identifierare}?{parametrar}",
        severity: DiagnosticSeverity.Warning,
      },
    ],
  },
]);