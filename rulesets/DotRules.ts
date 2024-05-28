import { DiagnosticSeverity } from "@stoplight/types";
import { CustomProperties } from '../ruleinterface/CustomProperties.ts';
import { BaseRuleset} from "./BaseRuleset.ts"
import { parseProperties,Property,isValidRFC3339DateTime } from "./rulesetUtil.ts";
import { oas3 } from "@stoplight/spectral-formats";

const moduleName: string = "DotRules.ts";

interface DotState {
    schemaKey: string,
    propertyName: string,
    propertyType:string,
    propertyFormat:string,
    propertyExample: string,
    propertyValidFormatDate: boolean,
    propertyValidFormatDateTime: boolean
}   
interface DotStateExecutionLog {
    [key: string]: DotState[];
}
export class Dot02 extends BaseRuleset {
    static customProperties: CustomProperties = {
        område: "Datum- och tidsformat",
        id: "DOT.02",
      };
      description = "Ett giltigt exempel enligt DOT.02 behöver anges som ett exempel";
      message = "Datum och tid SKALL anges enligt RFC 3339 som bygger på ISO-8601.";
      given = "$.components.schemas";
      then = {
        function: (targetVal: any, _opts: string, paths) => {
  
            const result:any = [];
            let isTrackRuleExecution = false;
            const dotStateExecutionLogDictionary: DotStateExecutionLog = {};
            //const data = JSON.parse(JSON.stringify(targetVal,null,2));  // Need to use both stringfy and parse in order to parse to JSON correctly here...hm ?
            const data = targetVal;
            for (const key in data ) { // Loop throough each Schema object found in given expression
              const propertys: Property[] = parseProperties(key,data); // Pick out properties of object
              propertys.forEach(prop => {
                const stateKey = `${key}:${prop.name}:${Math.floor(Math.random() * 1000)}`; // Unique key
                if (!dotStateExecutionLogDictionary[stateKey]) { 
                  dotStateExecutionLogDictionary[stateKey] = [];  // Init dictionary
                }
                //Stuff goes here
                  if (prop.format === 'date' || prop.format === 'date-time') {
                    let isValid = false;
                    isTrackRuleExecution = true; // Should be tracked for diagnostic
                    if (prop.format === 'date' && prop.example !== undefined) {
                        const pattern = /^([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/; // Correct date pattern according to RFC3339
                        isValid = prop.example && pattern.test(prop.example);
                    } else if (prop.format === 'date-time' && prop.example !== undefined) {
                        isValid = prop.example && isValidRFC3339DateTime(prop.example);
                    }
                    if (!isValid) {
                        const isDate = prop.format === 'date'; // State one of the fields date / date-time
                        dotStateExecutionLogDictionary[stateKey].push({
                            schemaKey: key,
                            propertyName: prop.name,
                            propertyType: prop.type,
                            propertyFormat: prop.format,
                            propertyExample: prop.example,
                            propertyValidFormatDate: isDate ? false : true,
                            propertyValidFormatDateTime: !isDate ? false : true
                        });
                    }
                  }
              });
            }
            for (const stateKey in dotStateExecutionLogDictionary) {
              const properties = dotStateExecutionLogDictionary[stateKey];
              const hasInvalidFormat = properties.some(property => !(property.propertyValidFormatDate && property.propertyValidFormatDateTime));
              if (hasInvalidFormat) {
                  properties.forEach(property => {
                      result.push({
                          path: [...paths.path, property.schemaKey, "properties", property.propertyName,"example"],
                          message: this.message,
                          severity: this.severity
                      });
                  });
              }
            }
            if (isTrackRuleExecution) {
              this.trackRuleExecutionHandler(JSON.stringify(targetVal,null,2), _opts, paths,this.severity,
              this.constructor.name, moduleName,Dot02.customProperties);
            }    
          return result;
        }
      }
    formats = [oas3];
    severity = DiagnosticSeverity.Error;
}
export default { Dot02 };
