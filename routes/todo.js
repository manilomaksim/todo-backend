const express = require("express");
const router = express.Router();

const {
    createTodo,
    deleteTodo,
    getAllTodos,
} = require("../controllers/todo");

router.get("/todo", getAllTodos);

router.post("/todo", createTodo);

router.delete("/todo/:todoId", deleteTodo);

module.exports = router;
