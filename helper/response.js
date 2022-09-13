exports.response = ({ statusCode, data, error = null, list}) => {
  return ({
      message: statusCode === 200 ? "Success" : "Failed",
      error,
      status: statusCode,
      data,
      list
  })
}

