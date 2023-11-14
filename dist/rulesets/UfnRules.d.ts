import { RulesetInterface } from "../ruleinterface/RuleInterface.ts";
export declare class Ufn02 implements RulesetInterface {
    given: string;
    message: string;
    then: {
        field: string;
        function: import("@stoplight/spectral-core").RulesetFunctionWithValidator<string, import("@stoplight/spectral-functions").PatternOptions>;
        functionOptions: {
            match: string;
        };
    };
}
export declare class Ufn05 implements RulesetInterface {
    description: string;
    given: string;
    message: string;
    then: {
        function: import("@stoplight/spectral-core").RulesetFunctionWithValidator<string, import("@stoplight/spectral-functions").PatternOptions>;
        functionOptions: {
            match: string;
        };
    };
}
declare const _default: {
    Ufn02: typeof Ufn02;
    Ufn05: typeof Ufn05;
};
export default _default;
//# sourceMappingURL=UfnRules.d.ts.map