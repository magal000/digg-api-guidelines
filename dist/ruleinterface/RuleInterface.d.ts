interface Than {
    field?: string;
}
interface FunctionOptions {
    match?: string;
    notMatch?: string;
}
export interface RuleInterface extends Than, FunctionOptions {
    given?: string;
    message?: string;
    field?: string;
    severity?: string;
}
export interface RulesetInterface extends Than, FunctionOptions, RuleInterface {
    function?: () => any;
    description?: string;
}
export {};
//# sourceMappingURL=RuleInterface.d.ts.map