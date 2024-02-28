import { enumeration, truthy, falsy, undefined as undefinedFunc, pattern, schema } from "@stoplight/spectral-functions";
import { DiagnosticSeverity } from "@stoplight/types";
import { BaseRuleset,CustomProperties } from "./BaseRuleset.ts"
import { stringify } from "querystring";

export class Arq05Base extends BaseRuleset {
    static customProperties: CustomProperties = {
      område: "API Request",
      id: "ARQ.05",
    };
    constructor() {
      super();
      this.given = "$.paths.*.*.parameters[?(@.in=='header' && @.schema)]";
      this.message = "Payload data SKALL INTE användas i HTTP-headers.";
      this.severity = DiagnosticSeverity.Warning;
      this.description = '';
      }
    protected get messageValue(): string {
      return this.message;
    }  
    protected checkSchema(targetVal: any, expectedType: string, expectedFormat?: string) {
      const schema = targetVal.schema;
      if (schema && typeof schema === 'object' && schema.type === expectedType) {
        if (!expectedFormat || schema.format === expectedFormat) {
          return true;
        }
      }
      return false;    
    }
  }
  export class UfnUrlBase extends BaseRuleset {

    constructor() {
      super();
      this.given = "$.";
    }
    protected getBaseUrlAndPath (targetVal:any):any[] {
      const urlArray: any[]  = [];
      for (let path in targetVal.paths){
        for(let baseUrl of targetVal.servers){
          
          urlArray.push({
            "baseUrl":baseUrl.url.slice(baseUrl.url.indexOf(":")+1)+path,
            "protocol":baseUrl.url.slice(0, baseUrl.url.indexOf(":"))
          });
        }
      }
      return urlArray;
    }
    
  }
  export default { Arq05Base, UfnUrlBase};