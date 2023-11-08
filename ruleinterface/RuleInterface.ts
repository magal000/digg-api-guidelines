interface Than{
    field?: string;

}

interface FunctionOptions {
    match?: string;
}
export interface RuleInterface extends Than, FunctionOptions{
    given?: string;
    message?: string;
    field?: string;
    match?: string;
   }

export interface RulesetInterface extends Than, FunctionOptions, RuleInterface {
    given?: string;
    message?: string;
    field?: string;
    match?: string;
    function?:() => any;
    description?:string;
}
export {};