import { RulesetInterface } from "../ruleinterface/RuleInterface.ts";
export declare class Ver01 implements RulesetInterface {
    description: string;
    message: string;
    given: string;
    then: {
        function: import("@stoplight/spectral-core").RulesetFunctionWithValidator<string, import("@stoplight/spectral-functions").PatternOptions>;
        functionOptions: {
            match: string;
        };
    };
}
export declare class Ver06 implements RulesetInterface {
    given: string;
    description: string;
    message: string;
    then: {
        function: import("@stoplight/spectral-core").RulesetFunctionWithValidator<string, import("@stoplight/spectral-functions").PatternOptions>;
        functionOptions: {
            match: string;
        };
    };
}
declare const _default: {
    Ver01: typeof Ver01;
    Ver06: typeof Ver06;
};
export default _default;
//# sourceMappingURL=VerRules.d.ts.map