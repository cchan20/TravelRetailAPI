const AuditLog = require("../models/AuditLog.model.js");

// Retrieve all Audit Log from the database.
exports.getSummary = (req, res) => {
    AuditLog.getSummary(req.params.start_date, req.params.end_date, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Audit Log Summary with Period ${req.params.start_date} to ${req.params.end_date}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving Audit Log Summary with Period ${req.params.start_date} to ${req.params.end_date}.`
                });
            }
        } else res.send(data);
    });
};

// Find a single Audit Log with a Date Period
exports.getAll = (req, res) => {
    AuditLog.getAll(req.params.start_date, req.params.end_date, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Audit Log with Period ${req.params.start_date} to ${req.params.end_date}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving Audit Log with Period ${req.params.start_date} to ${req.params.end_date}.`
                });
            }
        } else res.send(data);
    });
};