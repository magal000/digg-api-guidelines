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
import { join } from "path";
import Parsers from "@stoplight/spectral-parsers";
import spectralCore from "@stoplight/spectral-core";
import { importAndCreateRuleInstances, getRuleModules } from "./util/ruleUtil.ts"; // Import the helper function
import util from 'util';
const { Spectral, Document } = spectralCore;
const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);

try {
  // Parse command-line arguments using yargs
  const argv = await yargs(process.argv.slice(2)).version("1.2.0")
    .option("file", {
      alias: "f",
      describe: "Path to the YAML file",
      demandOption: true,
      type: "string",
      coerce: (file: string) => path.resolve(file), // convert to absolute path
    })
    .option("categories", {
      alias: "c",
      describe: `Rule categories separated by commas.\nAvailable categories:\r ${getRuleModules().join(",")}`,
      type: "string",
    })
    .option('log', {
      alias: 'l',
      describe: 'Path to the log file. If not provided, logs will be printed to stdout.',
      type: 'string',
    })
    .option("append", {
      alias: "a",
      describe: "Append log information to the log file (if specified).",
      type: "boolean",
      default: false,
    }).argv;

  // Extract arguments from yargs
  const apiSpecFileName = (argv.file as string) || "";
  const ruleCategories = argv.categories ? (argv.categories as string).split(",") : undefined;
  const logFilePath = argv.log as string | undefined;
  try {
    // Import and create rule instances in RAP-LP
    const enabledRules = await importAndCreateRuleInstances(ruleCategories);
    
    // Create Spectral instance
    const spectral = new Spectral();
    // Set ruleset
    spectral.setRuleset(enabledRules);

    // Load API specification into a Document object
    const apiSpecDocument = new Document(
      fs.readFileSync(join(apiSpecFileName), "utf-8").trim(),
      Parsers.Yaml,
      apiSpecFileName
    );

    try {
      // Run Spectral on the API specification and log the result
      const result = await spectral.run(apiSpecDocument);
      //Check specified option from yargs input
      if (logFilePath) {

        if (argv.append) {
          await appendFileAsync(logFilePath,JSON.stringify(result,null,2));
          console.log(`Appending linting results from RAP-LP to ${logFilePath}`);
        }else {
        //Log to disc
        await writeFileAsync(logFilePath,JSON.stringify(result,null,2));
        console.log(`Writing linting results from RAP-LP to ${logFilePath}`);
        }
      }else {
        //Log to stdout
        console.log(JSON.stringify(result,null,2));
      }
      //console.log(result);
    } catch (spectralError: any) {
      console.error("Error running Spectral:", spectralError.message);
    }
  } catch (ruleError: any) {
    console.error("Error importing and creating rule instances:", ruleError.message);
  }
} catch (yargsError: any) {
  console.error("Error parsing command-line arguments:", yargsError.message);
}