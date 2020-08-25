const SendEmail = require("../models/SendEmail.model.js");


exports.sendReceivedItemEmail = (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var attachmentsList = null
    if (req.body.attachment_name != ""){
        attachmentsList = {path: 'uploads/'+req.body.attachment_name};
    }

    // Create a Purchase Request
    const completeCollectItemEmail = new SendEmail({
        from: "rpa.explora@gmail.com", // sender address
        to: "rpa.explora@gmail.com", // list of receivers
        subject: req.body.subject, // Subject line
        text: req.body.text, // plain text body
        html: req.body.html,
        attachments: attachmentsList // html body
    });

    // Save Purchase Request in the database
    SendEmail.sendCompletedEmail(completeCollectItemEmail, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while sending email."
            });
        else res.send(data);
    });
};