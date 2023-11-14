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
import { Ufn02, Ufn05 } from "./rulesets/UfnRules.ts";
import { Ver01, Ver06 } from "./rulesets/VerRules.ts";
import { Sak09 } from "./rulesets/SakRules.ts";
declare const _default: {
    rules: {
        VER01: Ver01;
        UFN02: Ufn02;
        VER06: Ver06;
        UFN05: Ufn05;
        SAK09: Sak09;
    };
};
export default _default;
export {};
//# sourceMappingURL=ruleset.d.ts.map