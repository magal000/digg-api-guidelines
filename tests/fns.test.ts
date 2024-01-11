import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "./util/helperTest.ts";

testRule("Fns01", [
  {
    name: "giltigt testfall",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      paths: {
        "/foo": {
          get: {
            description: "Gilitigt testfall av camelCase",
            parameters: [
              {
                name: "veryLongName",
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
        "/foo": {
          get: {
            description: "Ogiltigt testfall av CamelCase",
            parameters: [
              {
                name: "VeryLongName",
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
          "Parameternamn SKALL anges med en konsekvent namnkonvention exempelvis antingen snake_case eller camelCase",
        path: ["paths", "/foo", "get", "parameters", "0","name"],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },
  {
    name: "giltigt testfall",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      paths: {
        "/foo": {
          get: {
            description: "Gilitigt testfall av snake case",
            parameters: [
              {
                name: "very_long_name",
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
        "/foo": {
          get: {
            description: "Ogiltigt testfall av snake case",
            parameters: [
              {
                name: "very_longName",
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
          "Parameternamn SKALL anges med en konsekvent namnkonvention exempelvis antingen snake_case eller camelCase",
        path: ["paths", "/foo", "get", "parameters", "0","name"],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },  
]);

testRule("Fns03", [
  {
    name: "giltigt testfall",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      paths: {
        "/charactercheck": {
          get: {
            description: "Sökparametrar SKALL starta med en bokstav.",
            parameters: [
              {
                name: "veryLongName",
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
        "/charactercheck": {
          get: {
            description: "Sökparametrar SKALL starta med en bokstav.",
            parameters: [
              {
                name: "_VeryLongName",
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
          "Sökparametrar SKALL starta med en bokstav.",
        path: ["paths", "/charactercheck", "get", "parameters", "0","name"],
        severity: DiagnosticSeverity.Error,
      },
    ],
  }
]);

testRule("Fns09", [
  {
    name: "giltigt testfall",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      paths: {
        "/limitcheck": {
          get: {
            description: "Defaultvärde för limit BÖR vara 20",
            parameters: [
              {
                name: 20,
                in: "query",
                required: false,
              }
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
        "/limitcheck": {
          get: {
            description: "Defaultvärde för limit BÖR vara 20",
            parameters: [
              {
                name: 30,
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
          "Defaultvärde för limit BÖR vara 20",
        path: ["paths", "/limitcheck", "get", "parameters","0","name"],
        severity: DiagnosticSeverity.Warning,
      },
    ],
  }
]);
