module.exports = (targetVal, _opts, paths, otherValues) => {
  const results = [];

  if (!targetVal || typeof targetVal !== 'object') {
    return results;
  }

  const jsonLikeMediaTypes = [
    /^application\/json(;.*)?$/i,
    /^application\/.*\+json(;.*)?$/i,
  ];

  const hasJsonContent = Object.keys(targetVal).some((contentType) =>
    jsonLikeMediaTypes.some((pattern) => pattern.test(contentType))
  );

  if (!hasJsonContent) {
    results.push({
      message:
        'Datamodellen för en representation BÖR beskrivas med JSON enligt senaste versionen, RFC 8259.',
    });
  }

  return results;
};
