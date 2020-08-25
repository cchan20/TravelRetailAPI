const sql = require("./db.js");

// constructor
const ErrorList = function (request) {
  this.log_id = request.log_id;
  this.error_type = request.error_type;
  this.error_message = request.error_message;
  this.creator = request.creator;
};

ErrorList.create = (newRequest, result) => {
  sql.query("INSERT INTO TravelRetailErrorList SET ?", newRequest, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created new error item: ", { ...newRequest });
    result(null, { ...newRequest });
  });
};

ErrorList.findById = (log_id, result) => {
  sql.query(`SELECT * FROM TravelRetailErrorList WHERE log_id = "${log_id}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found log_id: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Error Item with the Log ID
    result({ kind: "not_found" }, null);
  });
};

ErrorList.getAll = result => {
  sql.query("SELECT * FROM TravelRetailErrorList", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Error List: ", res);
    result(null, res);
  });
};

ErrorList.remove = (log_id, result) => {
  sql.query("DELETE FROM TravelRetailErrorList WHERE log_id = ?", log_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Error Item with the log_id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted error item with log_id: ", log_id);
    result(null, res);
  });
};

ErrorList.removeAll = result => {
  sql.query("DELETE FROM TravelRetailErrorList", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} error item`);
    result(null, res);
  });
};

module.exports = ErrorList;