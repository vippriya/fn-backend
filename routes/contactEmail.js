const express = require('express');
const cors = require('cors');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const app = express();
const nodemailer = require("nodemailer");

require('dotenv').config({ path: './.env' });
const dbConnection = require('../db');
// db connectivity
dbConnection();
const port = process.env.PORT || 3000;
app.use(fileUpload({}));

app.use(cors());

app.use(express.json());
// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'p*prlsti*re7Lj@Chlse',
    resave: true,
    saveUninitialized: true
  })
);



app.use('/gdrive', require('./gdrive'));
app.use('/ibmFile', require('./ibmFileStorage'));
app.use('/dropbox', require('./dropbox'));
app.use('/application', require('./application'));
app.use('/application_reference', require('./applicationReference'));
app.use('/notification', require('./notification'));
app.use('/product', require('./product'));
app.use('/product_category', require('./productCategory'));


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
