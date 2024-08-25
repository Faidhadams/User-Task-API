const express = require("express");
const { createTask, getManyTasks, getSingleTask, updateTask, deleteTask } = require("./task.controller");
const router = express.Router();

router.get('/:userId/tasks/:taskId', getSingleTask);

router.get('/:userId/tasks', getManyTasks);

router.post('/:userId/tasks', createTask);

router.put('/:userId/tasks/:taskId', updateTask);

router.delete('/:userId/tasks/:taskId', deleteTask);

module.exports = router;