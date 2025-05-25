module.exports = (targetVal) => {
  return /^[a-zA-Z]/.test(targetVal)
    ? []
    : [{ message: 'Sökparametrar SKALL starta med en bokstav' }];
};
