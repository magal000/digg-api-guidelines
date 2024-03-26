import { enumeration, truthy, falsy, undefined as undefinedFunc, pattern, schema } from "@stoplight/spectral-functions";
import { DiagnosticSeverity } from "@stoplight/types";
import { BaseRuleset, CustomProperties } from "./BaseRuleset.ts"
import { RulesetFunctionContext,IFunctionResult } from "@stoplight/spectral-core";
import { parsePropertyNames } from "./rulesetUtil.ts";

enum CasingType {
  snake = 'snake',
  camel = 'camel',
}
interface State {
  casingCamelState: boolean;
  casingSnakeState: boolean;
  propertyName: string,
  schemaKey: string,
  casingTypeName: CasingType;
}

export interface StateExecutionLog {
  [key: string]: State[];
}
export class Ame01 extends BaseRuleset {
  static customProperties: CustomProperties = {
    område: "API Message",
    id: "AME.01",
  };
  description = "Denna regel validerar att request och response är application/json.";
  message = "Datamodellen för en representation BÖR beskrivas med JSON enligt senaste versionen, RFC 8259.";
  given = "$.paths..content";
  then = {
    function: (targetVal: any, _opts: string, paths: string[]) => {
      var valid:boolean = false;

      if (targetVal.hasOwnProperty('application/json')) {
        valid = true;
      }

      if (!valid) {
        return [
          {
            message: this.message,
            severity: this.severity
          },
        ];
      } else {
        return [];
      }
    }
  }
  severity = DiagnosticSeverity.Warning;
}

export class Ame02 extends BaseRuleset {
  static customProperties: CustomProperties = {
    område: "API Message",
    id: "AME.02",
  };
  description = "Denna regel validerar att response är application/json.";
  message = "Det BÖR förutsättas att alla request headers som standard använder 'Accept' med värde 'application/json'";
  given = "$.paths.*.*..content";
  then = {
    function: (targetVal: any, _opts: string, paths: string[]) => {
      var valid:boolean = false;

      Object.getOwnPropertyNames(targetVal).forEach(function (item, index) {
        if (item.toLocaleLowerCase().includes('application/json')) {
          valid = true;
        }
      });

      if (!valid) {
        return [
          {
            message: this.message,
            severity: this.severity
          },
        ];
      } else {
        return [];
      }
    }
  }
  severity = DiagnosticSeverity.Warning;
}
export class Ame05 extends BaseRuleset {
  static customProperties: CustomProperties = {
    område: "API Message",
    id: "AME.05",
  };
  description = "Inom ett API SKALL namnsättningen vara konsekvent, dvs blanda inte camelCase och snake_case.";
  message = "Inom ett API SKALL namnsättningen vara konsekvent, dvs blanda inte camelCase och snake_case.";
  given = "$.components.schemas";
  then = 
    {
      function: (targetVal: string, _opts: string, paths) => {

          const result:any = [];
          const stateExecutionLogDictionary: StateExecutionLog = {};
          const data = JSON.parse(JSON.stringify(targetVal,null,2));  // Need to use both stringfy and parse in order to parse to JSON correctly here...hm ?
          for (const key in data ) { // Loop throough each Schema object found in given expression
            const propertyNames: string[] = parsePropertyNames(key,data); // Pick out properties of object
            propertyNames.forEach(name => {
              /**
               * RegExp for scenarios
               */
              const snakeCasePattern: RegExp = /^[a-z]+(?:_[a-z]+)*$/;
              const camelCasePattern: RegExp = /^([a-z]+)(?:([A-Z]{1})([a-z]+))+$/;
              const lowercasePattern: RegExp = /^[a-z]+$/;
  
              const stateKey = `${'casingCamelState'}:${'casingSnakeState'}:${Math.floor(Math.random() * 1000)}`;
             if (!stateExecutionLogDictionary[stateKey]) { // Init dictionary
                stateExecutionLogDictionary[stateKey] = [];
              }
              if (!lowercasePattern.test(name)) { // When lowercasepattern we cant test camel/snake pattern for sure 
                if (snakeCasePattern.test(name)) {
                  //Match for snakeCase / store info about it
                  stateExecutionLogDictionary[stateKey].push({ casingCamelState: false, 
                    casingSnakeState: true,propertyName: name,schemaKey: key,casingTypeName: CasingType.snake });
                }else if (camelCasePattern.test(name)) {
                  //Match for camelcase / store info about it
                  stateExecutionLogDictionary[stateKey].push({ casingCamelState: true, 
                    casingSnakeState: false,propertyName: name,schemaKey: key,casingTypeName: CasingType.camel });
                }
              }
            });
          }
          // Search the stateExecutionLogDictionary for items with casingCamelState or casingSnakeState set to true
          for (const stateKey in stateExecutionLogDictionary) {
            const properties = stateExecutionLogDictionary[stateKey];
            const hasCamelOrSnakeState = properties.some(property => property.casingCamelState || property.casingSnakeState);
            if (hasCamelOrSnakeState) {
              // Push items with casingCamelState or casingSnakeState set to true to the result array
                properties.forEach(property => {
                    result.push({
                        path: [...paths.path, property.schemaKey],
                        message: this.message,
                        severity: this.severity
                    });
                });
            }
          }          
          // Notify the user if both snake case and camel case patterns are present or [] if ok
            return result;
      }
    }  
    severity = DiagnosticSeverity.Warning;
}
export default { Ame01, Ame02,Ame05 };
