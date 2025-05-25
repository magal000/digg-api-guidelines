# DIGG API Spectral Ruleset

This is a "fork" of the Swedish [Agency for Digital Government](https://www.digg.se/en) [RAP-LP](https://github.com/diggsweden/rest-api-profil-lint-processor/tree/main) project. The aim being to remove all the custom stuff DIGG have added and reduce it to a spectral ruleset `.yaml` file that can be used with default Spectral CLI.

## Background

[Stoplight Spectral](https://stoplight.io/open-source/spectral) is an open source project that provides different tools and libraries for linting [OpenAPI](https://www.openapis.org/) specifications.

Spectral provides a CLI for linting and functionality for defining custom rulesets. DIGG seem to have taken the Spectral libraries and created their own completely different CLI. 

Now I have only tested the DIGG tool a little so I could be wrong, but I can only imagine that it would have been simpler for everyone to use the default Spectral CLI. If I'm not mistaken the only new functionality is that the results can be saved to an excel file.

## What's new

* In the upstream repo, the history of the main branch has been removed. Forked from [develop](https://github.com/diggsweden/rest-api-profil-lint-processor/tree/develop) and merged with main to reintroduce history. Could be something missing in between.
* Delete all of the `node.js` application.
* I had Mr. GPT translate the rules from the `node.js` application to a `spectral.yaml` file and some external .js-functions.
* Test the application using the spectral cli and simple shell script instead.

## How to use

See [Spectral Instructions](https://github.com/stoplightio/spectral)

Quickstart would be (if executing in repo).
```
spectral lint <path/to/openapi.yaml>
```

## Accuracy

I have not verified that the rules match against the upstream project. Given that there has been a fair bit of chatGPT involved when translating, one should be a bit skeptical until verification has been done.

The DIGG CLI does not provide any easily machine-readable output, unlike the default Spectral CLI. If it did I could just have cross checked results against the DIGG CLI to verify that all rules behave the same. 

I am not that interested in the rules themselves however, I mostly just want to try them on [https://swelint.se/](https://swelint.se/). I do not intend to validate that the rules are correct until the DIGG tool has a better output format. It looks like DIGG is working on creating a [web API](https://github.com/diggsweden/rest-api-profil-lint-processor/tree/feature/MVP2), which reasonably must have a stricter output. I can just wait for this to be completed and verify against it. Or perhaps they update their CLI before that.

## License

Upstream repo contains three different (and conflicting?) licenses for some reason. I don't have the energy to try and figure out what that would imply. I refer to all of them here as well.

European Union Public Licence v. 1.2 (attached)

License: [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/)

License: [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/)
