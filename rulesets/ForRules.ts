import {undefined as undefinedFunc } from "@stoplight/spectral-functions";
import { DiagnosticSeverity } from "@stoplight/types";
import { BaseRuleset, CustomProperties } from "./BaseRuleset.ts"
import { oas3 } from "@stoplight/spectral-formats";
import { oas2 } from "@stoplight/spectral-formats";

/**
 * Module contains classes with functions that are need
 */
/*
export class For02 extends BaseRuleset {
    static customProperties: CustomProperties = {
      område: "Förutsättningar",
      id: "FOR.02",
    };
    description = "EN GET -förfrågan SKALL INTE acceptera ett body";
    message = "EN GET -förfrågan SKALL INTE acceptera ett body";
    given = "$.paths..get.parameters..[*].name";
    then = {
        function: pattern,
        functionOptions:{
          notMatch: /^body$/
        }        
      }
      severity = DiagnosticSeverity.Error
      
  }
*/
export class For02 extends BaseRuleset {
  static customProperties: CustomProperties = {
    område: "Förutsättningar",
    id: "FOR.02",
  };
  description = "EN GET -förfrågan SKALL INTE acceptera en body";
  message = "EN GET -förfrågan SKALL INTE acceptera en body";
  given = "$.paths..get.requestBody";
  then =  {
    function: undefinedFunc,
  }
  //formats = [oas3]
    severity = DiagnosticSeverity.Error
    
}
export default { For02 };
