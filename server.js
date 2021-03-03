const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan")
const mongojs = require("mongojs")
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"))

app.use(express.static("public"))
const databaseUrl = "workouts";
const collection = ["exercises"];
const db = mongojs(databaseUrl, collection);

db.on("error", error => {
    console.log("Database Error:", error);
});

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false 
})

app.use(require("./routes/html-routes.js"));

app.use(require("./routes/api-routes.js"));

app.listen(PORT, () => {
    console.log(`App running on ${PORT}!`)
})