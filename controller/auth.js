const bcrypt = require('bcrypt')
const { response, generateToken, generateRandomString } = require('../helper')
const User = require("../model/user")

login = async(req, res) => {
  try {
    const existingUser = await User.findOne({"email": req.body.email })
    if (!existingUser) {
      return res.send(response({data: null, statusCode: 404, error: `User with email ${req.body.email} not found`}))
    }
    const verifiedPassword = await bcrypt.compare(
			req.body.password,
			existingUser.password
		);
		if (!verifiedPassword) return res.send(response({data: null, statusCode: 401, error: "Invalid password"}))
    newRefreshToken = generateRandomString(30)
    newRegisID = generateRandomString(30)
    
    const updatedValue = {
      $push: {
        refresh_tokens: {
          refresh_token: newRefreshToken,
          registration_id: newRegisID
        }
      }
    }
    const result = await User.findOneAndUpdate({"_id": existingUser._id}, updatedValue, { new: true})
    const data = {};
    data._id = result._id
    data.name = result.name
    data.type = result.type
    data.email = result.email
    data.password = result.password
    data.access_token = generateToken(existingUser)
    data.refresh_tokens = [ { refresh_token: newRefreshToken, registration_id: newRegisID }]
    return res.send(response({data, statusCode: 200}))
  } catch (error) {
    return res.send(response({data: null, statusCode: 500, error}))
  }

}
logout = async(req, res) => {
  try {
    const params = {
      "refresh_token": req.body.refresh_token,
      "registration_id": req.body.registration_id
    }
    const existingUser = await User.findOne({"refresh_tokens": {$elemMatch: params } })
    if (!existingUser) {
      return res.send(response({data: null, statusCode: 404, error: `User with refresh token ${req.body.refresh_token} not found`}))
    }
    const updatedParams  = {
      "_id": existingUser._id,
      "refresh_tokens": {$elemMatch: 
        params
      } 
    }
    const updatedValue = { $pull: { 'refresh_tokens': params } }
    await User.findOneAndUpdate(updatedParams, updatedValue, { new: true})
    return res.send(response({data: null, statusCode: 200}))
  } catch (error) {
    return res.send(response({data: null, statusCode: 500, error }))
  }

}

refreshToken = async(req, res) => {
  try {
    const params = {
      "refresh_token": req.body.refresh_token,
      "registration_id": req.body.registration_id
    }
    const existingUser = await User.findOne({"refresh_tokens": {$elemMatch: params } })
    if (!existingUser) {
      return res.send(response({data: null, statusCode: 404, error: `User with refresh token ${req.body.refresh_token} not found`}))
    }
    const updatedParams  = {
      "_id": existingUser._id,
      "refresh_tokens": {$elemMatch: 
        params
      } 
    }
    newRefreshToken = generateRandomString(30)
    newRegisID = generateRandomString(30)
    const updatedValue = {
      $set: {
        "refresh_tokens.$.refresh_token": newRefreshToken,
        "refresh_tokens.$.registration_id": newRegisID
      }
    }
    const result = await User.findOneAndUpdate(updatedParams, updatedValue, { new: true})
    const data = {};
    data._id = result._id
    data.name = result.name
    data.type = result.type
    data.email = result.email
    data.password = result.password
    data.access_token = generateToken(existingUser)
    data.refresh_tokens = [ { refresh_token: newRefreshToken, registration_id: newRegisID }]
    return res.send(response({data, statusCode: 200}))
  } catch (error) {
    return res.send(response({data: null, statusCode: 500, error }))
  }

}

module.exports = {
  login,
  logout,
  refreshToken
}