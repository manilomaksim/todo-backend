const Article = require("../models/Article");
const mongoose = require('mongoose');

module.exports.getUserArticles = async (req, res) => {
  const skip = +req.query.skip;
  const limit = +req.query.limit;

  try {
    const totalCount = await Article.find().count();
    const articles = await Article.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userInfo"
        },
      },
      {
        $unwind: "$userInfo",
      },
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          title: 1,
          text: 1,
          tags: 1,
          createdAt: 1,
          userInfo: { _id: 1, email: 1 }
        }
      }
    ]);
    res.send({
      articles,
      totalCount,
      skipped: skip,
      hasNextPage: totalCount > (skip + limit),
      success: true
    });
  }
  catch (err) {
    res.status(400).send({ success: false, message: err.toLocaleString() });
  }
}

module.exports.getArticle = async (req, res) => {
  const { articleId } = req.params;
  try {
    const article = await Article.findOne({_id: mongoose.Types.ObjectId(articleId)});
    res.send({
      article,
      success: true
    });
  }
  catch (err) {
    res.status(401).send({ success: false, message: err.toLocaleString() });
  }
}

module.exports.createArticle = async (req, res) => {
  const userId = req.user._id;
  const { title, text, tags } = req.body;

  const newArticle = new Article({ title, text, tags, userId: mongoose.Types.ObjectId(userId) });
  try {
    await newArticle.save();
    res.send({
      success: true
    });
  }
  catch (err) {
    res.status(400).send({ success: false, message: err.toLocaleString() });
  }
}
