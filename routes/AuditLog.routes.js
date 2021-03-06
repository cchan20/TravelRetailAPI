module.exports = app => {
  const AuditLog = require("../controllers/AuditLog.controller.js");

  // Get log Summary by period
  app.get("/log/newerror", AuditLog.getNewError);

  // Get log by period
  app.get("/log/from/:start_date/to/:end_date", AuditLog.getAll);

  // Get Error Count by period
  app.get("/log/error/count/:start_date/to/:end_date", AuditLog.getErrorCount);

  // Get Error Count of HRM Demo by period
  app.get("/log/error/count/hrm/:duration", AuditLog.getHRMErrorCount);

  // Get Error Count of Customer Service Demo by period
  app.get("/log/error/count/cs/:duration", AuditLog.getCSErrorCount);

  // Get Error Count of Invoice Processing Demo by period
  app.get("/log/error/count/am/:duration", AuditLog.getAMErrorCount);

  // Get Error Count of Revenue Management Demo  by period
  app.get("/log/error/count/rm/:duration", AuditLog.getRMErrorCount);
};