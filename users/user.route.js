const express = require("express");
const { getManyUsers, getSingleUser, createUser, updateUser, deleteUser } = require("./user.controller");
const router = express.Router();

router.get('/', getManyUsers);

router.get('/:id', getSingleUser);

router.post('/', createUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = router;