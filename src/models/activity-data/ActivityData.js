const Filter = require("../../utils/mongodb/Filter");

class ActivityData {
    constructor(
        id,
        activityName,
        activityCategory,
        authorizeRole,
    ){
        this.id = id,
        this.activityName = activityName,
        this.activityCategory = activityCategory,
        this.authorizeRole = authorizeRole
    }

    getObj() {
        return {
            id: this.id,
            activityName: this.activityName,
            activityCategory: this.activityCategory,
            authorizeRole: this.authorizeRole,
        }
    }

    createFilter() {
        const filterImpl = new Filter();

        let filterResult = filterImpl.createObjectFilter();

        if(this.id != null) {
            filterResult.id = filterImpl.addIn(this.id.split("|"));
        }

        if(this.activityName != null) {
            filterResult.activityName = filterImpl.addIn(this.activityName.split("|"));
        }

        if(this.activityCategory != null) {
            filterResult.activityCategory = filterImpl.addIn(this.activityCategory.split("|"));
        }

        if(this.authorizeRole != null) {
            filterResult.authorizeRole = filterImpl.addIn(this.authorizeRole.split("|"));
        }

        return filterResult;
    }
}

module.exports = ActivityData;