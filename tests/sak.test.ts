import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "./util/helperTest.ts";

testRule("Sak09", [
    {
      name: "giltigt testfall",
      document: {
        openapi: "3.1.0",
        info: { version: "1.0" },
        components: {
          securitySchemes: {
            "något-annat": {
              type: "http",
              scheme: "bearer",
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
          securitySchemes: {
            "basicAuth": {
              type: "http",
              scheme: "basic",
            },
          },
        },
      },
      errors: [
        {
          message: "Basic- eller Digest-autentisering SKALL INTE användas.",
          path: ["components", "securitySchemes", "basicAuth", "scheme"],
          severity: DiagnosticSeverity.Error,
        },
      ],
    },
  ]);

