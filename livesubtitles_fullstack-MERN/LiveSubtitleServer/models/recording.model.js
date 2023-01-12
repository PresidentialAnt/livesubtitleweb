const { Schema, model } = require('mongoose') ;

const recordingSchema = new Schema({
  // _id: { type: Schema.Types.ObjectId, required: true }, // need to solve this
  therapistID: { type: Number, required: true },
  patientID: { type: Number, required: true },
  fullname: { type: String, required: false },
  partURL: { type: String, required: true },
  audioBlob: { type: String, required: true },
  word: { type: String, required: true },
},{
  collection: 'recordings'
});

module.exports = model('Recording', recordingSchema);