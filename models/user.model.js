const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    }
});

// Set the toJSON transformation - Remove __v field from JSON output
userSchema.set('toJSON', {
    transform: function (doc, ret, options) {
      delete ret.__v; 
      return ret;
    }
  });

const User = mongoose.model("User", userSchema);

module.exports = User;