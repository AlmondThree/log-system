const express = require("express");
const router = express.Router();

//System Logs
const SystemLogObject = require("../../models/systems-log/systemLogObject")
const {
  insertSystemLog,
} = require("../../service/systems-log/pushSystemLog");
const {
    getListSystemLog,
  } = require("../../service/systems-log/getListSystemLog");

//Session Logs
const SessionLogObject = require('../../models/session-log/SessionLogObject');
const { insertSessionLog } = require('../../service/session-log/pushSessionLog');
const { getListSessionLog } = require('../../service/session-log/getListSessionLog');

//Interface Logs
const InterfaceLogObject = require('../../models/interface-log/InterfaceLogObject');
const { insertInterfaceLog } = require('../../service/interface-log/pushInterfaceLog');
const { getListInterfaceLog } = require('../../service/interface-log/getListInterfaceLog');

router.route("/systems").post(async (req, res) => {
  let resBody = {};
  let resStatus = 500;

  const reqBody = req.body;
  let reqBodyObj = {};

  if (reqBody != null) {
    let systemLogObj = new SystemLogObject(
      reqBody["id_activity"],
      reqBody["timestamp"],
      reqBody["user_id"],
      reqBody["username"],
      reqBody["roles"],
      reqBody["device_id"],
      reqBody["session_id"]
    );

    reqBodyObj = systemLogObj.getObj()
  }

  const response = await insertSystemLog(reqBodyObj);

  if (response["status"] == 200) {
    resStatus = 200;
    resBody = {
      message: response["message"]
    }
  } else {
    resStatus = 400;
    resBody = {
      message: response["message"]
    }
  }

  res.status(resStatus);
  res.send(resBody);
});

router.route("/systems").get(async (req, res) => {
    const page = req.query.page;
    const limit = req.query.limit;

    const reqBody = req.query
    
    let data;
    let filter;

    if (reqBody != null) {
      let systemLogObjImpl = new SystemLogObject(
        reqBody["id_activity"],
        reqBody["timestamp"],
        reqBody["user_id"],
        reqBody["username"],
        reqBody["roles"],
        reqBody["device_id"],
        reqBody["session_id"],
        reqBody["start_date"],
        reqBody["end_date"]
      );

      filter = systemLogObjImpl.createFilter()

    }
    const response = await getListSystemLog(page, limit, filter)

    data = (response.responseStatus == 200) ? response.data : response;

    res.status(response.responseStatus)
    res.send(data);
})

router.route("/session").post(async (req, res) => {
  let resBody = {};
  let resStatus = 500;

  const reqBody = req.body;
  let reqBodyObj = {};

  if (reqBody != null) {
    let sessionLogObjImpl = new SessionLogObject(
      reqBody["id_activity"],
      reqBody["timestamp"],
      reqBody["user_id"],
      reqBody["username"],
      reqBody["roles"],
      reqBody["access_token"],
      reqBody["exp_access_token"],
      reqBody["device_id"],
      reqBody["is_active"]
    );

    reqBodyObj = sessionLogObjImpl.getObj()
  }

  const response = await insertSessionLog(reqBodyObj);

  if (response["status"] == 200) {
    resStatus = 200;
    resBody = {
      message: response["message"]
    }
  } else {
    resStatus = 400;
    resBody = {
      message: response["message"]
    }
  }

  res.status(resStatus);
  res.send(resBody);
});

router.route("/session").get(async (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;

  const reqBody = req.query
  
  let data;
  let filter;

  if (reqBody != null) {
    let sessionLogObjImpl = new SessionLogObject(
      reqBody["id_activity"],
      reqBody["timestamp"],
      reqBody["user_id"],
      reqBody["username"],
      reqBody["roles"],
      reqBody["access_token"],
      reqBody["exp_access_token"],
      reqBody["refresh_token"],
      reqBody["exp_refresh_token"],
      reqBody["device_id"],
      reqBody["is_active"],
      reqBody["start_date"],
      reqBody["end_date"]
    );

    filter = sessionLogObjImpl.createFilter()

  }
  const response = await getListSessionLog(page, limit, filter)

  data = (response.responseStatus == 200) ? response.data : response;

  res.status(response.responseStatus)
  res.send(data);
})

router.route("/interface").post(async (req, res) => {
  let resBody = {};
  let resStatus = 500;

  const reqBody = req.body;
  let reqBodyObj = {};

  if (reqBody != null) {
    let interfaceLogObjImpl = new InterfaceLogObject(
      reqBody["id_activity"],
      reqBody["timestamp"],
      reqBody["user_id"],
      reqBody["access_token"],
      reqBody["request_payload"],
      reqBody["response_payload"],
      reqBody["response_time"]
    );

    reqBodyObj = interfaceLogObjImpl.getObj()
  }

  const response = await insertInterfaceLog(reqBodyObj);

  if (response["status"] == 200) {
    resStatus = 200;
    resBody = {
      message: response["message"]
    }
  } else {
    resStatus = 400;
    resBody = {
      message: response["message"]
    }
  }

  res.status(resStatus);
  res.send(resBody);
});

router.route("/interface").get(async (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;

  const reqBody = req.query
  
  let data;
  let filter;

  if (reqBody != null) {
    let interfaceLogObjImpl = new InterfaceLogObject(
      reqBody["id_activity"],
      reqBody["timestamp"],
      reqBody["user_id"],
      reqBody["access_token"],
      reqBody["request_payload"],
      reqBody["response_payload"],
      reqBody["response_time"],
      reqBody["start_date"],
      reqBody["end_date"]
    );

    filter = interfaceLogObjImpl.createFilter()

  }
  const response = await getListInterfaceLog(page, limit, filter)

  data = (response.responseStatus == 200) ? response.data : response;

  res.status(response.responseStatus)
  res.send(data);
})

module.exports = router;
