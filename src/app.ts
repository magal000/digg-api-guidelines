/*************************************************************
 *
 *                        RAP-LP
 *            Rest Api Profil - Lint Processor
 *
 *    Linter for the swedish Rest API profile specification
 *    REST API-profil
 *    https://dev.dataportal.se/rest-api-profil
 *
 **************************************************************/
// Namnet på API-specifikationsfilen som ska validera
const apiSpecFileName = "../apis/ver-api.yaml";

// En samling av alla regler som ska användas för att validera API-specifikationen
const allRules = await import('../ruleset.ts');

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { join } from "path";
import Parsers from "@stoplight/spectral-parsers";
import spectralCore from "@stoplight/spectral-core";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { Spectral, Document } = spectralCore;
const spectral = new Spectral();
spectral.setRuleset(allRules.default);
// Ett Document-objekt som representerar API-specifikationen som ska valideras
const apiSpecDocument = new Document(
    // load an API specification file from your project's root directory. 
    fs.readFileSync(join(__dirname, apiSpecFileName), "utf-8").trim(), Parsers.Yaml, apiSpecFileName);
// Validera API-specifikationen och logga resultatet
spectral.run(apiSpecDocument).then(console.log);
