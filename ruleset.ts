"use strict";
/*************************************************************
 *
 *                        RAP-LP
 *            Rest Api Profil - Lint Processor
 *
 *       En samling av alla regler som ska användas för
 *       att validera API-specifikationen
 *
 *
 **************************************************************/
import * as UfnRules from "./rulesets/UfnRules.ts";
import * as SakRules from "./rulesets/SakRules.ts";

const ruleInstances: Record<string, any> = {};

const ruleTypes = [
  UfnRules.Ufn02,
  UfnRules.Ufn06,
  UfnRules.Ufn09,
  UfnRules.Ufn10,
  SakRules.Sak09,
];

ruleTypes.forEach((RuleClass) => {
  const instance = new RuleClass();
  ruleInstances[RuleClass.name] = instance;
});
export default {
  rules: ruleInstances,
};



