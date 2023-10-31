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
import * as ver from "./rulesets/ver.ts";
import * as ufn from "./rulesets/ufn.ts";

//console.log ("rulesets files");
//console.log (ufnRuleset.default);


export default{
    rules: {
        'VER.01': ver.default.rules["VER.01"],
        'VER.06': ver.default.rules["VER.06"],
        'UFN.02': ufn.default.rules["UFN.02"],
        'UFN.05': ufn.default.rules["UFN.05"],
        'UFN.06': ufn.default.rules["UFN.06"],
        'UFN.09': ufn.default.rules["UFN.09"],
        //'WEB.01': webRuleset.default.rules["WEB.01"]
        //'DOT.01': dotRuleset.default.rules["DOT.01"],
    }
};
export {};
//# sourceMappingURL=ruleset.js.map