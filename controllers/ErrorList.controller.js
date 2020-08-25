const ErrorList = require("../models/ErrorList.model.js");

// Create and Save a new Error Item
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create an error item
    const errorlist = new ErrorList({
        log_id: req.body.log_id,
        error_type: req.body.error_type,
        error_message: req.body.error_message,
        creator: req.body.creator,
    });

    // Save Error Item in the database
    ErrorList.create(errorlist, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Error Item."
            });
        else res.send(data);
    });
};

// Retrieve all Error Item from the database.
exports.findAll = (req, res) => {
    ErrorList.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Error Item."
            });
        else res.send(data);
    });
};

// Find a single Error Item with a Log ID.
exports.findOne = (req, res) => {
    ErrorList.findById(req.params.log_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Error Item with Log ID ${req.params.log_id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Error Item with Log ID " + req.params.log_id
                });
            }
        } else res.send(data);
    });
};

// Delete a Error Item with a Log ID
exports.delete = (req, res) => {
    ErrorList.remove(req.params.log_id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Error Item with Log ID ${req.params.log_id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Error Item with Log ID  " + req.params.log_id
            });
          }
        } else res.send({ message: `Error Item was deleted successfully!` });
      });
};

// Delete all Error Item from the database.
exports.deleteAll = (req, res) => {
    ErrorList.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Error Item."
          });
        else res.send({ message: `All Error Item were deleted successfully!` });
      });
};