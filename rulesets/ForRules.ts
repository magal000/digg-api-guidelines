import {falsy, undefined as undefinedFunc } from "@stoplight/spectral-functions";
import { DiagnosticSeverity } from "@stoplight/types";
import { CustomProperties } from '../ruleinterface/CustomProperties.ts';
import { BaseRuleset} from "./BaseRuleset.ts";
import Format from "@stoplight/spectral-formats";
import { CustomFormats } from "./util/CustomOasVersion.ts";

const moduleName: string = "ForRules.ts";

/**
 * Module contains classes with functions that are need
 */
export class For02 extends BaseRuleset {
  static customProperties: CustomProperties = {
  område: "Förutsättningar",
  id: "FOR.02",
  };
  description = "EN GET -förfrågan SKALL INTE acceptera en body";
  message = "EN GET -förfrågan SKALL INTE acceptera en body";
  given = "$.paths..get";
  then = [{
    field: "requestBody",
    function: undefinedFunc
    },
    {
      function: (targetVal: string, _opts: string, paths: string[]) => {
        this.trackRuleExecutionHandler(JSON.stringify(targetVal,null,2), _opts, paths,
        this.severity,this.constructor.name, moduleName,For02.customProperties);
      }
    }
  ]
  severity = DiagnosticSeverity.Error

  constructor() {
    super();
    super.initializeFormats(['OAS3']);
  } 
}
export default {For02 };
