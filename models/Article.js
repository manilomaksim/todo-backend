const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
    }
}, {
    timestamps: {
        createdAt: 'createdAt'
    }
});

module.exports = new mongoose.model("Article", ArticleSchema);
