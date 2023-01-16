const { Schema, model } = require('mongoose') ;

const recordingSchema = new Schema({
  // _id: { type: Schema.Types.ObjectId, required: true }, // need to solve this
  //therapistID: { type: Number, required: false }, you wouldn't want therapist id to be on recordings as the therapist might change and going back to change this for all recordings would be a pain in the ass.
  username: { type: String, required: true },
  partURL: { type: String, required: true },
  audioBlob: { type: String, required: true },
  word: { type: String, required: true },
},{
  collection: 'recordings2'
});

module.exports = model('Recording2', recordingSchema);