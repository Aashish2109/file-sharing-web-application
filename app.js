const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true })); 
const path = require('path');

dotenv.config({ path: './config.env' });
require('./db/conn');
app.use(express.json());


// Linking Router Files

app.use(require('./router/auth'));
const PORT = process.env.PORT;

const itemsRouter = require("./routes/items");
app.use("/api/v1/items", itemsRouter);

// path,callback
app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});





