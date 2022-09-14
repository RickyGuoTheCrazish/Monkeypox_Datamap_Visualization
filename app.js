// app.js
const dotenv = require('dotenv');  
const path = require('path');

const express = require('express');
// const connectDB = require('./config/db');
const mongoose = require("mongoose");

const app = express();

const port = process.env.PORT || 8000;
const publicPath = path.join(__dirname, '..', 'public');
dotenv.config(); 
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
// connectDB();


app.use(express.static(path.join(__dirname, "client", "build")))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => console.log(`Server running on port ${port}`));


