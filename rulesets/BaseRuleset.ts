import { RulesetInterface} from "../ruleinterface/RuleInterface.ts"
import { CustomProperties } from '../ruleinterface/CustomProperties.ts';
import { DiagnosticSeverity } from "@stoplight/types";
import { ruleExecutionStatus, registerRuleExecutionStatus} from '../src/util/RuleExecutionStatusModule.js';
/*export interface CustomProperties {
    område: string;
    id: string;
  }*/
export class BaseRuleset implements RulesetInterface {
  static customProperties: CustomProperties = { område: undefined!, id: '' };
  static getCustomProperties(): CustomProperties {
    return BaseRuleset.customProperties;
  }
  given: string = '';
  message: string = '';
  then: any = {};
  description: string = '';
  severity: DiagnosticSeverity = DiagnosticSeverity.Error;

  customFunction(targetVal: string, _opts: string, paths: string[], subclassInfo: any, subclassProperties: CustomProperties) {
    // Implement custom logic here for the same rule
   // const moduleName = require.main ? require.main.filename : 'unknown';
    //console.log("Modulename: " + moduleName);
    console.log("<<<We are in the mood in the super!>>>");
    console.log("SubclassInfo: " + subclassInfo);
    registerRuleExecutionStatus('exampleClassModule', subclassInfo, subclassProperties);
    return [];
  }  
}

