const PurchaseRequest = require("../models/PurchaseRequest.model.js");

// Create and Save a new Purchase Request
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Purchase Request
    const purchaserequest = new PurchaseRequest({
        pr_no: req.body.pr_no,
        pr_vendor: req.body.pr_vendor,
        delivery_date: req.body.delivery_date,
        pr_item: req.body.pr_item,
        pr_quantity: req.body.pr_quantity,
        pr_remain_qty: req.body.pr_quantity,
        pr_item_rate: req.body.pr_item_rate,
        po_no: req.body.po_no,
        invoice_no: req.body.invoice_no,
        receipt_no: req.body.receipt_no,
        status: req.body.status,
    });

    // Save Purchase Request in the database
    PurchaseRequest.create(purchaserequest, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Purchase Request."
            });
        else res.send(data);
    });
};

// Retrieve all Purchase Request from the database.
exports.findAll = (req, res) => {
    PurchaseRequest.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Purchase Request."
            });
        else res.send(data);
    });
};

// Find a single Purchase Request with a PR No.
exports.findOne = (req, res) => {
    PurchaseRequest.findById(req.params.pr_no, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Purchase Request with PR No. ${req.params.pr_no}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Purchase Request with PR No. " + req.params.pr_no
                });
            }
        } else res.send(data);
    });
};

// Retrieve all Purchase Request by date from the database.
exports.findAllByDate = (req, res) => {
    PurchaseRequest.findByDeliveryDate(req.params.delivery_date, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Purchase Request with Delivery Date ${req.params.delivery_date}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Purchase Request with Delivery Date " + req.params.delivery_date
                });
            }
        } else res.send(data);
    });
};

// Delete a Purchase Request with a PR No.
exports.delete = (req, res) => {
    PurchaseRequest.remove(req.params.pr_no, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Purchase Request with PR No. ${req.params.pr_no}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Purchase Request with PR No. " + req.params.pr_no
            });
          }
        } else res.send({ message: `Purchase Request was deleted successfully!` });
      });
};

// Delete all Purchase Request from the database.
exports.deleteAll = (req, res) => {
    PurchaseRequest.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Purchase Request."
          });
        else res.send({ message: `All Purchase Request were deleted successfully!` });
      });
};