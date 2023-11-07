import { RulesetInterface } from "../ruleinterface/RuleInterface.ts"
import { enumeration, truthy, falsy, undefined as undefinedFunc, pattern, schema } from "@stoplight/spectral-functions";


export class Ver01 implements RulesetInterface {
    description= 'En URL BÖR INTE vara längre än 2048 tecken.';
    message= "{{property}} BÖR INTE vara längre än 2048 tecken";
    given= "$.paths[*]~";
    then=  {
      function: pattern,
      functionOptions: {
        match: '^(?=.{1,2048}$).*'
      }
    }
  }


export class Ver06 implements RulesetInterface {   
    given = "$.paths[*]~";
    description = 'En URL BÖR INTE vara längre än 2048 tecken.';
    message= "{{property}} BÖR INTE vara längre än 2048 tecken";
    then =  {
      function: pattern,
      functionOptions: {
        match: '^(?=.{1,2048}$).*'
      }
    }
  } 

  export default {Ver01,Ver06 };