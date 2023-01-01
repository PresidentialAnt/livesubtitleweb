module.exports = app => {
  const recordings = require("../controllers/recording.controller.js");

  var router = require("express").Router();

  router.post("/recordings", recordings.create);
  router.get("/recordings", recordings.findAll);
  router.get("/recordings/:id", recordings.findOne);
  router.put("/recordings/:id", recordings.update);
  router.delete("/recordings/:id", recordings.delete);
  router.delete("/recordings", recordings.deleteAll);
  app.use("/api/recordings", router);
};
