module.exports = app => {
    const ErrorList = require("../controllers/ErrorList.controller.js");
  
    // Create a new PR
    app.post("/errorList", ErrorList.create);
  
    // Retrieve all PR
    app.get("/errorList", ErrorList.findAll);

    // Delete all Purchase Request
    app.delete("/errorList", ErrorList.deleteAll);
  
    // Retrieve a single PR with PR No.
    app.get("/errorList/:log_id", ErrorList.findOne);
  
    // Delete a Purchase Request with PR No.
    app.delete("/errorList/:log_id", ErrorList.delete);
  };