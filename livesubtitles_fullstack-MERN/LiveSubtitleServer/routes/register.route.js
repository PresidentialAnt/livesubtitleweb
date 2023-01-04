const express = require('express');
const router = express.Router();
const auth = require('../controllers/users.controller')    

router.post('/', auth.Register)

module.exports = router;