const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const path = require('path');
const auth = require('../controllers/auth.controller')    

router.post('/', auth.Register)

module.exports = router;