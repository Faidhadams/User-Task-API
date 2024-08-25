const User = require("../models/user.model");

// Get Many
const getManyUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
 // Get Single
const getSingleUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Post
const createUser =  async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Put
const updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        if (!user) {
            res.status(404).json({ message: "User does not exist" })
        }

        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Delete
const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            res.status(404).json({ message: "User does not exist" })
        }

        res.status(200).json({ message: 'User deleted' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getManyUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
}