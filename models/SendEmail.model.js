const mail = require("./mail.js");

// constructor
const SendEmail = function (request) {
    this.from = request.from;
    this.to = request.to;
    this.subject = request.subject;
    this.text = request.text;
    this.html = request.html;
    this.attachments = request.attachments;
};

SendEmail.sendCompletedEmail = (newRequest, result) => {
    mail.sendMail(newRequest, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log('Message %s sent: %s', res.messageId, res.response);
        result(null, res);
    })
};

module.exports = SendEmail;