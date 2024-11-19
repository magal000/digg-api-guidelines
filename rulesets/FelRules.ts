import {falsy, undefined as undefinedFunc } from "@stoplight/spectral-functions";
import { DiagnosticSeverity } from "@stoplight/types";
import { CustomProperties } from '../ruleinterface/CustomProperties.ts';
import { BaseRuleset} from "./BaseRuleset.ts";
import { schema} from "@stoplight/spectral-functions";

const moduleName: string = "FelRules.ts";

/**
 * Module contains classes with functions that are needed for category felhantering
 */
export class Fel01 extends BaseRuleset {
  static mandatoryFields = ['type', 'title', 'status', 'detail', 'instance'];
  static ruleMessage =  `Om HTTP svarskoderna inte räcker SKALL (FEL.01) API:et beskriva feldetaljer enligt RFC 9457 med dessa ingående attribut; ${Fel01.mandatoryFields.join(', ')}.`;
  
  static customProperties: CustomProperties = {
  område: "Felhantering",
  id: "FEL.01",
  };
  description = "";
  message = Fel01.ruleMessage;
  given = [
    "$.paths.*.*.responses.*.content['application/json+error'].schema",
    "$.paths.*.*.responses.*.content['application/xml+error'].schema"
  ];
  then = [
    {
      function: (targetVal: unknown, _opts: unknown, paths: string[]) => {
        if(!isOpenApiObject(targetVal)) {
          return [{message: 'Schema must be object'}];
        }
        
        return Fel01.mandatoryFields
          .filter(mandatory => {
            return !targetVal.required.find(required => required === mandatory);
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
export default {Fel01};


type OpenApiObject = {
  type: 'object',
  properties: Record<string, unknown>,
  required: string[]
}

const isOpenApiObject = (x: unknown): x is OpenApiObject => {
  return (x as OpenApiObject)?.type === 'object' && Array.isArray((x as OpenApiObject)?.required)
}