const router = require('express').Router();
const { saveUser, getAllUser, getUserByID, updateUserByID } = require('../controller/user')
const { validate, authenticate } = require('../middleware')
const { newUserValidation } = require('../helper')

router.get('/', authenticate, getAllUser);
router.get('/:id', authenticate, getUserByID);
router.post('/', authenticate, validate(newUserValidation), saveUser);
router.put('/:id', authenticate, validate(newUserValidation), updateUserByID);

module.exports = router;