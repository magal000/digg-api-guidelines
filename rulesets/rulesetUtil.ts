import { enumeration, truthy, falsy, undefined as undefinedFunc, pattern, schema } from "@stoplight/spectral-functions";
import { DiagnosticSeverity } from "@stoplight/types";
import { CustomProperties } from '../ruleinterface/CustomProperties.ts';
import { BaseRuleset} from "./BaseRuleset.ts";
import path from "path";
const moduleName: string = "UfnRules.ts";

export class Ufn05Base extends BaseRuleset {
  static customProperties: CustomProperties = {
    område: "URL Format och namngivning",
    id: "UFN.05",
  };
  constructor() {
    super();
    this.message = "En URL BÖR INTE vara längre än 2048 tecken.";
    this.severity = DiagnosticSeverity.Warning;
    this.description = "En URL BÖR INTE vara längre än 2048 tecken.";
    }
  static baseurls:any = [];
  static paths:any = [];

}

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
      this.message = "Payload data SKALL INTE användas i HTTP-headers";
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
// Define a type for the property objects
export interface Property {
  name: any;
  type: any;
  format?: any;
  example?: any;
}

// Update the return type of the parsePropertyNames function
export function parseProperties(key: string, data: any): Property[] {
  const result: Property[] = [];
  try {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
          const obj = data[key];
          const properties = obj.properties;
          // Iterate over properties of each object
          for (const propName in properties) {
              if (Object.prototype.hasOwnProperty.call(properties, propName)) {
                  const property: any = properties[propName];
                  const propType: any = property.type; // Ensure propType is of type string
                  const propFormat: any | undefined = property.format; // Ensure propFormat is of type string or undefined
                  const propExample: any | undefined = property.example; // Ensure propExample is of type string or undefined
                  result.push({ name: propName, type: propType, format: propFormat, example: propExample });
              }
          }
      }
  } catch (error) {
      console.error("Error parsing JSON:", error);
  }
  return result;
}
export function isValidRFC3339DateTime(dateTimeString) {
// Use a regular expression to match the RFC 3339 date and time format
const rfc3339Regex = /^(\d{4})-(0[1-9]|1[0-2])-([0-2][0-9]|3[0-1])T([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])(\.\d{1,6})?(Z|([+-])([0-1][0-9]|2[0-3]):([0-5][0-9]))?$/;

// Check if the input string matches the RFC 3339 format
if (!rfc3339Regex.test(dateTimeString)) {
  return false; // Format doesn't match, return false
}

// Extract date and time components from the string
const [, year, month, day, hour, minute, second, fractionalSeconds] = dateTimeString.match(rfc3339Regex);

// Convert components to integers
const yearInt = parseInt(year, 10);
const monthInt = parseInt(month, 10);
const dayInt = parseInt(day, 10);
const hourInt = parseInt(hour, 10);
const minuteInt = parseInt(minute, 10);
const secondInt = parseInt(second, 10);

// Check if date and time components are within valid ranges
if (
  isNaN(yearInt) ||
  isNaN(monthInt) ||
  isNaN(dayInt) ||
  isNaN(hourInt) ||
  isNaN(minuteInt) ||
  isNaN(secondInt) ||
  yearInt < 0 ||
  monthInt < 1 || monthInt > 12 ||
  dayInt < 1 || dayInt > 31 ||
  hourInt < 0 || hourInt > 23 ||
  minuteInt < 0 || minuteInt > 59 ||
  secondInt < 0 || secondInt > 59
) {
  return false; // Invalid date or time components, return false
}
// If all checks pass, the date and time is considered valid
return true;
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