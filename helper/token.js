const jwt = require("jsonwebtoken")

exports.generateToken = (user) => {
  return jwt.sign({
    id: user._id,
    email: user.email,
    type: user.type
  }, process.env.API_KEY, { expiresIn: process.env.EXPIRE_TIME_KEY })
}