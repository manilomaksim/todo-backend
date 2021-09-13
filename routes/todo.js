const express = require("express");
const router = express.Router();

const {
    createTodo,
    deleteTodo,
    updateTodo,
    getUserTodos
} = require("../controllers/todo");

const jwtAuth = require("../middlewares/jwt-auth");

router.get("/todo", jwtAuth, getUserTodos);

router.post("/todo", jwtAuth, createTodo);

router.put("/todo/:todoId", jwtAuth, updateTodo);

router.delete("/todo/:todoId", jwtAuth, deleteTodo);

module.exports = router;
