// app.js
require("dotenv").config()
const path = require('path');

const express = require('express');
const connectDB = require('./config/db');


const app = express();

const port = process.env.PORT || 8000;
const publicPath = path.join(__dirname, '..', 'public');


connectDB();


app.use(express.static(path.join(__dirname, "client", "build")))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => console.log(`Server running on port ${port}`));


