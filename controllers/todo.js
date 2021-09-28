const Todo = require("../models/Todo");
const mongoose = require('mongoose');

module.exports.getUserTodos = async (req, res) => {
  const userId = req.user._id;

  try {
    const todos = await Todo.find({ userId });
    res.send({
      todos,
      success: true
    });
  }
  catch (err) {
    res.status(401).send({ success: false, message: err.toLocaleString() });
  }
}

module.exports.createTodo = async (req, res) => {
  const userId = req.user._id;
  const { title } = req.body;

  const newTodo = new Todo({ title, isDone: false, userId });
  try {
    await newTodo.save();
    res.send({
      newTodo,
      success: true
    });
  }
  catch (err) {
    res.status(400).send({ success: false, message: err.toLocaleString() });
  }
}

module.exports.updateTodo = async (req, res) => {
  const userId = req.user._id;
  const { todoId } = req.params;
  const { isDone } = req.body;
   try {
     await Todo.updateOne({ _id: mongoose.Types.ObjectId(todoId), userId }, { $set: { isDone } })
       res.send({
         success: true
     });
   }
   catch (err){
     res.code(400).send(err.toLocaleString());
   }
}

module.exports.deleteTodo = async (req, res) => {
  const userId = req.user._id;
  const { todoId } = req.params;
  try {
    // res.code(200).send({ message: 'Error!!!'});
    await Todo.deleteOne({ _id: mongoose.Types.ObjectId(todoId), userId });
    res.send({
      success: true
    });
  }
  catch (err){
    res.code(400).send(err.toLocaleString());
  }
}
