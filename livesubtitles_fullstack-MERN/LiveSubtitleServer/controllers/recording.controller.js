const { default: mongoose } = require("mongoose");
require("../models/recording.model")
const Recording = mongoose.model("Recording")

// Create and Save a new recording
const create = async (req, res) => {
  // Validate request
  if (!req.body.patientID) {
    res.status(400).send({ message: "Must contain patient ID and partial URL minimum." });
    return;
  }

  // Create recording
  const recording = new Recording({
    therapistID: req.body.therapistID,
    patientID: req.body.patientID,
    fullname: req.body.fullname,
    audioBlob: req.body.audioBlob,
    partURL: req.body.partURL
  });
  // Save recording in the database
  recording
    .save(recording)
    .then(() => {
      res.json("Recording added");
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the recording."
      });
    });
};

// Retrieve all Recordings from the database.
const findAll = async(req, res) => {
  const partURL = req.query.partURL;
  var condition = partURL ? { title: { $regex: new RegExp(partURL), $options: "i" } } : {};

  Recording.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving recordings."
      });
    });
};

// Find a single recording of given id
const findOne = async(req, res) => {
  const id = req.params.id;

  Recording.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found recording with ID " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving recording with ID=" + id });
    });
};

// Update a recording by the ID in the request
const update = async(req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Recording.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update recording with ID=${id}. Invalid ID`
        });
      } else res.send({ message: "Recording was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating recording with id=" + id
      });
    });
};

// Delete a Recording with the specified id in the request
const deleteOne = async(req, res) => {
  const id = req.params.id;

  Recording.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete recording with ID:${id}. ID invalid`
        });
      } else {
        res.send({
          message: "Recording was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete recording of ID:" + id
      });
    });
};

// Wipe all recordings, nuclear option
const deleteAll = async(req, res) => {
  Recording.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} recordings deleted.`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while wiping the database."
      });
    });
};

// Find all Recordings of Specific Therapist
const findAllTherapist = async(req, res, tID) => {
  Recording.find({ therapistID: tID })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving data."
      });
    });
};

module.exports = {create,findOne,findAll,update,deleteOne,deleteAll,findAllTherapist}