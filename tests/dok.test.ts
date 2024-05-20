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

testRule("Dok15Get", [
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
              description: "test",
              content: {
                'application/json':{
                  schema: {
                    examples: "s"
                  }
                }
              }
            }
          }
        },
      } },
      components:{
        schemas: {
          Error1: {
            examples:"test"
          }
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
            "200": {
              description: "",
              content: {
                "application/json":{
                  schema: {
                    test: "ds"
                  }
                }
              }

            }
          }
        },
      } },
      components:{
        schemas: {
          Error1: {
            
          }
        }
      }
    },
    errors: [
      {
        code: "Dok15Get",
        message: "I dokumentationen av API:et SKALL exempel på API:ets fråga (en:request) och svar (en:reply) finnas i sin helhet.",
        path: ["paths", "/Dettacase", "get", "responses", "200", "content","application/json","schema"],
        severity: DiagnosticSeverity.Error,
        range: {"start": {
            "line": 0,
            "character": 319
          },
          "end": {
            "line": 0,
            "character": 331
          }
        }
      },
     
    ],
  }
  
]);

testRule("Dok15ReqBody", [
  {
    name: "giltigt testfall",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      servers: [{ url: "https://example.com/my-api/v1" }],
      paths: { "/Dettacase": {
        post: {
          requestBody:{
            content: {
              'application/json':{
                  examples: "s"
                }
            },
          '200': {
            description: "test",
            }
          },
          description: "Ogiltigt testfall av CamelCase",
          parameters: [
            {
              name: "Very_LongName",
              in: "path",
              required: false,
            },
          ],
          
          responses: {
            
          }
        },
      } },
      components:{
        schemas: {
          Error1: {
            examples:"test"
          }
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
      paths: { "/Dettacase": {
        post: {
          requestBody:{
            content: {
              'application/json':{
                  inteexamples: "s"
                }
            },
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
              description: "test",
              }
            }
          }
        },
      } },
      components:{
        schemas: {
          Error1: {
            
          }
        }
      }
    },
    errors: [
      {
        code: "Dok15ReqBody",
        message: "I dokumentationen av API:et SKALL exempel på API:ets fråga (en:request) och svar (en:reply) finnas i sin helhet.",
        path: ["paths", "/Dettacase", "post", "requestBody", "content","application/json"],
        severity: DiagnosticSeverity.Error,
        range: {"start": {
            "line": 0,
            "character": 172
          },
          "end": {
            "line": 0,
            "character": 191
          }
        }
      },
     
    ],
  }
  
]);