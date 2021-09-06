const express = require("express");
const router = express.Router();

const {
    getAllUsers,
    createUser
} = require("../controllers/user");

router.get("/users", getAllUsers);

router.post("/user", createUser);

module.exports = router;
