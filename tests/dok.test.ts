import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "./util/helperTest.ts";

testRule("Dok23", [
    {
      name: "giltigt testfall",
      document: {
        openapi: "3.1.0",
        info: { version: "1.0" },
        servers: [{ url: "https://example.com/my-api/v1" }],
       
      },
      errors: [],
    },
    {
        name: "ogiltigt testfall 1",
        document: {
          openapi: "3.1.0",
          info: { version: "1.0" },
          servers: [{ url: "http://api.example.com/" }],
          
        },
        errors: [
          {
            message: "API specifikationen SKALL återfinnas under API-roten.",
            path: ["servers", "0", "url"],
            severity: DiagnosticSeverity.Error,
          },
        ],
      },
]);
testRule("Dok20", [
  {
    name: "giltigt testfall",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      servers: [{ url: "https://example.com/my-api/v1" }],
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
          responses: {
            '200': {
              description: "test"
            }
          }
        },
      } },
     
    },
    errors: [],
  },
  {
    name: "ogiltigt testfall",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      servers: [{ url: "https://example.com/my-api/v1" }],
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
          responses: {
            '200': {
              description: ""
            }
          }
        },
      } },
     
    },
    errors: [
      {
        code: "Dok20",
        message: "Förväntade returkoder och felkoder SKALL vara fullständigt dokumenterade.",
        path: ["paths", "/Dettacase", "get", "responses", "200", "description"],
        severity: DiagnosticSeverity.Error,
        range: {"start": {
            "line": 0,
            "character": 276
          },
          "end": {
            "line": 0,
            "character": 278
          }
        }
      },
    ],
  }
  
]);

testRule("Dok19", [
  {
    name: "giltigt testfall",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      servers: [{ url: "https://example.com/my-api/v1" }],
      paths: { "/thiscase": {
        get: {
          description: "description field test",
          responses: {
            '200': {
              description: "test"
            }
          }
        },
        post: {
          description: "description field test",
          responses: {
            '200': {
              description: "test"
            }
          }
        },
      } },
     
    },
    errors: [],
  },
  {
    name: "ogiltigt testfall",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      servers: [{ url: "https://example.com/my-api/v1" }],
      paths: { "/thiscase": {
        get: {
          summery: "",
          responses: {
            '200': {
              description: ""
            }
          }
        },
        post: {
          summery: "",
          responses: {
            '200': {
              description: ""
            }
          }
        }
      } },
     
    },
    errors: [
      {
        code: "Dok19",
        message: "Kontroll om förekomst av fältet description finns i specifikationen under respektive operation get/post",
        path: ["paths", "/thiscase", "get"],
        severity: DiagnosticSeverity.Error,
       },
       {
        code: "Dok19",
        message: "Kontroll om förekomst av fältet description finns i specifikationen under respektive operation get/post",
        path: ["paths", "/thiscase", "post"],
        severity: DiagnosticSeverity.Error,
       },
    ],
    
  }
  
]);