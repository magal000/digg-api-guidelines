import type { Format } from '@stoplight/spectral-core';

export interface RulesetInterface {
    given?: string | string[];
    message?: string;
    field?: string;
    severity?:number;
    category?: string;
    function?:() => any;
    description?:string;
    formats?:any[];
    //formats?: Format[];
    
}
