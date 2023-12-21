// ruleUtil.ts
interface CustomSchema {
  id: string;
  krav: string;
  sökväg: string[];
  allvarlighetsgrad: number;
  omfattning: { start: Record<string, unknown>; end: Record<string, unknown> };
  kategori: string;
  typ: string;
}
/**
 *  Add other rule modules when applying new rules to RAP-LP
 *  Modules are loaded as default ones when no explicit category is choosed from the command line
 */
const ruleModules = [
  "UfnRules",
  "SakRules",
  "VerRules",
  "FnsRules",
  "ArqRulles",
  "DokRules"
];
/**
 * 
 * @param ruleCategories 
 * @returns 
 */
export function getRuleModules() {
  return ruleModules;
}
/**
 * 
 * @param ruleCategories Defined category (optional)
 * @returns Promise object with enabled rules in RAP-LP to run
 */
export async function importAndCreateRuleInstances(ruleCategories?: string[]): Promise<{ rules: Record<string, any>;instanceCategoryMap: Map<string, any> }> {
  const ruleInstances: Record<string, any> = {}; // store instances of rule classes
  const ruleTypes: any[] = []; // array to store rule classes.
  const instanceCategoryMap: Map<string, any> = new Map();

    /**
     * 
     * @param category Defined category as an parameter
     * @returns Promise - resolve to exported content of the specified module.
     */
    async function importRuleModule(category: string): Promise<any> {
      try {
        // import the module based on the provided category 
        const ruleModule = await import(`../../rulesets/${category}.ts`);
        //Extract values (exports) from imported ruleModule in RAP-LP
        const values = Object.values(ruleModule);
        if (values.length > 0) {
          return values as any;
        } else {
          //No exports from loaded ruleModule is found for the category
          throw new Error(`No exports found in module for category ${category}`);
        }
      } catch (error: any) {
        //Saftey check in case of error when loading module[s]
        console.error(`Error importing rules for category ${category}:`, error.message);
        return null;
      }
    }
    /**
     * 
     * @param categories Defined categoeries to be loaded
     */
    async function importRulesByCategory(categories: string[]) {
      for (const category of categories) {
        const ruleClasses = await importRuleModule(category);
        if (ruleClasses) {
          for (const ruleClass of ruleClasses) {
            if (ruleClass instanceof Function) // Check to see if has constructor function 
            ruleTypes.push(ruleClass); // Push the imported ruleClass in RAP-LP to array of ruleTypes 
            //Store ruletype for each instance
            //instanceCategoryMap.set(ruleClass.name, category); // Do we have name of ruleClass ? 
          }
        }
      }
    }
    async function importAllRules() {
      await importRulesByCategory(ruleModules);
    }
    /**
     * Load modules
     */
    if (ruleCategories && ruleCategories.length > 0) {
      await importRulesByCategory(ruleCategories);
    } else {
      await importAllRules();
    }
    /**
     * Loop entries of instanceCategory map
     */
    // Create instances of rule classes in RAP-LP
    ruleTypes.forEach((RuleClass) => {
      try {
        const instance = new RuleClass();
        ruleInstances[RuleClass.name] = instance;
        instanceCategoryMap.set(RuleClass.name, RuleClass); // Do we have name of ruleClass ?
      } catch (error: any) {
        console.error(`Error creating instance of rule class ${RuleClass.name}:`, error.message);
      }
    });
    return { rules: ruleInstances, instanceCategoryMap };
}
