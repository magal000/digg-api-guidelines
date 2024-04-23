import { enumeration, truthy, falsy, undefined as undefinedFunc, pattern, schema } from "@stoplight/spectral-functions";
import { DiagnosticSeverity } from "@stoplight/types";
import { CustomProperties } from '../ruleinterface/CustomProperties.ts';
import { BaseRuleset} from "./BaseRuleset.ts";
const moduleName: string = "UfnRules.ts";


export class Ufn09Base extends BaseRuleset {
  static customProperties: CustomProperties = {
    område: "URL Format och namngivning",
    id: "UFN.09",
  };
  constructor() {
    super();
    this.message = "Blanksteg ' ' och understreck '_' SKALL INTE användas i URL:er med undantag av parameter-delen.";
    this.severity = DiagnosticSeverity.Error;
    this.description = "Blanksteg ' ' och understreck '_' SKALL INTE användas i URL:er med undantag av parameter-delen.";
    this.then = [
      {
        function: pattern,
        functionOptions: {
          notMatch: "/[\\s_]/",
        }
      },
      {
        function: (targetVal: string, _opts: string, paths: string[]) => {
          console.log(targetVal)
          this.trackRuleExecutionHandler(JSON.stringify(targetVal, null, 2), _opts, paths,
            this.severity, this.constructor.name, moduleName, Ufn09Base.customProperties);
        }
      }
    ];
    }
}
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
  export function parsePropertyNames(key:string, data: any):string[] {
    const result: string[] = [];
    try {
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
    }catch(error ) {
      console.error("Error parsing JSON:", error);
    }
    return result;
  }
  
  export default { Arq05Base, Ufn09Base};