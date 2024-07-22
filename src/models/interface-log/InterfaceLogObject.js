const Filter = require("../../utils/mongodb/Filter");

class InterfaceLogObject {
  constructor(
    id_activity,
    timestamp,
    user_id,
    access_token,
    request_payload,
    response_payload,
    response_time,
    start_date,
    end_date
  ) {
    (this.id_activity = id_activity),
      (this.timestamp = timestamp),
      (this.user_id = user_id),
      (this.access_token = access_token),
      (this.request_payload = request_payload),
      (this.response_payload = response_payload),
      (this.response_time = response_time),
      (this.start_date = start_date),
      (this.end_date = end_date);
  }

  getObj() {
    const dateTimestamp = new Date();

    let object = {
      id_activity: this.id_activity,
      timestamp: this.timestamp == null ? dateTimestamp : this.timestamp,
      user_id: this.user_id,
      access_token: this.access_token,
      request_payload: this.request_payload,
      response_payload: this.response_payload,
      response_time: this.response_time,
    };

    return object;
  }

  createFilter() {
    const filterImpl = new Filter();

    let filterResult = filterImpl.createObjectFilter();

    if (this.id_activity != null) {
      filterResult.id_activity = filterImpl.addIn(this.id_activity.split("|"));
    }
    if (this.start_date != null && this.end_date != null) {
      let startDateFilter = this.start_date;
      let endDateFilter = this.end_date;
      filterResult.timestamp = filterImpl.addDateRange(startDateFilter, endDateFilter);
    }
    if (this.user_id != null) {
      filterResult.user_id = filterImpl.addIn(this.user_id.split("|"));
    }
    if (this.access_token != null) {
      filterResult.access_token = filterImpl.addIn(this.access_token.split("|"));
    }
    if (this.request_payload != null) {
      filterResult.request_payload = filterImpl.addIn(this.request_payload.split("|"));
    }
    if (this.response_payload != null) {
      filterResult.response_payload = filterImpl.addIn(this.response_payload.split("|"));
    }
    if (this.response_time != null) {
      filterResult.response_time = filterImpl.addIn(this.response_time.split("|"));
    }

    return filterResult;
  }
}

module.exports = InterfaceLogObject;
