import { CustomProperties } from '../ruleinterface/CustomProperties.ts';
import { BaseRuleset} from "./BaseRuleset.ts"
import { enumeration, truthy, falsy, undefined as undefinedFunc, pattern, schema } from "@stoplight/spectral-functions";
import { DiagnosticSeverity } from "@stoplight/types";
const moduleName: string = "DokRules.ts";
import pkg from '@stoplight/spectral-formats';
const { oas2,oas3} = pkg;


export class Dok20 extends BaseRuleset {
  static customProperties: CustomProperties = {
    område: "Dokumentation",
    id: "DOK.20",
  };
    given = "$.paths[*][*].responses[*]";
    message = "Förväntade returkoder och felkoder SKALL vara fullständigt dokumenterade.";
    then = [{
      field: "description",
      function: truthy
      
    },
    {
      function: (targetVal: string, _opts: string, paths: string[]) => {
        this.trackRuleExecutionHandler(JSON.stringify(targetVal,null,2), _opts, paths,this.severity,
        this.constructor.name, moduleName,Dok20.customProperties);
      }
    }
];
severity = DiagnosticSeverity.Error; 
}

export class Dok23 extends BaseRuleset {
  static customProperties: CustomProperties = {
    område: "Dokumentation",
    id: "DOK.23",
  };
  given = "$.servers[*].url";
  message = "API specifikationen SKALL återfinnas under API-roten.";
  then = [{
    field: "url",
    function: pattern,
    functionOptions: {
      match: "^[a-z]+://(?:[a-z0-9\-.]+\.)+([a-z]{2,6})(?:\/[a-z0-9-]+/[a-z0-9-]+)?$"
    }
    },
    {
      function: (targetVal: string, _opts: string, paths: string[]) => {
        this.trackRuleExecutionHandler(JSON.stringify(targetVal,null,2), _opts, paths,this.severity,
        this.constructor.name, moduleName,Dok23.customProperties);
      }
    }
  ];
  formats = [oas3];
  severity = DiagnosticSeverity.Error; 
}
export default { Dok23, Dok20 };
