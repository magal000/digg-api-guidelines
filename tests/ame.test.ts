import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "./util/helperTest.ts";

testRule("Ame01", [
  {
    name: "giltigt testfall - JSON format",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      paths: {
        "/foo": {
          post: {
            responses: {
              '200': {
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        foo: {
                          type: 'string'
                        }
                      }
                    }
                  }
                }

              }
            }
          },
        },
      },
    },
    errors: [],
  },
  {
    name: "ogiltigt testfall - ej JSON format",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      paths: {
        "/foo": {
          post: {
            responses: {
              '200': {
                content: {
                  'application/octet-stream': {
                    schema: {
                      type: 'object',
                      properties: {
                        foo: {
                          type: 'string'
                        }
                      }
                    }
                  }
                }
              }
            }
          },
        },
      },
    },
    errors: [
      {
        message:
          "Datamodellen för en representation BÖR beskrivas med JSON enligt senaste versionen, RFC 8259.",
        path: ["paths", "/foo", "post", "responses", "200", "content"],
        severity: DiagnosticSeverity.Warning,
      },
    ],
  },
]);

testRule("Ame02", [
  {
    name: "giltigt testfall - JSON format",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      paths: {
        "/foo": {
          post: {
            responses: {
              '200': {
                content: {
                  'application/json; charset=utf-8': {
                    schema: {
                      type: 'object',
                      properties: {
                        foo: {
                          type: 'string'
                        }
                      }
                    }
                  }
                }

              }
            }
          },
        },
      },
    },
    errors: [],
  },
  {
    name: "ogiltigt testfall - ej JSON format",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      paths: {
        "/foo": {
          post: {
            responses: {
              '200': {
                content: {
                  'application/octet-stream': {
                    schema: {
                      type: 'object',
                      properties: {
                        foo: {
                          type: 'string'
                        }
                      }
                    }
                  }
                }
              }
            }
          },
        },
      },
    },
    errors: [
      {
        message: "Det BÖR förutsättas att alla request headers som standard använder 'Accept' med värde 'application/json'",
        path: ["paths", "/foo", "post", "responses", "200", "content"],
        severity: DiagnosticSeverity.Warning,
      },
    ],
  },
]);
testRule("Ame07", [
  {
    name: "giltigt testfall",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      components: {
        schemas: {
          Error: {
            type: "object",
            properties: {
              code: {
                type: "integer",
                format: "int32",
              },
              message: {
                type: "string",
              },
            },
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
      components: {
        schemas: {
          Error: {
            type: "object",
            properties: {
              "co-de": {
                type: "integer",
                format: "int32",
              },
              "message": {
                type: "string",
              },
            },
          },
        },
      },
    },
    errors: [
      {
        message: "Fältnamn BÖR använda tecken som är alfanumeriska.",
        path: ["components", "schemas", "Error", "properties","co-de"],
        severity: DiagnosticSeverity.Warning,
      },
    ],
  },
  {
    name: "ogiltigt testfall",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      components: {
        schemas: {
          Error: {
            type: "object",
            properties: {
              "code": {
                type: "integer",
                format: "int32",
              },
              "mes%sage": {
                type: "string",
              },
            },
          },
        },
      },
    },
    errors: [
      {
        message: "Fältnamn BÖR använda tecken som är alfanumeriska.",
        path: ["components", "schemas", "Error", "properties","mes%sage"],
        severity: DiagnosticSeverity.Warning,
      },
    ],
  },
  {
    name: "ogiltigt testfall",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      components: {
        schemas: {
          Error: {
            type: "object",
            properties: {
              "code": {
                type: "integer",
                format: "int32",
              },
              "_message": {
                type: "string",
              },
            },
          },
        },
      },
    },
    errors: [
      {
        message: "Fältnamn BÖR använda tecken som är alfanumeriska.",
        path: ["components", "schemas", "Error", "properties","_message"],
        severity: DiagnosticSeverity.Warning,
      },
    ],
  },
]);