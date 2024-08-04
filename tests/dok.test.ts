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
        path: ["swagger"],
        severity: DiagnosticSeverity.Warning,
      },
    ],
  },
  {
    name: "ogiltigt testfall",
    document: {
      openapi: "2.1.0",
    },
    errors: [
      {
        message: "API specifikation BÖR dokumenteras med den senaste versionen av OpenAPI Specification. ( Linter-analysverktyget (RAP-LP) för den nationella REST API-profilen är designat för senaste major versionen av OpenAPI Specification. Använd därför denna för full täckning av de implementerade reglerna. )",
        path: ["openapi"],
        severity: DiagnosticSeverity.Warning,
      },
    ],
  },
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
          //summery: "",
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
        message: "Ett API:s resurser och de möjliga operationer som kan utföras på resursen SKALL beskrivas så utförligt och tydligt som möjligt |Kontroll om förekomst av fältet description finns i specifikationen under respektive operation get/post",
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


testRule("Dok03Info", [
  {
    
    name: "giltigt testfall",
    document: {
      servers: [{
        url:"https://pets.se/dsa/v1"
      }],
      openapi: "3.1.0",
      info: { version: "21.0.0",
              title: "AME",
              description: "API message",
              termsOfService: "http://swagger.io/terms/",
              contact: {
                name: "Swagger AP",
                url: "http://swagger.io"
              },
              license:{
                name: "Apache 2.0",
                url: "https://www.apache.org/licenses/LICENSE-2.0.html"
              }

       },
      
    },
    errors: [],
  },
  
  {
    name: "ogiltigt testfall",
    document: {
      openapi: "3.1.0",
      info: {  },
      },
    errors: [
      {

        code: "Dok03Info",
        path: ['info'],
        message:  "Dokumentationen för ett API SKALL (DOK.03) innehålla följande: Om API, Användarvillkor, Datamodell för representation av resurser, Krav på autentisering, Livscykelhantering och versionshantering,Kontaktuppgifter." + "[ info objektet bör ha title, version , description, termsOfService, contact , license ]",
        severity: DiagnosticSeverity.Warning,
      },
    ],
  },
]);

testRule("Dok03ContactName", [
  {
    
    name: "giltigt testfall",
    document: {
      servers: [{
        url:"https://pets.se/dsa/v1"
      }],
      openapi: "3.1.0",
      info: { 
              contact: {
                name: "Swagger AP"
                
              }

       },
      
    },
    errors: [],
  },
  
  {
    name: "ogiltigt testfall",
    document: {
      openapi: "3.1.0",
      info: { 
        contact: {
            nname: "Swagger AP",
          } 
      },
    },
    errors: [
      {

        code: "Dok03ContactName",
        path: ["info","contact"],
        message:  "Dokumentationen för ett API SKALL (DOK.03) innehålla följande: Om API, Användarvillkor, Datamodell för representation av resurser, Krav på autentisering, Livscykelhantering och versionshantering,Kontaktuppgifter." + "(Contact saknar name)"
      }
    ],
  },
]);

testRule("Dok03ContactEmail", [
  {
    
    name: "giltigt testfall",
    document: {
      servers: [{
        url:"https://pets.se/dsa/v1"
      }],
      openapi: "3.1.0",
      info: { 
              contact: {
                email: "email@email.com"
                
              }

       },
      
    },
    errors: [],
  },
  
  {
    name: "ogiltigt testfall",
    document: {
      openapi: "3.1.0",
      info: { 
        contact: {
          
            emaill: "abce@emil.com"
        } 
      },
    },
    errors: [
      {

        code: "Dok03ContactEmail",
        path: ["info","contact"],
        message:  "Dokumentationen för ett API SKALL (DOK.03) innehålla följande: Om API, Användarvillkor, Datamodell för representation av resurser, Krav på autentisering, Livscykelhantering och versionshantering,Kontaktuppgifter.(Contact saknar email)"
      }
    ],
  },
]);

testRule("Dok03ContactUrl", [
  {
    
    name: "giltigt testfall",
    document: {
      servers: [{
        url:"https://pets.se/dsa/v1"
      }],
      openapi: "3.1.0",
      info: { 
              contact: {
                url: "http://swagger.io"
                
              }

       },
      
    },
    errors: [],
  },
  
  {
    name: "ogiltigt testfall",
    document: {
      openapi: "3.1.0",
      info: { 
        contact: {
          
            urll: "http://swagger.io"
        } 
      },
    },
    errors: [
      {

        code: "Dok03ContactUrl",
        path: ["info","contact"],
        message:  "Dokumentationen för ett API SKALL (DOK.03) innehålla följande: Om API, Användarvillkor, Datamodell för representation av resurser, Krav på autentisering, Livscykelhantering och versionshantering,Kontaktuppgifter.(Contact saknar url)"
      }
    ],
  },
]);

testRule("Dok03Contact", [
  {
    
    name: "giltigt testfall",
    document: {
      servers: [{
        url:"https://pets.se/dsa/v1"
      }],
      openapi: "3.1.0",
      info: { 
              contact: { }

       },
      
    },
    errors: [],
  },
  
  {
    name: "ogiltigt testfall",
    document: {
      openapi: "3.1.0",
      info: { 
        ccontact: {  } 
      },
    },
    errors: [
      {

        code: "Dok03Contact",
        path: ["info"],
        message:  "Dokumentationen för ett API SKALL (DOK.03) innehålla följande: Om API, Användarvillkor, Datamodell för representation av resurser, Krav på autentisering, Livscykelhantering och versionshantering,Kontaktuppgifter.(Saknar contact objektet)"
      }
    ],
  },
]);

testRule("Dok03LicenseUrl", [
  {
    
    name: "giltigt testfall",
    document: {
      servers: [{
        url:"https://pets.se/dsa/v1"
      }],
      openapi: "3.1.0",
      info: { 
        license: { url: "https://pets.se/dsa/v1"}

       },
      
    },
    errors: [],
  },
  
  {
    name: "ogiltigt testfall",
    document: {
      openapi: "3.1.0",
      info: { 
        license: { uurl:"" } 
      },
    },
    errors: [
      {

        code: "Dok03LicenseUrl",
        path: ["info", "license"],
        message:  "Dokumentationen för ett API SKALL (DOK.03) innehålla följande: Om API, Användarvillkor, Datamodell för representation av resurser, Krav på autentisering, Livscykelhantering och versionshantering,Kontaktuppgifter.(license saknar url)"
      }
    ],
  },
]);

testRule("Dok03LicenseName", [
  {
    
    name: "giltigt testfall",
    document: {
      servers: [{
        url:"https://pets.se/dsa/v1"
      }],
      openapi: "3.1.0",
      info: { 
        license: { name: "this name"}

       },
      
    },
    errors: [],
  },
  
  {
    name: "ogiltigt testfall",
    document: {
      openapi: "3.1.0",
      info: { 
        license: { nname:"this is name" } 
      },
    },
    errors: [
      {

        code: "Dok03LicenseName",
        path: ["info", "license"],
        message:  "Dokumentationen för ett API SKALL (DOK.03) innehålla följande: Om API, Användarvillkor, Datamodell för representation av resurser, Krav på autentisering, Livscykelhantering och versionshantering,Kontaktuppgifter.(license saknar name)"
      }
    ],
  },
]);