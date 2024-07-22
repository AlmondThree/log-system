function getPaginationMongo(page, limit) {
    let skipValue = 0;
    let paginationAttr

  if (page > 1) {
    skipValue = (page - 1) * limit;
  }

  paginationAttr = {
    skipValue: parseInt(skipValue),
    page: parseInt(page),
    limit : parseInt(limit)
  }

  return paginationAttr;
}

module.exports = {getPaginationMongo}