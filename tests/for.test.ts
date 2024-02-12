import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "./util/helperTest.ts";

testRule("For01", [
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
          message: "Swagger 2-filer är inte tillåtna. Använd OpenAPI >= 3.0",
          path: ["swagger"],
          severity: DiagnosticSeverity.Error,
        },
      ],
    },
  ]);
