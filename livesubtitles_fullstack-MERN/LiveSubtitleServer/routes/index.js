const express = require('express');
const router = express.Router();
const path = require('path');
const { nextTick } = require('process');

router.get('/', (req, res)=>{ //returns users as json
    res.sendFile('../index.html')
})

module.exports = router;