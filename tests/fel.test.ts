import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "./util/helperTest.ts";
import { Fel01 } from "../rulesets/FelRules.ts";

testRule("Fel01", [
    {
      name: "giltigt testfall",
      document: {
        openapi: "3.1.0",
        info: { version: "1.0" },
        paths: {
          "/": {
            get: {
              responses: {
                "501": {
                  description: "",
                  content: {
                    "application/problem+json": {
                      schema: {
                        type: "object",
                        required: ["type", "title", "status", "detail", "instance"]
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
      name: "giltigt testfall - XML",
      document: {
        openapi: "3.1.0",
        info: { version: "1.0" },
        paths: {
          "/": {
            get: {
              responses: {
                "501": {
                  description: "",
                  content: {
                    "application/problem+xml": {
                      schema: {
                        type: "object",
                        required: ["type", "title", "status", "detail", "instance"]
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
      name: "ogiltigt testfall - XML",
      document: {
        openapi: "3.1.0",
        info: { version: "1.0" },
        paths: {
          "/": {
            get: {
              responses: {
                "501": {
                  description: "",
                  content: {
                    "application/problem+xml": {
                      schema: {
                        type: "object",
                        required: ["type", "title", "status", "detail"]
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
          message: Fel01.ruleMessage,
          severity: DiagnosticSeverity.Error
        },
      ],
    },
    {
      name: "ogiltigt testfall",
      document: {
        openapi: "3.1.0",
        info: { version: "1.0" },
        paths: {
          "/": {
            get: {
              responses: {
                "501": {
                  description: "",
                  content: {
                    "application/problem+json": {
                      schema: {
                        type: "object",
                        required: ["status", "detail", "instance"]
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
          message: Fel01.ruleMessage,
          severity: DiagnosticSeverity.Error
        },
      ],
    }  
    ]);