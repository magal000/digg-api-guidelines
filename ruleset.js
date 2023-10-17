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

const ameRuleset = await import("./rulesets/ame.js");
const arpRuleset = await import("./rulesets/arp.js");
const arqRuleset = await import("./rulesets/arq.js");
const cacRuleset = await import("./rulesets/cac.js");
const dokRuleset = await import('./rulesets/dok.js');
const dotRuleset = await import('./rulesets/dot.js');
const felRuleset = await import('./rulesets/fel.js');
const fnsRuleset = await import('./rulesets/fns.js');
const hypRuleset = await import('./rulesets/hyp.js');
const mogRuleset = await import('./rulesets/mog.js');
const resRuleset = await import('./rulesets/res.js');
const sakRuleset = await import('./rulesets/sak.js');
const ufnRuleset = await import("./rulesets/ufn.js");
const verRuleset = await import('./rulesets/ver.js');
const webRuleset = await import('./rulesets/web.js');

// 
export default {
  rules: {
   'VER.01': verRuleset.default.rules["VER.01"],
    'VER.06': verRuleset.default.rules["VER.06"],
    'UFN.02': ufnRuleset.default.rules["UFN.02"],
    'UFN.05': ufnRuleset.default.rules["UFN.05"],
    'UFN.06': ufnRuleset.default.rules["UFN.06"],
    'UFN.09': ufnRuleset.default.rules["UFN.09"],
    //'WEB.01': webRuleset.default.rules["WEB.01"]
    //'DOT.01': dotRuleset.default.rules["DOT.01"],
  }
}
