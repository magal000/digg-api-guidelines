module.exports = (targetVal) => {
  const docs = targetVal.externalDocs;
  if (!docs || !docs.url || !docs.description) {
    return [{
      path: ['externalDocs'],
      message: 'externalDocs måste innehålla url och description.',
    }];
  }
  return [];
};
