import { RulesetInterface } from "../ruleinterface/RuleInterface.ts"
import { enumeration, truthy, falsy, undefined as undefinedFunc, pattern, schema, defined } from "@stoplight/spectral-functions";
import { DiagnosticSeverity } from "@stoplight/types";

/**
 * @property description 
 * @property message
 * @property given
 * @property then
 */
export class Arq05_1 implements RulesetInterface {
  description = "Om en header förväntas innehålla komplexa datastrukturer, såsom JSON eller XML, kan det indikera en okonventionell användning av headers";
  message = "Payload data SKALL INTE användas i HTTP-headers.";
  given = "$.paths.*.*.parameters[?(@.in=='header' && @.schema)].schema.type";
  then = {
    field: "type",
    function: pattern,
    functionOptions: {
      notMatch: "^object$",  // Avråda från användning av komplex struktur i headers
    }
  }
  severity = DiagnosticSeverity.Warning;
}
export class Arq05_2 implements RulesetInterface {
  description = "Om en header förväntas innehålla data med ovanliga MIME-typer kan det indikera en okonventionell användning av headers";
  message = "Payload data SKALL INTE användas i HTTP-headers.";
  given = "$.paths.*.*.parameters[?(@.in=='header' && @.schema && @.schema.type=='string')].schema.format";
  then = {
    field: "format",
    function: pattern,
    functionOptions: {
      notMatch: "^binary$",  // Discourage use of complex structure in headers
    }
  }
  severity = DiagnosticSeverity.Warning;
}
export class Arq05_3 implements RulesetInterface {
  description = "Om en header använder nästlade strukturer, är en requestbody mer lämplig.";
  message = "Payload data SKALL INTE användas i HTTP-headers.";
  given = "$.paths.*.*.parameters[?(@.in=='header' && @.schema && @.schema.type=='object')].schema.properties";
  then = {
    field: "properties",
    function: truthy,
  }
  severity = DiagnosticSeverity.Warning;
}
export class Arq05Base {
  given = "$.paths.*.*.parameters[?(@.in=='header' && @.schema)]";
  message = "Payload data SKALL INTE användas i HTTP-headers.";
  severity = DiagnosticSeverity.Warning;
}

export class Arq05NestedStructure extends Arq05Base {
  description = "Om en header använder nästlade strukturer, är en requestbody mer lämplig.";
  then = {
    function: (targetVal, _opts, paths) => {
      const schema = targetVal.schema;

      if (schema && typeof schema === 'object' && schema.type === 'object' && schema.properties) {
        return [
          {
            message: this.message,
            severity: this.severity,
          },
        ];
      }
      return [];
    },
  };
}

export class Arq05StringBinary extends Arq05Base {
  description = "Om en header förväntas innehålla data med ovanliga MIME-typer kan det indikera en okonventionell användning av headers";
  then = {
    function: (targetVal, _opts, paths) => {
      const schema = targetVal.schema;

      if (schema && typeof schema === 'object' && schema.type === 'string' && schema.format === 'binary') {
        return [
          {
            message: this.message,
            severity: this.severity,
          },
        ];
      }

      return [];
    },
  };
}
export class Arq05ComplexStructure extends Arq05Base {
  description = "Om en header förväntas innehålla komplexa datastrukturer, såsom JSON eller XML, kan det indikera en okonventionell användning av headers";
  then = {
    function: (targetVal, _opts, paths) => {
      const schema = targetVal.schema;

      if (schema && typeof schema === 'object' && schema.type === 'object') {
        return [
          {
            message: this.message,
            severity: this.severity,
          },
        ];
      }

      return [];
    },
  };
}

export default { Arq05NestedStructure, Arq05StringBinary,Arq05ComplexStructure };

