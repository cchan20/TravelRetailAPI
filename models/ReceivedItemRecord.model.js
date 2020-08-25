const sql = require("./db.js");

// constructor
const ReceivedItemRecord = function (request) {
  this.id = request.id;
  this.pr_no = request.pr_no;
  this.pr_quantity = request.pr_quantity;
  this.received_quantity = request.received_quantity;
  this.rejected_quantity = request.rejected_quantity;
  this.shipping_no = request.shipping_no;
  this.shipping_attachment = request.shipping_attachment;
  this.receiving_note = request.receiving_note;
  this.rejected_note = request.rejected_note;
  // this.created_date = request.created_date;
  // this.updated_date = request.updated_date;
};

ReceivedItemRecord.create = (newRequest, result) => {
  sql.query("INSERT INTO receiveditemrecord SET ?", newRequest, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created receieved item record: ", { id: res.insertId, ...newRequest });

    sql.query(`UPDATE purchaserequestlist SET pr_remain_qty = pr_remain_qty - "${newRequest.received_quantity}" WHERE pr_no = "${newRequest.pr_no}"`, (err2, res2) => {

      if (err2) {
        console.log("error: ", err2);
        result(err2, null);
        return;
      }

      console.log("Update Success.");
      result(null, { id: res.insertId, ...newRequest });
    });

  });
};

module.exports = ReceivedItemRecord;