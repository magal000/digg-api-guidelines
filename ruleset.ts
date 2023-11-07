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
//var ufnRuleset = await Promise.resolve().then(function () { return import("./ufn.js"); });
//var verRuleset = await Promise.resolve().then(function () { return import("./ver.js"); });
import { Ufn02 ,Ufn05} from "./ruleservices/UfnRules.ts";
import { Ver01 ,Ver06} from "./ruleservices/VerRules.ts";

    const VER01 = new Ver01();
    const VER06 = new Ver06();
    const UFN02 = new Ufn02();
    const UFN05 = new Ufn05()
    
 export default { rules: {
    
    
    VER01, UFN02, VER06,UFN05
  }
};
export {};
//# sourceMappingURL=ruleset.js.map