module.exports = app => {
  const ReceivedItemRecord = require("../controllers/ReceivedItemRecord.controller.js");

  // Create a new Received Item Record
  app.post("/receivedItemRecord", ReceivedItemRecord.create);
};