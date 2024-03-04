import { CustomProperties } from "../../ruleinterface/CustomProperties.ts"

interface RuleExecutionInfo {
    moduleName: string;
    className: string;
    customProperties: CustomProperties;
    severity: string;
    passed: boolean;
    targetVal: string;
  }
  
export interface RuleExecutionLog {
    [key: string]: RuleExecutionInfo[];
  }
export const ruleExecutionLogDictionary: RuleExecutionLog = {};

// Define an object to store rule execution status
export const ruleExecutionStatus: Record<string, boolean> = {};

// Function to register module and class information
export function registerRuleExecutionStatus(moduleName: string, className: string, customProperties: CustomProperties,severity: string) {
    const key = `${moduleName}:${customProperties.id}:${customProperties.område}:${severity}`;
    ruleExecutionStatus[key] = true;
}
export function logRuleExecution(moduleName: string, className: string, customProperties: CustomProperties, severity: string, passed: boolean, targetVal: string) {
    const key = `${moduleName}:${customProperties.id}:${customProperties.område}:${severity}`;
    
    if (!ruleExecutionLogDictionary[key]) {
        ruleExecutionLogDictionary[key] = [];
    }
    
    ruleExecutionLogDictionary[key].push({ moduleName, className, customProperties, severity, passed, targetVal });
  }
