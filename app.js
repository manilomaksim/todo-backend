const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = 3000;

const todoRoutes = require("./routes/todo");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/", todoRoutes);


mongoose.connect("mongodb://localhost/todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Successfuly connected to database!");

        app.listen(port, () => {
            console.log(`Listening to http://localhost:${port}`);
        });
    });


