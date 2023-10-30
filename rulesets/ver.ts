import { enumeration, truthy, falsy, undefined as undefinedFunc, pattern, schema } from "@stoplight/spectral-functions";

export default {
    rules: {
        'VER.01': {
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
                functionOptions: {
                    match: '^api-info$',
                }
            },
            severity: 'warn',
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
                functionOptions: {
                    match: '^api-info$',
                }
            },
            severity: 'warn',
        },
    }
};
