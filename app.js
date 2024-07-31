const express = require('express');
const app= express();
const bodyParser= require('body-parser');
const GetRoute= require('./Get.route');
const submitRoute= require ('./submit.route');
const port= process.env.PORT|| 5000;
const cors = require('cors');
const mongoose= require('mongoose');
const config = require('./DB');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/Get', GetRoute);
app.use('/submit', submitRoute);

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Database is connected ' + config.DB);
});

mongoose.connection.on('error', (err) => {
  console.log('Cannot connect to the database ' + err);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;