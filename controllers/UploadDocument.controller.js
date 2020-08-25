const UploadDocument = require("../models/UploadDocument.model.js");

exports.upload = (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req);
    // Create a Received Item Record
    const uploadItem = new UploadDocument({
        documentReq: req.files,
        documentName: req.body.documentName
    });

    // Upload Item to Server
    UploadDocument.upload(uploadItem, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Purchase Request."
            });
        else res.send(data);
    });
}