import { RulesetInterface} from "../ruleinterface/RuleInterface.ts"
import { enumeration, truthy, falsy, undefined as undefinedFunc, pattern, schema } from "@stoplight/spectral-functions";
import { DiagnosticSeverity } from "@stoplight/types";

export interface CustomProperties {
    område: string;
    id: string;
  }
export class BaseRuleset implements RulesetInterface {
  static customProperties: CustomProperties = { område: undefined!, id: '' };
  static getCustomProperties(): CustomProperties {
    return BaseRuleset.customProperties;
  }
  given: string = '';
  message: string = '';
  then: any = {};
  severity: DiagnosticSeverity = DiagnosticSeverity.Error;
}