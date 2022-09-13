const bcrypt = require('bcrypt')
const User = require("../model/user")
const { response, generateRandomString } = require('../helper')

saveUser = async (req, res) => {
  try {
    if (req.user.type !== "admin") {
      return res.send(response({data: null, statusCode: 403, error: `You can not access this endpoint!!!`}))
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    refreshToken = generateRandomString(30)
    registrationID = generateRandomString(30)
    refreshTokens = [
      { refresh_token: refreshToken, registration_id: registrationID }
    ]
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      type: req.body.type
    })
    const data = await newUser.save();
    return res.send(response({data, statusCode: 200}))
  } catch (error) {
    return res.send(response({data: null, statusCode: 500, error}))
  }
}

getAllUser = async(req, res) => {
  try {
    if (req.user.type !== "admin") {
      return res.send(response({data: null, statusCode: 403, error: `You can not access this endpoint!!!`}))
    }
    const params = {};
    if (req.query.name !== undefined) {
      params.name = req.query.name
    }
    const list = await User.find(params)
    return res.send(response({list, statusCode: 200}))
  } catch (error) {
    return res.send(response({data: null, statusCode: 500, error}))
  }
}

getUserByID = async(req, res) => {
  try {
    const data = await User.findById(req.params.id)
    if (!data) {
      return res.send(response({data: null, statusCode: 404, error: `User with id ${req.params.id} not found`}))
    }
    if (req.user.type === "user") {
      if (req.params.id !== req.user.id) {
        return res.send(response({data: null, statusCode: 403, error: `You can not access this endpoint!!!`}))
      }
    }
    return res.send(response({data, statusCode: 200}))
  } catch (error) {
    return res.send(response({data: null, statusCode: 500, error}))
  }
}
updateUserByID = async(req, res) => {
  try {
    const existingUser = await User.findById(req.params.id)
    if (!existingUser) {
      return res.send(response({data: null, statusCode: 404, error: `User with id ${req.params.id} not found`}))
    }
    if (req.user.type === "user") {
      return res.send(response({data: null, statusCode: 403, error: `You can not access this endpoint!!!`}))
    }
    const updatedParams  = {
      "_id": existingUser._id
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const updatedValue = {
      $set: {
        "name": req.body.name,
        "type": req.body.type,
        "email": req.body.email,
        "password": hashPassword
      }
    }
    const data = await User.findOneAndUpdate(updatedParams, updatedValue, { new: true})
    return res.send(response({data, statusCode: 200}))
  } catch (error) {
    return res.send(response({data: null, statusCode: 500, error}))
  }
}

module.exports = {
  saveUser,
  getAllUser,
  getUserByID,
  updateUserByID
}