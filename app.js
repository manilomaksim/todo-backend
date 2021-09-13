const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = 3000;
require("dotenv").config();

const todoRoutes = require("./routes/todo");
const userRoutes = require("./routes/user");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/", todoRoutes);
app.use("/", userRoutes);

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, () => {
    console.log("Successfuly connected to database!");

    app.listen(port, () => {
        console.log(`Listening to http://localhost:${port}`);
    });
});


