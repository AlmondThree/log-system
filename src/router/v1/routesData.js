const express = require("express");
const routerData = express.Router();

const ActivityData = require('../../models/activity-data/ActivityData')
const { getListActivityData } = require('../../service/activity/getListActivityData')

routerData.route('/activities').get(async (req, res) => {
    const page = req.query.page;
    const limit = req.query.limit;

    const reqBody = req.query
    
    let data;
    let filter;

    if (reqBody != null) {
      let activityDataImpl = new ActivityData(
        reqBody["id"],
        reqBody["activityName"],
        reqBody["activityCategory"],
        reqBody["authorizeRole"],
      );

      filter = activityDataImpl.createFilter()

    }

    const response = await getListActivityData(page, limit, filter)

    data = (response.responseStatus == 200) ? response.data : response;

    res.status(response.responseStatus)
    res.send(data);
})

module.exports = routerData