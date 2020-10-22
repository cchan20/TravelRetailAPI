const DemoTrans = require("../models/DemoTrans.model.js");

// Start a new Transaction
exports.startTrans = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create an transaction item
  const transItem = new DemoTrans({
    trans_id: req.body.trans_id,
    demo_id: req.body.demo_id,
    status: "Started",
    start_time: "CURRENT_TIMESTAMP",
  });

  // Save Transaction Item in the database
  DemoTrans.startTrans(transItem, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Transaction Item."
      });
    else res.send(data);
  });
};

// Retrieve all Transaction Item from the database.
exports.getAll = (req, res) => {
  DemoTrans.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Tranasction Items."
      });
    else res.send(data);
  });
};

// End a transaction
exports.endTrans = (req, res) => {
  DemoTrans.endTrans(req.params.trans_id, (err, data) => {
      if (err) {
          if (err.kind === "not_found") {
              res.status(404).send({
                  errorCode: `404`,
                  message: `Not found Transaction ID ${req.params.trans_id}.`
              });
          } else {
              res.status(500).send({
                  errorCode: `500`,
                  message: `Error retrieving Transaction with ID ${req.params.trans_id}.`
              });
          }
      } else res.send(data);
  });
};