import { CustomProperties } from "../../ruleinterface/CustomProperties.ts"


// Define an object to store rule execution status
export const ruleExecutionStatus: Record<string, boolean> = {};

// Function to register module and class information
export function registerRuleExecutionStatus(moduleName: string, className: string, customProperties: CustomProperties) {
    const key = `${moduleName}:${className}:${customProperties.id}:${customProperties.område}`;
    ruleExecutionStatus[key] = true;
}