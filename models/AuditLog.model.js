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

AuditLog.getNewError = result => {
  sql.query(`Select log_id, status, message from auditlog where log_id not in (Select log_id from TravelRetailErrorList) group by log_id`, (err, res) => {
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

AuditLog.getErrorCount = (start_date, end_date, result) => {
  sql.query(`SELECT count(log_id), log_id, message FROM TravelRetail_demo.auditlog where log_id <> '0' and created_date between "${start_date}" AND "${end_date}" group by log_id`, (err, res) => {
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

AuditLog.getHRMErrorCount = (duration_time, result) => {
  sql.query(`SELECT IncidentManagementDemo.errorLog.*, a.* from IncidentManagementDemo.errorLog inner Join (SELECT  process_id, count(1) as "Count" from  HRMDemo.auditlog where HRMDemo.auditlog.status = 'Error' and HRMDemo.auditlog.created_date >= now() - interval "${duration_time}" minute group by  process_id) as a On IncidentManagementDemo.errorLog.processID=a.process_id`, (err, res) => {
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

AuditLog.getCSErrorCount = (duration_time, result) => {
  sql.query(`SELECT IncidentManagementDemo.errorLog.*, a.* from IncidentManagementDemo.errorLog inner Join (SELECT  process_id, count(1) as "Count" from  CustomerServiceDemo.auditlog where CustomerServiceDemo.auditlog.status = 'Error' and CustomerServiceDemo.auditlog.created_date >= now() - interval "${duration_time}" minute group by  process_id) as a On IncidentManagementDemo.errorLog.processID=a.process_id`, (err, res) => {
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

AuditLog.getAMErrorCount = (duration_time, result) => {
  sql.query(`SELECT IncidentManagementDemo.errorLog.*, a.* from IncidentManagementDemo.errorLog inner Join (SELECT  process_id, count(1) as "Count" from  InvoiceProcessingDemo.auditlog where InvoiceProcessingDemo.auditlog.status = 'Error' and InvoiceProcessingDemo.auditlog.created_date >= now() - interval "${duration_time}" minute group by  process_id) as a On IncidentManagementDemo.errorLog.processID=a.process_id`, (err, res) => {
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

AuditLog.getRMErrorCount = (duration_time, result) => {
  sql.query(`SELECT IncidentManagementDemo.errorLog.*, a.* from IncidentManagementDemo.errorLog inner Join (SELECT  process_id, count(1) as "Count" from  RevenueManagement.auditlog where RevenueManagement.auditlog.status = 'Error' and RevenueManagement.auditlog.created_date >= now() - interval "${duration_time}" minute group by  process_id) as a On IncidentManagementDemo.errorLog.processID=a.process_id`, (err, res) => {
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