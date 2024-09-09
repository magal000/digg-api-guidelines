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
testRule("Dok07", [
  {
    name: "giltigt testfall",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0",
        description:"john"
       },
      servers: [{ url: "https://example.com/my-api/v1" }],
     
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
        code: "Dok07",
        message: "Dokumentationen av ett API BÖR innehålla övergripande information om API:et.",
        path: ["info"],
        severity: DiagnosticSeverity.Warning,
        range: {"start": {
            "line": 0,
            "character": 26
          },
          "end": {
            "line": 0,
            "character": 42
          }
        }
      },
    ],
  }
  
]);
testRule("Dok17", [
  {
    name: "giltigt testfall",
    document: {
      openapi: "3.1.0",
    },
    errors: [],
  },
  {
    name: "ogiltigt testfall",
    document: {
      swagger: "2.0",
    },
    errors: [
      {
        message: "API specifikation BÖR dokumenteras med den senaste versionen av OpenAPI Specification. ( Linter-analysverktyget (RAP-LP) för den nationella REST API-profilen är designat för senaste major versionen av OpenAPI Specification. Använd därför denna för full täckning av de implementerade reglerna. )",
        //message: "AAA",
        path: ["swagger"],
        severity: DiagnosticSeverity.Warning,
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
        operation: {
          description: "description field test",
          responses: {
            '200': {
              description: "test"
            }
          }
        },
        }     
      }
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
        operation: {
          //description: "dfadfa",
          summery: "",
          responses: {
            '200': {
              description: ""
            }
          }
        }
        }
      }
    },
    errors: [
      {
        code: "Dok19",
        message: "Kontroll om förekomst av fältet description finns i specifikationen under respektive operation get/post",
        path: ["paths", "/thiscase","operation"],
        severity: DiagnosticSeverity.Error,
       },
    ],
    
  }
  
]);

testRule("Dok01", [
  {
    name: "giltigt testfall",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      servers: [{ url: "https://example.com/my-api/v1" }],
      externalDocs: { 
          description: "API Documentation and specification", 
          url:"External link to API"
        }
      },
    errors: [],
  },
  {
    name: "ogiltigt testfall",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      servers: [{ url: "https://example.com/my-api/v1" }],
      externalDocs: { 
        //description: "API Documentation and specification", 
        //url:"External link to API"
      }
      },
    errors: [
      {

        code: "Dok01",
        path: ['externalDocs'],
        message: "I regel BÖR dokumentationen och specifikationen för ett API finnas allmänt tillgänglig online",
        severity: DiagnosticSeverity.Warning,
      },
    ],
  },
]);