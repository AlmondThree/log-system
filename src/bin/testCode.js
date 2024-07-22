const Filter = require('../utils/mongodb/Filter')

const filterImpl = new Filter()

const filterObj = filterImpl.createObjectFilter()

const addFilter = filterImpl.addAnd([{name: "test"}, {name: "test2"}])

filterObj.name = addFilter

console.log(filterObjs)