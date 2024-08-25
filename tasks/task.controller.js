const Task = require("../models/task.model");
const User = require("../models/user.model");
const moment = require('moment-timezone');

// Function to parse the custom date format with time zone
function parseDate(dateStr, timeZone = 'UTC') {
    // Parse the date-time string and convert to the specified time zone
    return moment.tz(dateStr, 'YYYY-MM-DD HH:mm:ss', timeZone).toDate();
  }

// Get Single task for user
const getSingleTask = async (req, res) => {
    try {
        const userId = req.params.userId;
        const taskId = req.params.taskId;
        
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
          res.status(404).json({ message: 'User not found' });
        }
        
        // Find the task
        const task = await Task.findOne({ _id: taskId, userId });
        if (!task) {
          res.status(404).json({ message: 'Task not found' });
        }
        
        res.status(200).json(task);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};

// Get Many tasks for user
const getManyTasks = async (req, res) => {
    try {
        const userId = req.params.userId;
        
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
          res.status(404).json({ message: 'User not found' });
        }
        
        // Find the tasks for the user
        const task = await Task.find({ userId });
        if (!task) {
          res.status(404).json({ message: 'No tasks for this user' });
        }
        
        res.status(200).json(task);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};

// Create task for user
const createTask = async (req, res) => {
    try {
        const userId = req.params.userId;
    
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
          res.status(404).json({ message: 'User not found' });
        }
    
        // Convert the date_time string to a Date object
        const dateTime = parseDate(req.body.date_time);
    
        // Create a new task
        const newTask = new Task({
          userId,
          name: req.body.name,
          description: req.body.description,
          completed: req.body.completed || false,
          date_time: dateTime
        });
    
        const savedTask = await newTask.save();
        res.status(200).json(savedTask);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};

// Update task for user
const updateTask = async (req, res) => {
    try {
        const userId = req.params.userId;
        const taskId = req.params.taskId;
        
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
          res.status(404).json({ message: 'User not found' });
        }
        
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            req.body,
          );
        
        if (!updatedTask) {
          res.status(404).json({ message: 'Task not found' });
        }

        const updatedPayload = await Task.findById(taskId);
        
        res.status(200).json(updatedPayload);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

// Delete task for user
const deleteTask = async (req, res) => {
    try {
        const userId = req.params.userId;
        const taskId = req.params.taskId;
        
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
          res.status(404).json({ message: 'User not found' });
        }
        
        // Delete the task
        const deletedTask = await Task.findByIdAndDelete(taskId);
        if (!deletedTask) {
          res.status(404).json({ message: 'Task not found' });
        }
        
        res.status(200).json({ message: 'Task deleted' });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

module.exports = {
    getSingleTask,
    getManyTasks,
    createTask,
    updateTask,
    deleteTask
}