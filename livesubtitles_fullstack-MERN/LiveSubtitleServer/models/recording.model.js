const { Schema, model } = require('mongoose') ;

const recordingSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  therapistID: { type: Number, required: true },
  patientID: { type: Number, required: true },
  fullname: { type: String, required: false },
  partURL: { type: String, required: true },
});

module.exports = model('Recording', recordingSchema);