const Filter = require("../../utils/mongodb/Filter");

class SessionLogObject {
  constructor(
    id_activity,
    timestamp,
    user_id,
    username,
    roles,
    access_token,
    exp_access_token,
    refresh_token,
    exp_refresh_token,
    device_id,
    is_active,
    start_date,
    end_date
  ) {
    (this.id_activity = id_activity),
      (this.timestamp = timestamp),
      (this.user_id = user_id),
      (this.username = username),
      (this.roles = roles),
      (this.access_token = access_token),
      (this.exp_access_token = exp_access_token),
      (this.refresh_token = refresh_token),
      (this.exp_refresh_token = exp_refresh_token),
      (this.device_id = device_id),
      (this.is_active = is_active),
      (this.start_date = start_date),
      (this.end_date = end_date);
  }

  getObj() {
    const dateTimestamp = new Date();
    const expAccessTokenIso = new Date(this.exp_access_token);
    const expRefreshTokenIso = new Date(this.exp_refresh_token);

    let object = {
      id_activity: this.id_activity,
      timestamp: this.timestamp == null ? dateTimestamp : this.timestamp,
      user_id: this.user_id,
      username: this.username,
      roles: this.roles,
      access_token: this.access_token,
      exp_access_token: expAccessTokenIso.toISOString(),
      refresh_token: this.refresh_token,
      exp_refresh_token: expRefreshTokenIso.toISOString(),
      device_id: this.device_id,
      is_active: this.is_active,
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
      filterResult.timestamp = filterImpl.addDateRange(
        startDateFilter,
        endDateFilter
      );
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
    if (this.access_token != null) {
      filterResult.access_token = filterImpl.addIn(
        this.access_token.split("|")
      );
    }
    if (this.exp_access_token != null) {
      filterResult.exp_access_token = filterImpl.addIn(
        this.exp_access_token.split("|")
      );
    }
    if (this.refresh_token != null) {
        filterResult.refresh_token = filterImpl.addIn(
          this.refresh_token.split("|")
        );
      }
      if (this.exp_refresh_token != null) {
        filterResult.exp_refresh_token = filterImpl.addIn(
          this.exp_refresh_token.split("|")
        );
      }
    if (this.device_id != null) {
      filterResult.device_id = filterImpl.addIn(this.device_id.split("|"));
    }
    if (this.is_active != null) {
      filterResult.is_active = filterImpl.addIn(this.is_active.split("|"));
    }

    return filterResult;
  }
}

module.exports = SessionLogObject;
