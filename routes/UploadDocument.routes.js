module.exports = app => {
    const UploadDocument = require("../controllers/UploadDocument.controller.js");
  
    // Create a new Received Item Record
    app.post("/uploadShippingNote", UploadDocument.upload);
  };