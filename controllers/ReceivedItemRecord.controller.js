const ReceivedItemRecord = require("../models/ReceivedItemRecord.model.js");
var uuid = require('node-uuid');

// Create and Save a new Received Item Record
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var arr = new Array(32);

    // Create a Received Item Record
    const receivedItem = new ReceivedItemRecord({
        id: uuid.v1(),
        pr_no: req.body.pr_no,
        pr_quantity: req.body.pr_quantity,
        received_quantity: req.body.received_quantity,
        rejected_quantity: req.body.rejected_quantity,
        shipping_no: req.body.shipping_no,
        shipping_attachment: req.body.shipping_attachment,
        receiving_note: req.body.receiving_note,
        rejected_note: req.body.rejected_note,
    });

    // Save Received Item Record in the database
    ReceivedItemRecord.create(receivedItem, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Purchase Request."
            });
        else res.send(data);
    });
};