const { response } = require('../helper')
const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  if (req.headers.authorization) {
    let token = req.headers.authorization;
    jwt.verify(token, process.env.API_KEY, (err, decoded) => {
        if(err) return res.send(response({error: "Token is invalid", data: null, statusCode: 401}))
        const user = {
          id: decoded.id,
          email: decoded.email,
          type: decoded.type
        }
        req.user = user;
        next();
    })
  } else {
    return res.send(response({error: "You should login first !!!", data: null, statusCode: 401}))
  }
}