const AuditLog = require("../models/AuditLog.model.js");

// Retrieve Audit Log new error from the database.
exports.getNewError = (req, res) => {
    AuditLog.getNewError((err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    errorCode: `404`,
                    message: `Not found Audit Log New Error.`
                });
            } else {
                res.status(500).send({
                    errorCode: `500`,
                    message: `Error retrieving Audit Log New Error.`
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
                    errorCode: `404`,
                    message: `Not found Audit Log with Period ${req.params.start_date} to ${req.params.end_date}.`
                });
            } else {
                res.status(500).send({
                    errorCode: `500`,
                    message: `Error retrieving Audit Log with Period ${req.params.start_date} to ${req.params.end_date}.`
                });
            }
        } else res.send(data);
    });
};

// Find a Audit Log Error count with a Date Period
exports.getErrorCount = (req, res) => {
    AuditLog.getErrorCount(req.params.start_date, req.params.end_date, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    errorCode: `404`,
                    message: `Not found Audit Log with Period ${req.params.start_date} to ${req.params.end_date}.`
                });
            } else {
                res.status(500).send({
                    errorCode: `500`,
                    message: `Error retrieving Audit Log with Period ${req.params.start_date} to ${req.params.end_date}.`
                });
            }
        } else res.send(data);
    });
};