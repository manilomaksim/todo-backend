const Todo = require("../models/Todo");

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

module.exports.deleteTodo = async (req, res) => {
  const { _id } = req.params;
  try {
    await Todo.deleteOne({_id});
    res.send({
      success: true
    });
  }
  catch (err){
    res.error(err.toLocaleString());
  }
}
