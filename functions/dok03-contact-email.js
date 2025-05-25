module.exports = (targetVal) => {
  if (!targetVal || !targetVal.email || targetVal.email.toString().trim() === '') {
    return [{
      message: 'Contact-objektet saknar "email".'
    }];
  }
  return [];
};
