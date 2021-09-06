const Todo = require("../models/Todo");
const mongoose = require('mongoose');

module.exports.getAllTodos = async (req, res) => {

  try {
    const todos = await Todo.find();
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
  const { title } = req.body;
  const newTodo = new Todo({title, isDone: false});
  try {
    await newTodo.save();
    res.send({
      success: true
    });
  }
  catch (err) {
    res.error(err.toLocaleString());
  }
}

module.exports.updateTodo = async (req, res) => {
  const { todoId } = req.params;
  const { isDone } = req.body;
  console.log(await Todo.findOne({ _id: mongoose.Types.ObjectId(todoId) })
  ,isDone)
   try {
     await Todo.updateOne({ _id: mongoose.Types.ObjectId(todoId) }, { $set: { isDone: isDone } })
     res.send({
       success: true
     });
   }
   catch (err){
     res.error(err.toLocaleString());
   }
}

module.exports.deleteTodo = async (req, res) => {
  const { todoId } = req.params;
  try {
    await Todo.deleteOne({ _id: mongoose.Types.ObjectId(todoId)});
    res.send({
      success: true
    });
  }
  catch (err){
    res.error(err.toLocaleString());
  }
}
