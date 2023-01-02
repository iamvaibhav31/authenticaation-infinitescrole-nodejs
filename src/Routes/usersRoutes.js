const usercontroller = require('../Controllers/userController')
const auth = require('../Middlewares/auth')
const express = require('express');
const router = express.Router()


router.post('/register', usercontroller.register)
router.post('/login', usercontroller.login)
router.get('/userProfile/:id', auth.authenticateToken, usercontroller.userProfile)

module.exports = router;

// authenticateToken