const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = {
  googleID: String
};

mongoose.Schema = new Schema(userSchema);
mongoose.model('users', userSchema);
