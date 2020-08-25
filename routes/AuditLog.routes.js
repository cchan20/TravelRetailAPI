module.exports = app => {
    const AuditLog = require("../controllers/AuditLog.controller.js");
  
    // Get log Summary by period
    app.get("/logSummary/from/:start_date/to/:end_date", AuditLog.getSummary);
  
    // Get log by period
    app.get("/log/from/:start_date/to/:end_date", AuditLog.getAll);
  };