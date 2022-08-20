function getPage(page, limitForPage) {
  const offset = page * limitForPage - limitForPage;
  return offset;
}

module.exports = getPage;
