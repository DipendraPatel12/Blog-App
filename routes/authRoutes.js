const express = require('express')
const router = express.Router();
const { registerUser, loginUser } = require('../Controllers/authController.js');
const { getAllPosts } = require('../Controllers/postController.js');

router.post('/register', registerUser);
router.post('/login', loginUser);



module.exports = router;