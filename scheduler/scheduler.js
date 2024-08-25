const cron = require('node-cron');
const Task = require('../models/task.model');
const moment = require('moment');

// Schedule a job to run every minute
cron.schedule('* * * * *', async () => {
  const now = moment().toDate();

  try {
    const tasksToUpdate = await Task.find({
      completed: false,
      date_time: { $lte: now }
    });

    tasksToUpdate.forEach(async (task) => {
      console.log('-------------------------------');
      console.log(`Updating task: Task ID: ${task._id}, Name: ${task.name}, Date Time: ${task.date_time}, Completed: ${task.completed}`);
      
      // Update task status to 'completed'
      await Task.updateOne({ _id: task._id }, { completed: true });

      const updatedTask = await Task.findById(task._id);
      console.log('-------------------------------');
      console.log(`Updated task: Task ID: ${updatedTask._id}, Name: ${updatedTask.name}, Date Time: ${updatedTask.date_time}, Completed: ${updatedTask.completed}`);
    });

    if (tasksToUpdate.length === 0) {
        console.log('-------------------------------');
        console.log('No tasks to update')
    }
  } catch (error) {
    console.error('Error fetching or updating tasks:', error);
  }
});