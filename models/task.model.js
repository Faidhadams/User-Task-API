const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  completed: {
    type: Boolean,
    required: false,
    default: false,
  },
  date_time: {
    type: Date,
    required: true,
  }
});

// Set the toJSON transformation - Remove __v field from JSON output
taskSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    delete ret.__v; 
    return ret;
  }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;