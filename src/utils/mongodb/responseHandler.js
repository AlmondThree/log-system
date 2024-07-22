function responseHandler(responseAttr) {
  let response;
  try {
    const isPagination = responseAttr["isPagination"];
    const limit = responseAttr["limit"];
    const page = responseAttr["page"];
    const totalData = responseAttr["totalData"];
    const data = responseAttr["data"];

    let lastPage = Math.ceil(totalData / parseInt(limit));

    if (data != null && data.length > 0 && isPagination == true) {
      response = {
        responseStatus: 200,
        responseMessage: "Success",
        data: {
          current_page: parseInt(page),
          last_page: lastPage,
          size: data.length,
          total_data: totalData,
          data: data,
        },
      };
    } else if (data != null && data.length > 0 && isPagination == false) {
      response = {
        responseStatus: 200,
        responseMessage: "Success",
        data: data,
      };
    } else {
      response = {
        responseStatus: 200,
        responseMessage: "Success",
        data: {
          message: "Data not found",
        },
      };
    }
  } catch(e) {
    response = {
        responseStatus: 400,
        responseMessage: "Bad Request",
        data: {
            status: 'Error',
            message: e
        }
    }
  }

  return response;
}

module.exports = { responseHandler };
