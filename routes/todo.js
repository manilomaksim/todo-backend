const express = require("express");
const router = express.Router();

const {
    createTodo,
    deleteTodo,
    updateTodo,
    getAllTodos,
} = require("../controllers/todo");

router.get("/todo", getAllTodos);

router.post("/todo", createTodo);

router.put("/todo/:todoId", updateTodo);

router.delete("/todo/:todoId", deleteTodo);

module.exports = router;
