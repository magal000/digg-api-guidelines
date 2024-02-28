import { RulesetInterface} from "../ruleinterface/RuleInterface.ts"
import { CustomProperties } from '../ruleinterface/CustomProperties.ts';
import { DiagnosticSeverity } from "@stoplight/types";
import { ruleExecutionStatus, registerRuleExecutionStatus, logRuleExecution} from '../src/util/RuleExecutionStatusModule.js';
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

  customFunction(targetVal: string, _opts: string, paths: string[],serverity: DiagnosticSeverity, subclassInfo: any, moduleName: any,
    subclassProperties: CustomProperties) {
    //registerRuleExecutionStatus(moduleName, subclassInfo, subclassProperties,serverity.toString());
    logRuleExecution(moduleName,subclassInfo,subclassProperties,this.severity.toString(),true);
    
    //logRuleExecution('Verules.ts', 'Ver06', { id: 'VER.06', area: 'Version management' }, 'Error', true);
    //logRuleExecution('Verules.ts', 'Ver05', { id: 'VER.05', area: 'Version management' }, 'Warning', false);
    return [];
  }  
}

