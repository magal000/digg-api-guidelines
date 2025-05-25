/**
 * @description Enforces consistent casing (camelCase or snake_case) within each schema object.
 */

module.exports = (targetVal, _opts, paths) => {
  const result = [];
  const stateLog = {};
  const casingStates = [];

  // RegExps for casing detection
  const snakeCasePattern = /^[a-z]+(?:_[a-z]+)*$/;
  const camelCasePattern = /^([a-z]+)(?:([A-Z]{1})([a-z]+))+$/;
  const lowercasePattern = /^[a-z]+$/;

  // Walk through all schema objects in $.components.schemas
  for (const [schemaKey, schemaObject] of Object.entries(targetVal || {})) {
    const properties = schemaObject?.properties || {};
    const stateKey = schemaKey;

    stateLog[stateKey] = [];

    for (const [propertyName] of Object.entries(properties)) {
      if (lowercasePattern.test(propertyName)) {
        continue; // lowerCase only is allowed in both, so it is ignored
      }

      if (snakeCasePattern.test(propertyName)) {
        stateLog[stateKey].push({
          schemaKey,
          propertyName,
          camel: false,
          snake: true,
        });
      } else if (camelCasePattern.test(propertyName)) {
        stateLog[stateKey].push({
          schemaKey,
          propertyName,
          camel: true,
          snake: false,
        });
      }
    }
  }

  // Check for mixed casing styles within the same schema
  for (const [schemaKey, states] of Object.entries(stateLog)) {
    const hasCamel = states.some((s) => s.camel);
    const hasSnake = states.some((s) => s.snake);

    if (hasCamel && hasSnake) {
      for (const state of states) {
        result.push({
          message:
            'Inom ett API SKALL namnsättningen vara konsekvent, dvs blanda inte camelCase och snake_case.',
          path: [...paths.path, schemaKey, 'properties', state.propertyName],
        });
      }
    }
  }

  return result;
};
