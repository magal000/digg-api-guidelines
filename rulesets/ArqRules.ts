import { Arq05Base } from "./rulesetUtil.ts"
const moduleName: string = "ArqRules.ts";

export class Arq05NestedStructure extends Arq05Base {
  description ="Om en header använder nästlade strukturer, är en requestbody mer lämplig.";
  message ="[" + super.messageValue  + "] " + this.description;
  then = [{
    function: (targetVal, _opts, paths) => {
      if (this.checkSchema(targetVal, 'object') && targetVal.schema.properties) {
        return [
          {
            message: this.message,
            severity: this.severity,
          },
        ];
      }
      return [];
    },
  },
  {
    function: (targetVal: string, _opts: string, paths: string[]) => {
      return this.trackRuleExecutionHandler(JSON.stringify(targetVal,null,2), _opts, paths,
      this.severity,this.constructor.name, moduleName,Arq05NestedStructure.customProperties);
    }
  }
];
}
export class Arq05StringBinary extends Arq05Base {
  description ="Om en header förväntas innehålla data med ovanliga MIME-typer kan det indikera en okonventionell användning av headers.";
  message ="[" + super.messageValue  + "] " + this.description;
  then = [{
    function: (targetVal, _opts, paths) => {

      if (this.checkSchema(targetVal, 'string', 'binary')) {
        return [
          {
            message: this.message,
            severity: this.severity,
          },
        ];
      }

      return [];
    },
  },
  {
    function: (targetVal: string, _opts: string, paths: string[]) => {
      return this.trackRuleExecutionHandler(JSON.stringify(targetVal,null,2), _opts, paths,
      this.severity,this.constructor.name, moduleName,Arq05StringBinary.customProperties);
    }
  }
];
}
export class Arq05ComplexStructure extends Arq05Base {
  description ="Om en header förväntas innehålla komplexa datastrukturer, såsom JSON eller XML, kan det indikera en okonventionell användning av headers.";
  message ="[" + super.messageValue  + "] " + this.description;
    then = [{
      function: (targetVal, _opts, paths) => {
        if (this.checkSchema(targetVal, 'object')) {
          return [
            {
              message: this.message,
              severity: this.severity,
            },
          ];
        }
        return [];
      },
    },
    {
      function: (targetVal: string, _opts: string, paths: string[]) => {
        return this.trackRuleExecutionHandler(JSON.stringify(targetVal,null,2), _opts, paths,
        this.severity,this.constructor.name, moduleName,Arq05ComplexStructure.customProperties);
      }
    }
  ];
}
export default { Arq05NestedStructure, Arq05StringBinary, Arq05ComplexStructure };