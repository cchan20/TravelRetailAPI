const nodeMailer = require('nodemailer');
const mailConfig = require("../config/mail.config.js");

// Create a transporter to mail engine
const transporter = nodeMailer.createTransport({
    host: mailConfig.HOST,
    port: mailConfig.PORT,
    secure: mailConfig.SECURE,
    auth: {
        user: mailConfig.USER,
        pass: mailConfig.PASSWORD
    }
  });

  module.exports = transporter;