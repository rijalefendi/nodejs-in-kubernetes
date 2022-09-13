const { response } = require('../helper')
exports.validate = (schema) => (req, res, next) => {
  const {
    error
  } = schema.validate(req.body);
  if (error) {
    res.send(response({error: error.details[0].message, data: null, statusCode: 422}))
  } else {
    next();
  }
};