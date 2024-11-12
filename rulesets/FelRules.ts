import {falsy, undefined as undefinedFunc } from "@stoplight/spectral-functions";
import { DiagnosticSeverity } from "@stoplight/types";
import { CustomProperties } from '../ruleinterface/CustomProperties.ts';
import { BaseRuleset} from "./BaseRuleset.ts";
import Format from "@stoplight/spectral-formats";
import { CustomFormats } from "./util/CustomOasVersion.ts";

const moduleName: string = "FelRules.ts";

/**
 * Module contains classes with functions that are needed for category felhantering
 */
export class Fel01 extends BaseRuleset {
  static customProperties: CustomProperties = {
  område: "Felhantering",
  id: "FEL.01",
  };
  description = "";
  message = "Om HTTP svarskoderna inte räcker SKALL (FEL.01) API:et beskriva feldetaljer enligt RFC 9457 med dessa ingående attribut; type, title, status, detail och instance.";
  given = "$";
  then = [
    {
      function: (targetVal: string, _opts: string, paths: string[]) => {
        this.trackRuleExecutionHandler(JSON.stringify(targetVal,null,2), _opts, paths,
        this.severity,this.constructor.name, moduleName,Fel01.customProperties);
      }
    }
  ]
  severity = DiagnosticSeverity.Error

  constructor() {
    super();
    super.initializeFormats(['OAS3']);
  } 
}
export default {Fel01};
