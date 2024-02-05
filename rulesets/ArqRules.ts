import { RulesetInterface } from "../ruleinterface/RuleInterface.ts"
import { Arq05Base } from "./rulesetUtil.ts"
import { enumeration, truthy, falsy, undefined as undefinedFunc, pattern, schema, defined } from "@stoplight/spectral-functions";
import { DiagnosticSeverity } from "@stoplight/types";
import { BaseRuleset, CustomProperties } from "./BaseRuleset.ts"

export class Arq05NestedStructure extends Arq05Base {
  description ="Om en header använder nästlade strukturer, är en requestbody mer lämplig.";
  message ="[" + super.messageValue  + "] " + this.description;
  then = {
    function: (targetVal, _opts, paths) => {
      if (this.checkSchema(targetVal, 'object') && targetVal.schema.properties) {
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
  description ="Om en header förväntas innehålla data med ovanliga MIME-typer kan det indikera en okonventionell användning av headers.";
  message ="[" + super.messageValue  + "] " + this.description;
  then = {
    function: (targetVal, _opts, paths) => {

      if (this.checkSchema(targetVal, 'string', 'binary')) {
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
  description ="Om en header förväntas innehålla komplexa datastrukturer, såsom JSON eller XML, kan det indikera en okonventionell användning av headers.";
  message ="[" + super.messageValue  + "] " + this.description;
  then = {
    function: (targetVal, _opts, paths) => {
      if (this.checkSchema(targetVal, 'object')) {
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

export class Arq03 extends BaseRuleset {
  static customProperties: CustomProperties = {
    område: "API Request",
    id: "ARQ.03",
  };
  description = "Alla API:er BÖR supportera följande request headers: Accept, Accept-Charset, Date, Cache-Control, ETag, Connection och Cookie.";
  message = this.description;
  given = "$.paths.*.*";
  then = {
    function: (targetVal: object, _opts: string, paths: string[]) => {

      let isValid = true;

      if (targetVal['parameters'] !== undefined) {
        targetVal['parameters'].forEach(element => {

          if (element['in'] == 'header') {
            if (element['name'] == 'Accept-Charset' && element['schema']['format'] !== 'charset') {
              isValid = false;
            }
            if (element['name'] == 'Date' && element['schema']['format'] !== 'date-time') {
              isValid = false;
            }
            if (element['name'] == 'Cache-Control' && element['schema']['enum'].length  == 0) {
              isValid = false;
            }
            if (element['name'] == 'ETag' && element['schema']['format'] !== 'etag') {
              isValid = false;
            }
            if (element['name'] == 'Connection' && !element['schema']['enum'].includes('keep-alive')) {
              isValid = false;
            }
          }
          if (element['in'] === 'cookie' && element['schema']['type'] == undefined) {
            isValid = false;
          }
        });
      }

      if (!isValid) {
        return [
          {
            message: this.message,
            severity: this.severity,
          },
        ];
      } else {
        return []; 
      }
    }
  }
  severity = DiagnosticSeverity.Warning;
}
export default { Arq05ComplexStructure, Arq05StringBinary, Arq05NestedStructure, Arq03 };
