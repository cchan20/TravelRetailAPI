const sql = require("./db.js");

// constructor
const AuditLog = function (request) {
  this.id = request.id;
  this.log_id = request.log_id;
  this.process_id = request.process_id;
  this.status = request.status;
  this.message = request.message;
  this.created_date = request.created_date;
  this.start_date = request.start_date;
  this.end_date = request.end_date;
};

AuditLog.getSummary = (start_date, end_date, result) => {
  sql.query(`SELECT process_id, status, COUNT(DISTINCT(log_id)) AS 'count' FROM auditlog WHERE created_date BETWEEN "${start_date}" AND "${end_date}" GROUP BY status, process_id ORDER BY process_id;`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Audit Log: ", res);
      result(null, res);
      return;
    }

    // not found Audit Log with date
    result({ kind: "not_found" }, null);
  });
};

AuditLog.getAll = (start_date, end_date, result) => {
  sql.query(`SELECT * FROM auditlog WHERE created_date BETWEEN "${start_date}" AND "${end_date}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Audit Log: ", res);
      result(null, res);
      return;
    }

    // not found Audit Log with date
    result({ kind: "not_found" }, null);
  });
};

module.exports = AuditLog;