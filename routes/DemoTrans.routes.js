module.exports = app => {
    const DemoTrans = require("../controllers/DemoTrans.controller.js");
  
    // Start transaction
    app.post("/trans/start", DemoTrans.startTrans);
  
    // Get log by period
    app.get("/trans/all", DemoTrans.getAll);

    // End transaction
    app.get("/trans/check/:demo_id", DemoTrans.demoEnable);
  
    // End transaction
    app.get("/trans/:trans_id/end", DemoTrans.endTrans);
  
  };