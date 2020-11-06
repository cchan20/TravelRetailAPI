const SendEmail = require("../models/SendEmail.model.js");


exports.sendAMDemoEmail = (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var attachmentsList = null
    if (req.body.attachment_name != ""){
        attachmentsList = {path: 'uploads/PLID#30939959 PO#699259 CA.pdf'};
    }

    // Create a Purchase Request
    const completeCollectItemEmail = new SendEmail({
        from: "rpa.explora@gmail.com", // sender address
        to: "rpa.explora@gmail.com", // list of receivers
        subject: "[Document] New Invoice PO#699259", // Subject line
        text: "", // plain text body
        html: "",
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