# REST API-profil - Lint Processor (RAP-LP)
A work-in-progress linter for the swedish rest api-profile specification
[REST API-profil](https://dev.dataportal.se/rest-api-profil)


## How To run a the application

1. Clone the repository
2. Navigate to the cloned repository
3. Install the dependencies: `npm install`
4. Run the application: `ts-node-esm src/app.ts -f Path to the YAML file`
   a: example: `ts-node-esm src/app.ts -f apis/dok-api.yaml -c DokRules -l rap-lp.log  -a true`
   b: `jest tests/dok.test.ts  (to run test)`
5. For help and how you can run the application: `ts-node-esm src/app.ts --help` 
6. Run Jest tests: Jest
## How To Contribute

1. Create a new feature branch:
`git checkout -b feature/feature-ver01`
Replace feature-ver01 with the name of the rule you will work on.
2. Commit and push the changes you have made:
`git push origin feature/feature-ver01` 
3. Go to GitHub and submit a pull request to the main branch
4. You need to add a reviewer via GitHub. The reviewer will review your pull request and decide whether to accept it.
5. If your pull request is accepted, your changes will be merged into the main branch of the project.

