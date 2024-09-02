import { RulesetInterface} from "../ruleinterface/RuleInterface.ts"
import { CustomProperties } from '../ruleinterface/CustomProperties.ts';
import { DiagnosticSeverity } from "@stoplight/types";
import {logRuleExecution} from '../src/util/RuleExecutionStatusModule.ts';
import Format from "@stoplight/spectral-formats";  // Ensure the import matches module system

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

  formats: any = [];

  trackRuleExecutionHandler(targetVal: string, _opts: string, paths: string[],serverity: DiagnosticSeverity, subclassInfo: any, moduleName: any,
    subclassProperties: CustomProperties) {
    logRuleExecution(moduleName,subclassInfo,subclassProperties,this.severity.toString(),true,targetVal);
    return [];
  }  
}

