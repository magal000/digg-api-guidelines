import { enumeration, truthy, falsy, undefined as undefinedFunc, pattern, schema } from "@stoplight/spectral-functions";
import { RuleService } from "../ruleservices/RuleService.ts"

let given = "$.servers[?(@.url.startsWith('http'))]";
let message = "{{property}} Alla API:er SKALL exponeras via HTTPS på port 443.";
let field = 'url';
let match = '^(https)://(.*)$';

let rulesService = new RuleService(given, message, field, match);


export default{
  rules: {
    //Corresponds to rule UFN.02 in REST API-profile version 1.1.0
    'UFN.02': {
      given: rulesService.given,
      message: rulesService.message,
      then: {
        field: rulesService.field,
        function: pattern,
        functionOptions: {
          match: rulesService.match
        }
      },
    },
    
    //Corresponds to rule UFN.02 in REST API-profile version 1.1.0
    'UFN.05': {
      description: 'En URL BÖR INTE vara längre än 2048 tecken.',
      message: "{{property}} BÖR INTE vara längre än 2048 tecken",
      given: "$.paths[*]~",
      then: {
        function: pattern,
        functionOptions: {
          match: '^(?=.{1,2048}$).*',
        }
      },
    },
    //Corresponds to rule UFN.06 in REST API-profile version 1.1.0
    "UFN.06": {
      description: 'En URL BÖR INTE vara längre än 2048 tecken.',
      given: "$.paths[*]~",      
      message:"{{property}} --> Bokstäver i URL:n SKALL bestå av enbart gemener.",
      then: {
        function: pattern,
        functionOptions: {
          match: "^[a-z/{}]*$",
        },
      },
      severity: 'warn',
    },
    //Corresponds to rule UFN.09 in REST API-profile version 1.1.0
    "UFN.09": {
      message:
        "{{property}} ska vara kebab-case (gemener och separerade med ett '-').",
      description:
        "Blanksteg ' ' och understreck '_' SKALL INTE användas i URL:er med undantag av parameter-delen.",
      given: "$.paths[*]~",
      then: {
        function: pattern,
        functionOptions: {
          match: "^(/|[a-z0-9-.]+|{[a-zA-Z0-9_]+})+$",
        },
      },
      severity: 'warn',
    },

  }
}
