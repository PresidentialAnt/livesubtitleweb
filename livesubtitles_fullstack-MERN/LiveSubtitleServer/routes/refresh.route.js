const express = require('express');
const router = express.Router();
const token = require('../controllers/token.controller')

router.get('/', token.TokenRefresher)

module.exports = router;