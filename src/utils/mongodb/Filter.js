class Filter {

    createObjectFilter() {
        let filterObj = {}
        return filterObj
    }

    addAnd (value){
        return {
            $and: value
        }
    }

    addOr (value){
        return {
            $or: value
        }
    }

    addEq (value) {
        return {
            $eq: value
        }
    }

    addNoEq (value) {
        return {
            $not: {
                $eq: value
            }
        }
    }

    addGt (value) {
        return {
            $gt: value
        }
    }

    addGte (value) {
        return {
            $gte: value
        }
    }

    addLt (value) {
        return {
            $lt: value
        }
    }
    
    addLte (value) {
        return {
            $lte: value
        }
    }

    addDateRange (start_date, end_date) {

        let startDateISO = new Date(start_date);
        let endDateISO = new Date(end_date);

        const range = {
            $gte: new Date(startDateISO.toISOString()),
            $lte: new Date(endDateISO.toISOString())
        }
        return range
    }

    addIn (value) {
        return {
            $in: value
        }
    }
}

module.exports = Filter