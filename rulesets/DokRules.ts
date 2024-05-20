import { CustomProperties } from '../ruleinterface/CustomProperties.ts';
import { BaseRuleset} from "./BaseRuleset.ts"
import { enumeration, truthy, falsy, undefined as undefinedFunc, pattern, schema } from "@stoplight/spectral-functions";
import { DiagnosticSeverity } from "@stoplight/types";
const moduleName: string = "DokRules.ts";

export class Dok17 extends BaseRuleset {
  static customProperties: CustomProperties = {
    område: "Dokumentation",
    id: "DOK.17",
  };
  description = " ( Linter-analysverktyget (RAP-LP) för den nationella REST API-profilen är designat för senaste major versionen av OpenAPI Specification. Använd därför denna för full täckning av de implementerade reglerna. )";
  message = "API specifikation BÖR dokumenteras med den senaste versionen av OpenAPI Specification." + this.description;
  given = "$";
  then = [{
      field: 'swagger',
      function: falsy,
  },
  {
    function: (targetVal: string, _opts: string, paths: string[]) => {
      this.trackRuleExecutionHandler(JSON.stringify(targetVal,null,2), _opts, paths,
      this.severity,this.constructor.name, moduleName,Dok17.customProperties);
    }
  }
];
 severity = DiagnosticSeverity.Warning;
}
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

export class Dok07 extends BaseRuleset {
  static customProperties: CustomProperties = {
    område: "Dokumentation",
    id: "DOK.07",
  };
  given = "$.info";
  message = "Dokumentationen av ett API BÖR innehålla övergripande information om API:et.";
  then = [{
    field:"description",
    function: truthy
    
  },
  {
    function: (targetVal: string, _opts: string, paths: string[]) => {
      this.trackRuleExecutionHandler(JSON.stringify(targetVal,null,2), _opts, paths,this.severity,
      this.constructor.name, moduleName,Dok07.customProperties);
    }
  }
];
  severity = DiagnosticSeverity.Warning; 
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
  severity = DiagnosticSeverity.Error; 
}

export class Dok19 extends BaseRuleset {
  static customProperties: CustomProperties = {
    område: "Dokumentation",
    id: "DOK.19",
  };
  given = "$.paths[*][*]"
  message = "Kontroll om förekomst av fältet description finns i specifikationen under respektive operation get/post";
  then = [{
    field: "description",
    function: truthy
  },
  {
    function: (targetVal: string, _opts: string, paths: string[]) => {
      this.trackRuleExecutionHandler(JSON.stringify(targetVal,null,2), _opts, paths,this.severity,
      this.constructor.name, moduleName,Dok19.customProperties);
    }
  }
];
  severity = DiagnosticSeverity.Error; 
}
export default { Dok23, Dok20, Dok19, Dok07,Dok17 };
