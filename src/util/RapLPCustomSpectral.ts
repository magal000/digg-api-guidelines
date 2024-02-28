import * as SpectralCore from '@stoplight/spectral-core';
import { ruleExecutionStatus,RuleExecutionLog,ruleExecutionLogDictionary } from './RuleExecutionStatusModule.ts';


import { ISpectralDiagnostic } from '@stoplight/spectral-core';
import spectralCore from "@stoplight/spectral-core";
const { Spectral, Document } = spectralCore;

interface EnabledRules {
    rules: Record<string, any>;
  }
class RapLPCustomSpectral {
  private spectral: SpectralCore.Spectral;
  private rules: Record<string, any>;
  private enabledRules: EnabledRules = {
    rules: {},
};
  private instanceCategoryMap: Map<string, any>;
  constructor() {
    this.spectral = new Spectral();
    this.rules = {};
    this.instanceCategoryMap = new Map<string,any>();
  }
  setRuleset(enabledRules: Record<string,any>): void {
    this.enabledRules.rules = enabledRules;
    this.spectral.setRuleset(this.enabledRules);
  }
  setCategorys(instanceCategoryMap: Map<string,any>): void {
    this.instanceCategoryMap = instanceCategoryMap;
  }
  async run(document: any): Promise<CustomSpectralDiagnostic[]> {
    const spectralResults = await this.spectral.run(document);
    const modifiedResults = this.modifyResults(spectralResults); 
    this.processRuleExecutionLog(ruleExecutionLogDictionary,modifiedResults);
    return modifiedResults;
    //return this.modifyResults(spectralResults);
  }

  private modifyRuleset(enabledRules: EnabledRules): Record<string,any> {
    return enabledRules.rules;
  }
private modifyResults(results: ISpectralDiagnostic[]): CustomSpectralDiagnostic[] {

  const customResults: CustomSpectralDiagnostic[] = []; // Initialize 
  for (const result of results) {
    const ruleName = result.code as string;
    for (const ruleObject of Object.values(this.enabledRules)) {
      if (ruleObject && Object.keys(ruleObject).includes(ruleName)) {
        const ruleInstance = ruleObject[ruleName];
        const ruleClass = this.instanceCategoryMap.get(ruleName);
        if (ruleClass && typeof ruleClass.getCustomProperties === 'function') { // Check for existance
          const customProperties = ruleClass.getCustomProperties;
          const customResult: CustomSpectralDiagnostic = {
            id: ruleClass.customProperties.id,
            område: ruleClass.customProperties.område,
            ...customProperties, // For more copy
              ...this.mapResultToCustom(result),
          };
          customResults.push(customResult);
          break; // Break the loop once a match is found
        }
      }
    }
  }
  return customResults;
}
private mapResultToCustom(result: ISpectralDiagnostic): CustomSpectralDiagnostic {
  // Map properties from result ISpectralDiagnostic to CustomSpectralDiagnostic
  const { message,code,severity,path,source,range, ...rest } = result;

  // Map severity to corresponding string value for allvarlighetsgrad
  let allvarlighetsgrad: string;
  switch (severity) {
    case 0:
      allvarlighetsgrad = 'ERROR';
      break;
    case 1:
      allvarlighetsgrad = 'WARNING';
      break;
    case 2:
      allvarlighetsgrad = 'INFORMATION';
      break;
    case 3:
      allvarlighetsgrad = 'HINT';
      break;
    default:
      allvarlighetsgrad = ''; // Handle other cases if needed
  }
  return {
    ...rest,
    
    krav: message, 
    allvarlighetsgrad,
    sökväg: path,
    omfattning: range,
  };
}
private processRuleExecutionLog(log: RuleExecutionLog, spectralResults: CustomSpectralDiagnostic[]) {
  const executedRuleIds = new Set<string>(); // Set to track executed rule IDs
  const executedRuleIdsWithError = new Set<string>();
  const ruleIdsNotApplicable = new Set<string>();

  console.log("<<<<!!!!!>>>>>");
 
  const notApplicableRules: { id: string; område: string }[] = [];
  const executedRules: {id: string; område: string}[] = [];
  const exercutedRulesWithError: {id: string; område: string}[] = [];
  for (const key in log) {
    const rules = log[key];
    const { moduleName, className } = rules[0]; // Get module and class name from the first entry
    
    console.log(`Rule execution status for ${moduleName}:${className}:`);
    
    rules.forEach(rule => {
      const { customProperties, severity, passed } = rule;
      const status = passed ? 'PASSED' : 'FAILED';
      const severityText = severity.toUpperCase();
      console.log("Område/ID:" + customProperties.område + "/ " + customProperties.id);
      // Check if rule is found in Spectral results
      console.log("SpectralResult:\n"+ JSON.stringify(spectralResults,null,2));
      const spectralResult = spectralResults.find(result => {
        return result.område === customProperties.område && result.id === customProperties.id;
      });
      //console.log("Spectral result: " + spectralResult);
      if (spectralResult) {
        //We have a match, that means there is an error
        executedRuleIdsWithError.add(customProperties.id);
        exercutedRulesWithError.push({ id: customProperties.id, område: customProperties.område }); // Rules

        console.log("<<<Error>>>");
        console.log(`${status} - ID: ${customProperties.id}, Area: ${customProperties.område}, Severity: ${severityText} (Spectral: ${spectralResult.allvarlighetsgrad})`);
      } else {
        //We dont have a match, that means there is not an error and 'only' a rule diagnostic executed
        console.log("<<<No Error>>>");
        executedRuleIds.add(customProperties.id);
        executedRules.push({ id: customProperties.id, område: customProperties.område }); // Rules

        console.log(`${status} - ID: ${customProperties.id}, Area: ${customProperties.område}, Severity: ${severityText} (Spectral: Not Found)`);
      }
    });
    
    console.log('\n'); // Add newline for better readability
  }
  /*
  console.log("Enabled rules: " + JSON.stringify(this.enabledRules,null,2));
  //console.log("InstanceCategoryMap:" + JSON.stringify(this.instanceCategoryMap.entries,null,2));

  console.log("<<<<Executed RuleIds set>>>");
  executedRuleIds.forEach((value) => {
    console.log("ExecutedRuleId set value: " + value);
  });
  console.log("<<<<Executed RuleIdsWithError set>>>");
  executedRuleIdsWithError.forEach((value) => {
    console.log("ExecutedRuleIdWithError set value: " + value);
  });
  */
  const mergedSet = new Set([...executedRuleIds, ...executedRuleIdsWithError]);
  /*
  console.log("<<<<Merged set>>>");
  mergedSet.forEach((value) => {
    console.log("Merged set value: " + value);
  });
  */
  for (const key of this.instanceCategoryMap.keys()) {
    //console.log("Key is: " + key);
    const customProperties = this.instanceCategoryMap.get(key).customProperties;
    if (!mergedSet.has(customProperties.id)) {
      // If not present, store the id and område in the missingIds array
      notApplicableRules.push({ id: customProperties.id, område: customProperties.område }); // Rules
    }
  }
  console.log("<<<Executed Rules - RAP-LP>>> ", executedRules);
  console.log("<<<Executed Rules with Error - RAP-LP>>> ", exercutedRulesWithError);
  console.log("<<<Not applicable Rules - RAP-LP>>> ", notApplicableRules);
     //console.log("CustomProperties ID is : " + this.instanceCategoryMap.get(key).customProperties.id);
}
}
export {RapLPCustomSpectral};
/**
 * Own defined interface to extend ISpectralDiagnostic.
 * The interface also extends the omit type in order to 'remove' some fields from the iSpectralDiagnostic
 */
interface CustomSpectralDiagnostic extends Omit<ISpectralDiagnostic, 'message' | 'code' | 'severity' | 'path' | 'source' | 'range'> {
  id?: string;
  område?: string;
  krav?: string;
  allvarlighetsgrad?: string;
  sökväg?: any;
  omfattning?: any;
}