const express = require("express");
const fileUpload = require('express-fileupload');
var cors = require('cors')
const bodyParser = require("body-parser");

const app = express();

// enable files upload
app.use(fileUpload({
  createParentPath: true
}));

app.use(cors());

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// Include routes of Error List
require("./routes/ErrorList.routes.js")(app);

// Include routes of Audit Log
require("./routes/AuditLog.routes.js")(app);

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});