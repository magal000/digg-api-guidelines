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
import * as VerRules from "./rulesets/VerRules.ts";

const ruleInstances: Record<string, any> = {};

const ruleTypes = [
  UfnRules.Ufn02,
  UfnRules.Ufn09,
  UfnRules.Ufn06,
  SakRules.Sak09,
  VerRules.Ver06,
];

ruleTypes.forEach((RuleClass) => {
  const instance = new RuleClass();
  ruleInstances[RuleClass.name] = instance;
});
export default {
  rules: ruleInstances,
};



