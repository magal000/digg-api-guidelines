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
import yargs from "yargs";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { join } from "path";
import Parsers from "@stoplight/spectral-parsers";
import spectralCore from "@stoplight/spectral-core";
import { importAndCreateRuleInstances, getRuleModules } from "./util/ruleUtil.ts"; // Import the helper function
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { Spectral, Document } = spectralCore;

try {
  // Parse command-line arguments using yargs
  const argv = await yargs(process.argv.slice(2))
    .option("file", {
      alias: "f",
      describe: "Path to the YAML file",
      demandOption: true,
      type: "string",
    })
    .option("categories", {
      alias: "c",
      describe: `Rule categories separated by commas.\nAvailable categories:\r ${getRuleModules().join(",")}`,
      type: "string",
    }).argv;

  // Extract arguments from yargs
  const apiSpecFileName = (argv.file as string) || "";
  const ruleCategories = argv.categories ? (argv.categories as string).split(",") : undefined;

  try {
    // Import and create rule instances in RAP-LP
    const enabledRules = await importAndCreateRuleInstances(ruleCategories);
    
    // Create Spectral instance
    const spectral = new Spectral();
    // Set ruleset
    spectral.setRuleset(enabledRules);

    // Load API specification into a Document object
    const apiSpecDocument = new Document(
      fs.readFileSync(join(__dirname, apiSpecFileName), "utf-8").trim(),
      Parsers.Yaml,
      apiSpecFileName
    );

    try {
      // Run Spectral on the API specification and log the result
      const result = await spectral.run(apiSpecDocument);
      console.log(result);
    } catch (spectralError: any) {
      console.error("Error running Spectral:", spectralError.message);
    }
  } catch (ruleError: any) {
    console.error("Error importing and creating rule instances:", ruleError.message);
  }
} catch (yargsError: any) {
  console.error("Error parsing command-line arguments:", yargsError.message);
}