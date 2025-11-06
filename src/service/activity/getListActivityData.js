const { MongoClient } = require("mongodb");
const mongodbConnection = require("../../config/mongoDBUri");

const { getPaginationMongo } = require("../../utils/mongodb/getPaginationMongo");
const { responseHandler } = require("../../utils/mongodb/responseHandler");

const uri = mongodbConnection.connectDB("traxify_master");

async function getListActivityData(page, limit, paramFilter) {
    const client = new MongoClient(uri)

    let isPagination = false;
    let response;
    let totalData;
    let data;

    if ((page != null && parseInt(page)) && (limit != null && parseInt(limit))) {
        
        isPagination = true;
        paginationAttr = getPaginationMongo(page, limit)
    }

    try {
        if (isPagination) {
        data = await client
            .db("db_data")
            .collection("activity")
            .find(paramFilter)
            .limit(parseInt(paginationAttr['limit']))
            .skip(parseInt(paginationAttr['skipValue']))
            .toArray();

        totalData = await client
        .db("db_data")
        .collection("activity")
        .countDocuments(paramFilter)

        } else {
        data = await client
            .db("db_data")
            .collection("activity")
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
    }

    return response;

}

module.exports = {getListActivityData};