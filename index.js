const express = require('express')
const mongoose = require('mongoose');
const app = express()
const userRoute = require('./users/user.route');
const taskRoute = require('./tasks/task.route');
const scheduler = require('./scheduler/scheduler');

// middleware to accept json format
app.use(express.json());

// routing
app.use("/api/users", userRoute);
app.use("/api/users", taskRoute);

// Start the scheduler
scheduler;

// database connection
mongoose.connect("mongodb+srv://admin:admin123456@db.gigiq.mongodb.net/Node-API?retryWrites=true&w=majority&appName=DB")
.then(() => {
    console.log("connected to db");
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})
.catch(() => {
    console.log("error");
})