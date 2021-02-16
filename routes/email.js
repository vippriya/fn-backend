const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

const host = "smtp.gmail.com"

const contactEmail = nodemailer.createTransport({
  host,
  port: 587,
  auth: {
    user: "priya@futurenoob.io",
    pass: "Lokam4nakosam",
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});
contactEmail.emailRoute = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message; 
  const mail = {
    from: name,
    to: "username@example.com",
    subject: "Contact Form Message",
    html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "failed" });
    } else {
      res.json({ status: "sent" });
    }
  });
}
router.get('/contact',contactEmail.emailRoute)
module.exports = contactEmail

