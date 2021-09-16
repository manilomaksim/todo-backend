const express = require("express");
const router = express.Router();

const {
    createArticle,
    getUserArticles
} = require("../controllers/article");

const jwtAuth = require("../middlewares/jwt-auth");

router.get("/article", jwtAuth, getUserArticles);

router.post("/article", jwtAuth, createArticle);

module.exports = router;
