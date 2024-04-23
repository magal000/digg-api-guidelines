
import { Ufn09Base } from "./rulesetUtil.ts";
import { BaseRuleset } from "./BaseRuleset.ts";
import { enumeration, truthy, falsy, undefined as undefinedFunc, pattern, schema, length, alphabetical } from "@stoplight/spectral-functions";
import { DiagnosticSeverity } from "@stoplight/types";
import { CustomProperties } from '../ruleinterface/CustomProperties.ts';
import { METHODS } from "http";
import { json } from "stream/consumers";
const moduleName: string = "UfnRules.ts";

export class Ufn01 extends BaseRuleset {
  static customProperties: CustomProperties = {
    område: "URL Format och namngivning",
    id: "UFN.01",
  };
  description = "{protokoll}://{domännamn}/{api}/{version}/{resurs}/{identifierare}?{parametrar}"
  given = "$.servers.[url]";
  message = "En URL för ett API BÖR följa namnstandarden nedan: " + this.description;
  then = [
    {
      function: pattern,
      functionOptions: {
        match: "^(?<protocol>^[^\/]*:\/\/)+(?<host>(?<=:\/\/)[^\/]+\/)+(?<api>(?<=\/)[^\/]+?\/)(?<version>(?<=\/)v+[0-9]+)+(?<end>\/$|$)"
      },
    },
    {
      function: (targetVal: string, _opts: string, paths: string[]) => {
        this.trackRuleExecutionHandler(JSON.stringify(targetVal, null, 2), _opts, paths,
          this.severity, this.constructor.name, moduleName, Ufn01.customProperties);
      }
    }
  ];
  severity = DiagnosticSeverity.Warning;
}

export class Ufn02 extends BaseRuleset {
  static customProperties: CustomProperties = {
    område: "URL Format och namngivning",
    id: "UFN.02",
  };
  given = "$.servers.[url]";
  message = "Alla API:er SKALL exponeras via HTTPS på port 443.";
  then = [{
    function: (targetVal):any=>{
      const protocollPattern = /^https:/;
      const portPattern = /(?<port>:[0-9]+)\//;
      const port = targetVal.match(portPattern);
      const result:any = [];
      
      if (protocollPattern.test(targetVal)){
        if(port != null){
          if(port.groups.port === ':443'){
            return result;
          }
        }else{
          return result;
        }
      }
      return [{
          message: this.message,
          severity: this.severity
        },
      ]
    }
  },
  {
      function: (targetVal: string, _opts: string, paths: string[]) => {
        this.trackRuleExecutionHandler(JSON.stringify(targetVal,null,2), _opts, paths,
        this.severity,this.constructor.name, moduleName,Ufn02.customProperties);
      }
  }
];
  severity = DiagnosticSeverity.Error;
}
export class Ufn05 extends BaseRuleset {
  static customProperties: CustomProperties = {
    område: "URL Format och namngivning",
    id: "UFN.05",
  };
  static baseurls:any = [];
  description = "En URL BÖR INTE vara längre än 2048 tecken.";
  given = "$.";
  message = "En URL BÖR INTE vara längre än 2048 tecken.";
  then = [
    {
      field: "servers",
      function: (targetVal:any, _opts: string, paths) => {
        Ufn05.baseurls = targetVal? targetVal: [{url:''}];
      }
    },
    {
      field: "paths",
      function: (targetVal:any, _opts: string, paths) => {
        const result: any = [];
        const regexp = /{.[^{}]*}/;
        for (let i = 0; Ufn05.baseurls.length > i; i++) {
          const jsonPath:any =[]
          let url:any = Ufn05.baseurls[i].url;          
          if(targetVal){            
            Object.keys(targetVal).forEach((path) => {
              jsonPath.push(path);
              url += path;
              const methods:any = targetVal[path];              
              const params:any = [];
              if(methods){
                Object.keys(methods).forEach((path) => {
                
                  const method:any = methods[path];
                  jsonPath.push(path);
                  let queryParams:any = [];
                  if (method.parameters){
                    jsonPath.push("parameters")
                    queryParams = method.parameters.filter((param) => param.in == "query");
                    queryParams.forEach((element) => {
                      params.push(element.schema.maximum? `${element.name}=${element.schema.maximum}`:`${element.name}=`);
                    });
                    url += queryParams.length > 0? `?${params.join("&")}`:"";
                  }
                });    
              }
              
              if (url.split(regexp).join("").length > 2048) {
                result.push(
                  {
                  message: this.message,
                  severity: this.severity,
                  path: ["paths", ...jsonPath]
                  },
                  {
                    message: this.message,
                    severity: this.severity,
                    path: ["servers", i]
                  }
                );
              }          
            })
          }
          if (url.split(regexp).join("").length > 2048) {

            result.push({
              message: this.message,
              severity: this.severity,
              path: ["servers", i]
            });
          }

          i++;
        }
        
        return result
      }
    },
    {
      field: "servers",
      function: (targetVal: string, _opts: string, paths: string[]) => {
        this.trackRuleExecutionHandler(JSON.stringify(targetVal, null, 2), _opts, paths, this.severity,
          this.constructor.name, moduleName, Ufn05.customProperties);
      }
    },
    {
      field: "paths",
      function: (targetVal: string, _opts: string, paths: string[]) => {
        this.trackRuleExecutionHandler(JSON.stringify(targetVal, null, 2), _opts, paths, this.severity,
          this.constructor.name, moduleName, Ufn05.customProperties);
      }
    }
  ];
  severity = DiagnosticSeverity.Warning;
}

export class Ufn06 extends BaseRuleset {
  static customProperties: CustomProperties = {
    område: "URL Format och namngivning",
    id: "UFN.06",
  };
  given = "$.paths[*]~";
  message = "Bokstäver i URL:n SKALL bestå av enbart gemener.";
  then = [
    {
      function: pattern,
      functionOptions: {
        notMatch: "[A-Z]"
      }
    },
    {
      function: (targetVal: string, _opts: string, paths: string[]) => {
        this.trackRuleExecutionHandler(JSON.stringify(targetVal, null, 2), _opts, paths, this.severity,
          this.constructor.name, moduleName, Ufn06.customProperties);
      }
    }
  ];
  severity = DiagnosticSeverity.Error;
}

export class Ufn08 extends BaseRuleset {
  static customProperties: CustomProperties = {
    område: "URL Format och namngivning",
    id: "UFN.08",
  };

  given = "$.paths[*]~";
  message = "Endast bindestreck '-' SKALL användas för att separera ord för att öka läsbarheten samt förenkla för sökmotorer att indexera varje ord för sig.";
  then = [
    {
      function: (targetVal: string, _opts: string, paths: string[]) => {
        const split = targetVal.split("/").filter(removeEmpty => removeEmpty);
        const pathElements = split.filter(e => !e.startsWith("{"));

        var valid: boolean = true;
        pathElements.forEach(part => {

          //  regexp tillåter inte "-", ".", "_" samt "~"
          const separators = /([,._~]+)/g;
          if (separators.test(part)) {
            valid = false;
          }
          if (part.startsWith('-') || part.endsWith('-')) {
            valid = false;
          }
          if (part.indexOf('--') >= 0) {
            valid = false;
          }
        });

        if (!valid) {
          return [
            {
              message: this.message,
              severity: this.severity
            },
          ];
        } else {
          return [];
        }
      }
    },
    {
      function: (targetVal: string, _opts: string, paths: string[]) => {
        this.trackRuleExecutionHandler(JSON.stringify(targetVal, null, 2), _opts, paths,
          this.severity, this.constructor.name, moduleName, Ufn08.customProperties);
      }
    }
  ];
  severity = DiagnosticSeverity.Error;
}
export class Ufn07 extends BaseRuleset {
  static customProperties: CustomProperties = {
    område: "URL Format och namngivning",
    id: "UFN.07",
  };
  message = "URL:n SKALL använda tecken som är URL-säkra (tecknen a-z, 0-9, \"-\", \".\", \"_\" samt \"~\", se vidare i RFC 3986).";
  given = "$."
  then = [{
    field: 'servers',
    function:(targetVal, _opts, paths) => {
      const result:any = [];
      if(targetVal){
        const removeTemplating:RegExp = /{.[^{}]*}/;
        const pattern:RegExp = /^[a-z0-9\/\-,._~]+$/;
        const delimiter:RegExp = /:/g;
        const property:string = "url";
        
        
        for (let i = 0; i < targetVal.length; i++) {
          if(targetVal[i].hasOwnProperty(property)){
            const url = targetVal[i][property].replace(delimiter,'').split(removeTemplating).join("");
            if (!pattern.test(url)){
              result.push(
                {
                  path: [...paths.path, i, property],
                  message: this.message,
                  severity: this.severity
                }
              )
            }
          }
  
        }   
        
      }
      return result;
    }

  },
  {
    field: 'paths',
    function:(targetVal, _opts, paths) => {
      const removeTemplating:RegExp = /{.[^{}]*}/;
      const pattern:RegExp = /^[a-z0-9\/\-,._~]+$/;
      const result:any = [];
      for(let path in targetVal){
        path = path.split(removeTemplating).join("");
        if(!pattern.test(path)){
          result.push(
            {
              path: [...paths.path, path],
              message: this.message,
              severity: this.severity
            }
          )
        }
      }
      return result;
    }
  },
  {
    function: (targetVal: string, _opts: string, paths: string[]) => {
      this.trackRuleExecutionHandler(JSON.stringify(targetVal, null, 2), _opts, paths,
        this.severity, this.constructor.name, moduleName, Ufn07.customProperties);
    }
  }
  ];
  severity = DiagnosticSeverity.Error;
}  



export class Ufn09Server extends Ufn09Base {
  given = '$.servers.[url]';
}
export class Ufn09InPathParameters extends Ufn09Base {
  given = "$.paths.*.*.parameters[?(@.in=='path')].name";
}
export class Ufn09Path extends Ufn09Base {
  given = "$.paths[*]~";

}


export class Ufn10 extends BaseRuleset {
  static customProperties: CustomProperties = {
    område: "URL Format och namngivning",
    id: "UFN.10",
  };
  description = "Understreck '_' SKALL endast användas för att separera ord i parameternamn.";
  given = "$.paths.*.*.parameters[?(@.in=='query')].name";
  message = "Understreck '_' SKALL endast användas för att separera ord i parameternamn.";
  then = [
    {
      function: pattern,
      functionOptions: {
        notMatch: "/[-.~]/",
      }
    },
    {
      function: (targetVal: string, _opts: string, paths: string[]) => {
        this.trackRuleExecutionHandler(JSON.stringify(targetVal, null, 2), _opts, paths,
          this.severity, this.constructor.name, moduleName, Ufn10.customProperties);
      }
    }
  ];
  severity = DiagnosticSeverity.Error;
}

export class Ufn11 extends BaseRuleset {
  static customProperties: CustomProperties = {
    område: "URL Format och namngivning",
    id: "UFN.11",
  };
  description = "Understreck '_' SKALL INTE vara del av bas URL:en.";
  given = "$.servers..url";
  message = "Understreck '_' SKALL INTE vara del av bas URL:en.";
  then = [
    {
      field: "url",
      function: pattern,
      functionOptions: {
        notMatch: "/[_]/",
      }
    },
    {
      function: (targetVal: string, _opts: string, paths: string[]) => {
        return this.trackRuleExecutionHandler(JSON.stringify(targetVal, null, 2), _opts, paths,
          this.severity, this.constructor.name, moduleName, Ufn11.customProperties);
      }
    }
  ];
  severity = DiagnosticSeverity.Error;
}
export default { Ufn02, Ufn05, Ufn06, Ufn07, Ufn08, Ufn09Server, Ufn09Path,Ufn09InPathParameters , Ufn10, Ufn11 };