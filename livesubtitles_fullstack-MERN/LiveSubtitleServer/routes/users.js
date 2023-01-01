const express = require('express');
const router = express.Router();
const path = require('path');
const auth = require('../controllers/auth.controller')    

router.get('/', auth.getUsers)

module.exports = router;