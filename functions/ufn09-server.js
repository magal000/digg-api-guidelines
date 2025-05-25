module.exports = (targetVal) => {
  const pattern = /[\\s_]/;
  if (typeof targetVal !== 'string') return [];

  return pattern.test(targetVal)
    ? [{
        message: "Blanksteg ' ' och understreck '_' SKALL INTE användas i URL:er med undantag av parameter-delen.",
      }]
    : [];
};
