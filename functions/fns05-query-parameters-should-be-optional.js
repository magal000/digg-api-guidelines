module.exports = (targetVal) => {
  return targetVal === false
    ? []
    : [{ message: 'Sökparametrar BÖR vara frivilliga' }];
};
