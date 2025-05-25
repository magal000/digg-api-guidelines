module.exports = (targetVal) => {
  const regex = /^(?:[a-z0-9]+(?:_[a-z0-9]+)*|[a-z]+(?:[A-Z][a-z]*)*)$/;
  return regex.test(targetVal)
    ? []
    : [{ message: 'Parameternamn bör använda konsekvent snake_case eller camelCase' }];
};
