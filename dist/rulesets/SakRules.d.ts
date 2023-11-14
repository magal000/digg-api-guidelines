import { RulesetInterface } from "../ruleinterface/RuleInterface.ts";
export declare class Sak09 implements RulesetInterface {
    description: string;
    message: string;
    given: string;
    then: {
        field: string;
        function: import("@stoplight/spectral-core").RulesetFunctionWithValidator<string, import("@stoplight/spectral-functions").PatternOptions>;
        functionOptions: {
            notMatch: string;
        };
    };
}
declare const _default: {
    Sak09: typeof Sak09;
};
export default _default;
//# sourceMappingURL=SakRules.d.ts.map