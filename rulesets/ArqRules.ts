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

export class Arq01 extends BaseRuleset {
  static customProperties: CustomProperties = {
    område: "API Request",
    id: "ARQ.01",
  };
  description = "Ett API request BÖR skickas i UTF-8 format";
  message = "Ett API request BÖR skickas i UTF-8 format";
  given = "$.paths.[*].requestBody.content";
  then = {
    function:(targetVal) =>{
      if(targetVal.hasOwnProperty('application/json;charset=utf-8')){
        return [];
      }else{
        return [
          {
            message: this.message,
            severity: this.severity
          },
        ];
      }
    }
  }
  severity = DiagnosticSeverity.Warning;
}

export default { Arq05NestedStructure, Arq05StringBinary, Arq05ComplexStructure,Arq01 };
