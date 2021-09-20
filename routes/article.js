const express = require("express");
const router = express.Router();

const {
    createArticle,
    getUserArticles,
    getArticle
} = require("../controllers/article");

const jwtAuth = require("../middlewares/jwt-auth");

router.get("/article", jwtAuth, getUserArticles);

router.get("/article/:articleId", jwtAuth, getArticle);

router.post("/article", jwtAuth, createArticle);

module.exports = router;
