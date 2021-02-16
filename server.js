const express = require('express');
const nodemailer = require("nodemailer");
const cors = require('cors');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const app = express();
require('dotenv').config({ path: './.env' });
const dbConnection = require('./db');
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



app.use('/gdrive', require('./routes/gdrive'));
app.use('/ibmFile', require('./routes/ibmFileStorage'));
app.use('/dropbox', require('./routes/dropbox'));
app.use('/application', require('./routes/application'));
app.use('/application_reference', require('./routes/applicationReference'));
app.use('/notification', require('./routes/notification'));
app.use('/product', require('./routes/product'));
app.use('/product_category', require('./routes/productCategory'));





//create send email endpoint
app.get("/send-email2", async (request, response) => {
  //  const name = req.body.name;
  //const email = req.body.email;
 // const message = req.body.message; 
  try {
    // create transporter object
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 2525,
      auth: {
         user: "ccc",
         pass: "cccc",
      }
    });

    const emailData = {
      from: "ccc",
      to: "ccccc",
      subject: "A test email",
      html: "<p> Hi there, this is a test email </p>"
    };

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: emailData.from,
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.html
    });

    response.send(`An email successfully sent to ${emailData.to}`);
  } catch (e) {
    console.log(e);
    response.send(`An error occurred while sending email`, e);
  }
});

//create send email endpoint
app.get("/send-email", async (request, response) => {
  try {
    // create transporter object
    let transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "30b7d33f3ac774",
        pass: "d75252e55f53d9"
      }
    });

    const emailData = {
      from: "sender@somecompany.com",
      to: "receiver-two@somecomapny.com",
      subject: "A test email",
      html: "<p> Hi there, this is a test email </p>"
    };

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: emailData.from,
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.html
    });

    response.send(`An email successfully sent to ${emailData.to}`);
  } catch (e) {
    console.log(e);
    response.send(`An error occurred while sending email`+e);
  }
});




app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
