const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.get("/", (req, res) => {
    res.json({ message: "Тест" });
});

app.listen(3002, (req, res) => {
    console.log("3002 порт работает");
});