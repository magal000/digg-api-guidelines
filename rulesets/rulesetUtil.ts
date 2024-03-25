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
  export function parsePropertyNames(input: string):string[] {
    const result: string[] = [];
    console.log("About to parse...");
    const data = JSON.parse(JSON.stringify(input,null,2));  
    console.log("After parse data: " + data);
    try {
        // Iterate over each top-level property
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            const obj = data[key];
            const properties = obj.properties;

            // Iterate over properties of each object
            for (const prop in properties) {
              if (Object.prototype.hasOwnProperty.call(properties, prop)) {
                result.push(prop);
              }
            }
          }
        }
        console.log("Result is: "+ result);
    }catch(error ) {
      console.error("Error parsing JSON:", error);
    }
    return result;
  }

  export default { Arq05Base};