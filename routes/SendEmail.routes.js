module.exports = app => {
    const SendEmail = require("../controllers/SendEmail.controller.js");
  
    // Create a new Received Item Record
    app.post("/sendCompletePO", SendEmail.sendReceivedItemEmail);
  };