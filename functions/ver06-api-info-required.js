module.exports = (targetVal) => {
  if (targetVal && typeof targetVal === 'object' && '/api-info' in targetVal) {
    return [];
  }

  return [{
    message: 'Information om ett API SKALL tillgängliggöras via resursen "/api-info".',
  }];
};
