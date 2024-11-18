import {falsy, truthy, undefined as undefinedFunc } from "@stoplight/spectral-functions";
import { DiagnosticSeverity } from "@stoplight/types";
import { CustomProperties } from '../ruleinterface/CustomProperties.ts';
import { BaseRuleset} from "./BaseRuleset.ts";
import { schema} from "@stoplight/spectral-functions";
import { CLIENT_RENEG_LIMIT } from "tls";
import { schema} from "@stoplight/spectral-functions";

const moduleName: string = "FelRules.ts";

/**
 * Module contains classes with functions that are needed for category felhantering
 */
export class Fel01 extends BaseRuleset {
  static mandatoryProperties = ['type', 'title', 'status', 'detail', 'instance'];
  static ruleMessage =  `Om HTTP svarskoderna inte räcker SKALL (FEL.01) API:et beskriva feldetaljer enligt RFC 9457 med dessa ingående attribut; ${Fel01.mandatoryProperties.join(', ')}.`;

  static customProperties: CustomProperties = {
  område: "Felhantering",
  id: "FEL.01",
  };
  description = "";
  message = Fel01.ruleMessage;
  given = [
    "$.paths.*.*.responses.*.content['application/problem+json'].schema",
    "$.paths.*.*.responses.*.content['application/problem+xml'].schema"
  ];
  then = [
    {
      function: (targetVal: unknown, _opts: unknown, paths: string[]) => {
        if(!isOpenApiObject(targetVal)) {
          return [{message: 'Schema must be object'}];
        }

        return Fel01.mandatoryProperties
          .filter(mandatory => {
            return !targetVal.properties?.[mandatory];
          })
          .map(missing => ({
            message: `Missing required field: ${missing}`
          }));
      }
    },
    {
      function: (targetVal: string, _opts: string, paths: string[]) => {
        this.trackRuleExecutionHandler(JSON.stringify(targetVal,null,2), _opts, paths,
        this.severity,this.constructor.name, moduleName,Fel01.customProperties);
      }
    }
  ]
  severity = DiagnosticSeverity.Error

  constructor() {
    super();
    super.initializeFormats(['OAS3']);
  } 
}

export class Fel02 extends BaseRuleset {
  static customProperties: CustomProperties = {
  område: "Felhantering",
  id: "FEL.02",
  };
  description = "Returnerad typ vid fel skall vara av typen application/problem+json";
  message = "Returnerad typ vid fel skall vara av typen application/problem+json";
  given = "$.paths[*][*].responses[?(@property >= 300 || @property < 200)].content";
  then = [
    {
      field: "application/problem+json",
      function: truthy,
    },
    {
      function: (targetVal: string, _opts: string, paths: string[]) => {
        this.trackRuleExecutionHandler(JSON.stringify(targetVal,null,2), _opts, paths,
        this.severity,this.constructor.name, moduleName,Fel02.customProperties);
      }
    }
  ]
  severity = DiagnosticSeverity.Warning

  constructor() {
    super();
    super.initializeFormats(['OAS3']);
  }
}
export default {Fel01, Fel02};


type OpenApiObject = {
  type: 'object',
  properties?: Record<string, unknown>,
  required?: string[]
}

const isOpenApiObject = (x: unknown): x is OpenApiObject => {
  return (x as OpenApiObject)?.type === 'object'
}