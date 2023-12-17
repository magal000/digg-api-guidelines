"use strict";
/**
 * Usage: Import the ruleClasses that should be loaded in able to run testcases
 */
import * as UfnRules from "../../rulesets/UfnRules.ts";
import * as SakRules from "../../rulesets/SakRules.ts";
import * as VerRules from "../../rulesets/VerRules.ts";
import * as FnsRules from "../../rulesets/FnsRules.ts";
import * as ArqRules from "../../rulesets/ArqRules.ts";

const ruleInstances: Record<string, any> = {};

/**
 * Define each rule class to create instance of
 */
const ruleTypes = [
  ArqRules.Arq05ComplexStructure, ArqRules.Arq05NestedStructure, ArqRules.Arq05StringBinary,
  UfnRules.Ufn02,
  UfnRules.Ufn06,
  UfnRules.Ufn07,
  UfnRules.Ufn09,
  UfnRules.Ufn10,
  UfnRules.Ufn11,
  SakRules.Sak09,
  SakRules.Sak10,
  VerRules.Ver06,
  FnsRules.Fns01,
  FnsRules.Fns03
];
ruleTypes.forEach((RuleClass) => {
  const instance = new RuleClass();
  ruleInstances[RuleClass.name] = instance;
});

export default {  // Usage outside
  rules: ruleInstances,
};



