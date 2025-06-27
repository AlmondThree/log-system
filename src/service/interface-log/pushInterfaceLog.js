const { MongoClient } = require("mongodb");
const mongodbConnection = require("../../config/mongoDBUri");

const uri = mongodbConnection.connectDB("traxify_master");

async function insertInterfaceLog(logObj) {
  const client = new MongoClient(uri);
  const response = {
    status: 200,
    message: "Sending data to database"
  };

  if (typeof logObj === "object") {
    //push data
    try {
      client
        .db("db_logs")
        .collection("api_logs")
        .insertOne(logObj, function (err, res) {
          if (err) {
            response.status = 400;
            response.message = err;
          }
        })
    } catch (e) {
      console.log(e);
    }finally {
      await client.close();
    }
  }
  return response;
}

module.exports = {
    insertInterfaceLog
};
