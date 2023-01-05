const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true},
  cplevel: { type: Number, required: true},
  refreshToken: { type: String, required: false}
},{
  collection: 'users'
}
);
module.exports = mongoose.model('users', userSchema);