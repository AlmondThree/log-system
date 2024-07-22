const Filter = require("../../utils/mongodb/Filter");

class SystemLogObject {
  constructor(
    id_activity,
    timestamp,
    user_id,
    username,
    roles,
    device_id,
    session_id,
    start_date,
    end_date
  ) {
    (this.id_activity = id_activity),
      (this.timestamp = timestamp),
      (this.user_id = user_id),
      (this.username = username),
      (this.roles = roles),
      (this.device_id = device_id),
      (this.session_id = session_id),
      (this.start_date = start_date),
      (this.end_date = end_date);
  }

  getObj() {
    const dateTimestamp = new Date();

    let object = {
      id_activity: this.id_activity,
      timestamp: this.timestamp == null ? dateTimestamp : this.timestamp,
      user_id: this.user_id,
      username: this.username,
      roles: this.roles,
      device_id: this.device_id,
      session_id: this.session_id,
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
    if (this.username != null) {
      filterResult.username = filterImpl.addIn(this.username.split("|"));
    }
    if (this.roles != null) {
      filterResult.roles = filterImpl.addIn(this.roles.split("|"));
    }
    if (this.device_id != null) {
      filterResult.device_id = filterImpl.addIn(this.device_id.split("|"));
    }
    if (this.session_id != null) {
      filterResult.session_id = filterImpl.addIn(this.session_id.split("|"));
    }

    return filterResult;
  }
}

module.exports = SystemLogObject;
