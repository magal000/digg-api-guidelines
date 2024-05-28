import { Arq05Base } from "./rulesetUtil.ts";
import { schema} from "@stoplight/spectral-functions";
import { DiagnosticSeverity } from "@stoplight/types";
import { oas3 } from "@stoplight/spectral-formats";
import { CustomProperties } from '../ruleinterface/CustomProperties.ts';
import { BaseRuleset} from "./BaseRuleset.ts";
const moduleName: string = "ArqRules.ts";


export class Arq05NestedStructure extends Arq05Base {
  description ="Om en header använder nästlade strukturer, är en requestbody mer lämplig.";
  message ="[" + super.messageValue  + "] " + this.description;
  then = [{
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
  },
  {
    function: (targetVal: string, _opts: string, paths: string[]) => {
      return this.trackRuleExecutionHandler(JSON.stringify(targetVal,null,2), _opts, paths,
      this.severity,this.constructor.name, moduleName,Arq05NestedStructure.customProperties);
    }
  }
];
}
export class Arq05StringBinary extends Arq05Base {
  description ="Om en header förväntas innehålla data med ovanliga MIME-typer kan det indikera en okonventionell användning av headers.";
  message ="[" + super.messageValue  + "] " + this.description;
  then = [{
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
  },
  {
    function: (targetVal: string, _opts: string, paths: string[]) => {
      return this.trackRuleExecutionHandler(JSON.stringify(targetVal,null,2), _opts, paths,
      this.severity,this.constructor.name, moduleName,Arq05StringBinary.customProperties);
    }
  }
];
}
export class Arq05ComplexStructure extends Arq05Base {
  description ="Om en header förväntas innehålla komplexa datastrukturer, såsom JSON eller XML, kan det indikera en okonventionell användning av headers.";
  message ="[" + super.messageValue  + "] " + this.description;
    then = [{
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
    },
    {
      function: (targetVal: string, _opts: string, paths: string[]) => {
        return this.trackRuleExecutionHandler(JSON.stringify(targetVal,null,2), _opts, paths,
        this.severity,this.constructor.name, moduleName,Arq05ComplexStructure.customProperties);
      }
    }
  ];
}
export class Arq01 extends BaseRuleset {
  static customProperties: CustomProperties = {
    område: "API Request",
    id: "ARQ.01",
  };
  description = "Ett API request BÖR skickas i UTF-8 format";
  message = "Ett API request BÖR skickas i UTF-8 format";
  given = "$.paths[*][*].requestBody.content";
  then = [{
    function: schema,
    functionOptions: {
      schema: {
        type: "object",
        properties: {
          "application/json": true,
        },
        required: ["application/json"],
      },
    },
  },
  {
      function: (targetVal: string, _opts: string, paths: string[]) => {
        return this.trackRuleExecutionHandler(JSON.stringify(targetVal,null,2), _opts, paths,
        this.severity,this.constructor.name, moduleName,Arq01.customProperties);
      }
  }
];
  formats = [oas3];
  severity = DiagnosticSeverity.Warning;
}
export class Arq03 extends BaseRuleset {
  static customProperties: CustomProperties = {
    område: "API Request",
    id: "ARQ.03",
  };
  description = "Alla API:er BÖR supportera följande request headers: Accept, Accept-Charset, Date, Cache-Control, ETag, Connection och Cookie.";
  message = this.description;
  given = "$.paths.*.*";
  then = [{
    function: (targetVal: object, _opts: string, paths: string[]) => {

      let isValid = true;
      if (targetVal['parameters'] !== undefined) {
        targetVal['parameters'].forEach(element => {
          if (element['in'] == 'header') {
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
    },
  },
  {
    function: (targetVal: string, _opts: string, paths: string[]) => {
      return this.trackRuleExecutionHandler(JSON.stringify(targetVal,null,2), _opts, paths,
      this.severity,this.constructor.name, moduleName,Arq03.customProperties);
    }
  }
];
  severity = DiagnosticSeverity.Warning;
}
export default { Arq05ComplexStructure, Arq05StringBinary, Arq05NestedStructure, Arq03, Arq01 };