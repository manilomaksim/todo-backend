const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    isDone: {
        type: Boolean,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    }
}, {
    timestamps: {
        createdAt: 'createdAt'
    }
});

module.exports = new mongoose.model("Todo", TodoSchema);
