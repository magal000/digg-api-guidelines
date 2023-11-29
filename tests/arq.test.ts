import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "./util/helperTest.ts";

testRule("Arq05_1", [
    {
      name: "giltigt testfall",
      document: {
        openapi: "3.1.0",
        info: { version: "1.0" },
        paths: {
          "/foo": {
            post: {
              parameters: [
                {
                  name: "Payload_simple",
                  in: "header",
                  description: "Simple payload in header is ok",
                  required: true,
                  schema: {
                    type: "string"
                  }
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
          "/foo": {
            post: {
              parameters: [
                {
                  name: "Payload_complex",
                  in: "header",
                  description: "Complex payload in header is discouraged",
                  required: true,
                  schema: {
                    type: "object"
                  }
                },
              ],
            },
          },
        },
      },
      errors: [
        {
          message:
            "Payload data SKALL INTE användas i HTTP-headers.",
          path: ["paths", "/foo", "post", "parameters", "0","schema","type"],
          severity: DiagnosticSeverity.Warning,
        },
      ],
    },
  ]);
  testRule("Arq05_2", [
    {
      name: "giltigt testfall",
      document: {
        openapi: "3.1.0",
        info: { version: "1.0" },
        paths: {
          "/foo": {
            post: {
              parameters: [
                {
                  name: "Payload_simple",
                  in: "header",
                  description: "Simple payload in header is OK",
                  required: true,
                  schema: {
                    type: "string"
                  }
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
          "/foo": {
            post: {
              parameters: [
                {
                  name: "Payload_complex",
                  in: "header",
                  description: "If a header is expected to contain data with unusual MIME types, it may indicate an unconventional use of headers",
                  required: true,
                  schema: {
                    type: "string",
                    format: "binary"
                  }
                },
              ],
            },
          },
        },
      },
      errors: [
        {
          message:
            "Payload data SKALL INTE användas i HTTP-headers.",
          path: ["paths", "/foo", "post", "parameters", "0","schema","format"],
          severity: DiagnosticSeverity.Warning,
        },
      ],
    },
  ]);
  testRule("Arq05_3", [
    {
      name: "giltigt testfall",
      document: {
        openapi: "3.1.0",
        info: { version: "1.0" },
        paths: {
          "/foo": {
            post: {
              parameters: [
                {
                  name: "Payload_simple",
                  in: "header",
                  description: "Simple payload in header is OK",
                  required: true,
                  schema: {
                    type: "string"
                  }
                },
                {
                  name: "Payload_simple2",
                  in: "header",
                  description: "Simple payload in header is OK",
                  required: true,
                  schema: {
                    type: "string"
                  }
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
          "/foo": {
            post: {
              parameters: [
                {
                  name: "Payload_complex",
                  in: "header",
                  description: "If a header uses nested structures, a requestbody is more appropriate.",
                  required: true,
                  schema: {
                    type: "object",
                    properties: {
                       nestedfield: "nested",
                       type: "string"
                    }
                  }
                },
              ],
            },
          },
        },
      },
      errors: [
        {
          message:
            "Payload data SKALL INTE användas i HTTP-headers.",
          path: ["paths", "/foo", "post", "parameters", "0","schema","properties"],
          severity: DiagnosticSeverity.Warning,
        },
      ],
    },
  ]);
