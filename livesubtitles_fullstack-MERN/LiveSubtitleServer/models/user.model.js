const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    _id: { type: Schema.Types.ObjectId, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true},
  email: { type: String, required: false },
  cplevel: { type: Number, requred: false}
});

userSchema.plugin(uniqueValidator, { message: 'Username already in use.' });
module.exports = mongoose.model('user', userSchema);