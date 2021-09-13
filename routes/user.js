const express = require("express");
const router = express.Router();

const {
    getAllUsers,
    createUser,
    login
} = require("../controllers/user");

router.get("/users", getAllUsers);

router.post("/users/login", login);

router.post("/users", createUser);

module.exports = router;
