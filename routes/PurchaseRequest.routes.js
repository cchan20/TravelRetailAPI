module.exports = app => {
    const PurchaseRequest = require("../controllers/PurchaseRequest.controller.js");
  
    // Create a new PR
    app.post("/purchaseRequest", PurchaseRequest.create);
  
    // Retrieve all PR
    app.get("/purchaseRequest", PurchaseRequest.findAll);

    // Delete all Purchase Request
    app.delete("/purchaseRequest", PurchaseRequest.deleteAll);
  
    // Retrieve a single PR with PR No.
    app.get("/purchaseRequest/:pr_no", PurchaseRequest.findOne);
  
    // Delete a Purchase Request with PR No.
    app.delete("/purchaseRequest/:pr_no", PurchaseRequest.delete);
  
    // Retrieve a PR List By Delivery Date
    app.get("/purchaseRequest/date/:delivery_date", PurchaseRequest.findAllByDate);
  };