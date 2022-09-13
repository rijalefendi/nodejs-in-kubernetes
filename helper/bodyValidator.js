const Joi = require("joi");

newUserValidation =  Joi.object().keys({
  name: Joi.string().required().label("Name"),
  type: Joi.string().required().label("Type"),
  email: Joi.string().email().required().label("Email"),
  password: Joi.string().min(8).alphanum().required().label("Password"),
})
loginBodyValidation =  Joi.object().keys({
  email: Joi.string().email().required().label("Email"),
  password: Joi.string().min(8).alphanum().required().label("Password")
})

refreshTokenBodyValidation =  Joi.object().keys({
  refresh_token: Joi.string().required().label("Refresh Token"),
  registration_id: Joi.string().required().label("Registration ID")
})

module.exports = {
  newUserValidation,
  loginBodyValidation,
  refreshTokenBodyValidation
}