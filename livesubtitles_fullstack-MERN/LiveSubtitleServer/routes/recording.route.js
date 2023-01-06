const express = require('express');
const router = express.Router();
const recordings = require("../controllers/recording.controller.js");

router.post("/", recordings.create);
router.get("/", recordings.findAll);
router.get("/:id", recordings.findOne);
router.put("/:id", recordings.update);
router.delete("/:id", recordings.deleteOne);
router.delete("/", recordings.deleteAll);

module.exports = router;