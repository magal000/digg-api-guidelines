"use strict";
/**
 * Usage: Import the ruleClasses that should be loaded in able to run testcases
 */
import * as UfnRules from "../../rulesets/UfnRules.ts";
import * as SakRules from "../../rulesets/SakRules.ts";
import * as VerRules from "../../rulesets/VerRules.ts";
import * as FnsRules from "../../rulesets/FnsRules.ts";
import * as ArqRules from "../../rulesets/ArqRules.ts";
import * as DokRules from "../../rulesets/DokRules.ts";
import * as AmeRules from "../../rulesets/AmeRules.ts";
import * as ForRules from "../../rulesets/ForRules.ts";

const ruleInstances: Record<string, any> = {};

/**
 * Define each rule class to create instance of
 */
const ruleTypes = [
  ForRules.For01,
  ForRules.For02,
  AmeRules.Ame01,
  AmeRules.Ame02,
  AmeRules.Ame04,
  ArqRules.Arq01,
  ArqRules.Arq03,
  ArqRules.Arq05ComplexStructure, ArqRules.Arq05NestedStructure, ArqRules.Arq05StringBinary,
  UfnRules.Ufn01,
  UfnRules.Ufn02,
  UfnRules.Ufn05,
  UfnRules.Ufn06,
  UfnRules.Ufn07,
  UfnRules.Ufn08,
  UfnRules.Ufn09,
  UfnRules.Ufn10,
  UfnRules.Ufn11,
  SakRules.Sak09,
  SakRules.Sak10,
  SakRules.Sak18,
  VerRules.Ver05,
  VerRules.Ver06,
  FnsRules.Fns01,
  FnsRules.Fns03,
  FnsRules.Fns05,
  FnsRules.Fns09,
  FnsRules.Fns07,
  FnsRules.Fns06,
  DokRules.Dok23,
  ForRules.For02,
  FnsRules.Fns08,
  DokRules.Dok23
];
ruleTypes.forEach((RuleClass) => {
  const instance = new RuleClass();
  ruleInstances[RuleClass.name] = instance;
});

export default {  // Usage outside
  rules: ruleInstances,
};