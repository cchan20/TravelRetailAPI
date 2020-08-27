module.exports = app => {
    const AuditLog = require("../controllers/AuditLog.controller.js");
  
    // Get log Summary by period
    app.get("/log/newerror", AuditLog.getNewError);
  
    // Get log by period
    app.get("/log/from/:start_date/to/:end_date", AuditLog.getAll);

    // Get Error Count by period
    app.get("/log/error/count/:start_date/to/:end_date", AuditLog.getErrorCount);
  };