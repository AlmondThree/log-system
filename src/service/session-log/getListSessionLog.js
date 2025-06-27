const { MongoClient } = require("mongodb");
const mongodbConnection = require("../../config/mongoDBUri");

const { getPaginationMongo } = require("../../utils/mongodb/getPaginationMongo");
const { responseHandler } = require("../../utils/mongodb/responseHandler");

const uri = mongodbConnection.connectDB("traxify_master");

async function getListSessionLog(paramPage, paramLimit, paramFilter) {
  const client = new MongoClient(uri);

  const page = parseInt(paramPage)
  const limit = parseInt(paramLimit)

  let isPagination = false;
  let response;
  let totalData;
  let data;

  if ((page != null && Number.isInteger(page)) && (limit != null && Number.isInteger(limit))) {
    isPagination = true;
    paginationAttr = getPaginationMongo(page, limit)
  }

  // console.log(paramFilter)

  try {
    if (isPagination) {
      data = await client
        .db("db_logs")
        .collection("session_logs")
        .find(paramFilter)
        .limit(parseInt(paginationAttr['limit']))
        .skip(parseInt(paginationAttr['skipValue']))
        .toArray();

      totalData = await client
      .db("db_logs")
      .collection("session_logs")
      .countDocuments(paramFilter)

    } else {
      data = await client
        .db("db_logs")
        .collection("session_logs")
        .find(paramFilter)
        .toArray();
    }

    const responseAttr = {
      isPagination: isPagination,
      page: page,
      limit: limit,
      totalData: totalData,
      data: data
    }

    response = responseHandler(responseAttr)

  } catch (e) {
    response = {
      responseStatus: 400,
      responseMessage: e,
    };
  }finally {
    await client.close();
  }

  return response;
}

module.exports = {
    getListSessionLog
};
