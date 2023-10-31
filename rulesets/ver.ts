import { enumeration, truthy, falsy, undefined as undefinedFunc, pattern, schema } from "@stoplight/spectral-functions";
import { RuleService } from "../ruleservices/RuleService.ts"

let given =  "$.paths[*]~";
let message = "{{property}} -->  The API info resource should be located at the root path ('/') and be named api-info";
let field = "$.paths[/api-info]";
let match =  "^api-info$";
let severity = 3;

let rulesService = new RuleService(given, message, field, match, severity);

export default {
    rules: {
        'VER.01': {
            given:rulesService.given,
            message: rulesService.message,
            description:
                "Bokstäver i URL:n SKALL bestå av enbart gemener.",
            then: {
                field: rulesService.field,
                function: pattern,
                functionOptions: {
                    match:rulesService.match
                }
            },
            severity: rulesService.severity,
        },
        'VER.06': {
            message:
                "{{property}} -->  The API info resource should be located at the root path ('/') and be named api-info",
            description:
                "Bokstäver i URL:n SKALL bestå av enbart gemener.",
            given: "$.paths[*]~",
            then: {
                field: "$.paths[/api-info]",
                function: truthy,

                //field: "$.paths[/api-info]",
                //function: pattern,
                /*
                functionOptions: {
                    match: '^api-info$',
                }*/
            },
            severity: rulesService.severity,
        },
    }
};
