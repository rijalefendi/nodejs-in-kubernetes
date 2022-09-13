const router = require('express').Router();
const { login } = require('../controller/auth')
const { validate, authenticate } = require('../middleware')
const { loginBodyValidation, refreshTokenBodyValidation } = require('../helper')

router.post("/login", validate(loginBodyValidation), login);
router.post("/refresh-token", validate(refreshTokenBodyValidation), refreshToken);
router.delete("/logout", authenticate, validate(refreshTokenBodyValidation), logout);

module.exports = router;