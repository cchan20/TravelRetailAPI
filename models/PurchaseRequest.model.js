const sql = require("./db.js");

// constructor
const PurchaseRequest = function (request) {
  this.id = request.id;
  this.pr_no = request.pr_no;
  this.pr_vendor = request.pr_vendor;
  this.delivery_date = request.delivery_date;
  this.pr_item = request.pr_item;
  this.pr_quantity = request.pr_quantity;
  this.pr_item_rate = request.pr_item_rate;
  this.pr_remain_qty = request.pr_remain_qty;
  this.po_no = request.po_no;
  this.invoice_no = request.invoice_no;
  this.receipt_no = request.receipt_no;
  this.status = request.status;
  this.created_date = request.created_date;
  this.updated_date = request.updated_date;
};

PurchaseRequest.create = (newRequest, result) => {
  sql.query("INSERT INTO purchaserequestlist SET ?", newRequest, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created purchase request: ", { id: res.insertId, ...newRequest });
    result(null, { id: res.insertId, ...newRequest });
  });
};

PurchaseRequest.findById = (pr_no, result) => {
  sql.query(`SELECT * FROM purchaserequestlist WHERE pr_no = "${pr_no}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found pr_no: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Purchase Request with the PR No.
    result({ kind: "not_found" }, null);
  });
};

PurchaseRequest.getAll = result => {
  sql.query("SELECT * FROM purchaserequestlist WHERE pr_remain_qty > 0 ORDER BY po_no", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Purchase Request: ", res);
    result(null, res);
  });
};

PurchaseRequest.findByDeliveryDate = (delivery_date, result) => {
  sql.query(`SELECT * FROM purchaserequestlist WHERE delivery_date = "${delivery_date}" AND pr_remain_qty > 0 ORDER BY po_no`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Purchase Request: ", res);
      result(null, res);
      return;
    }

    // not found Purchase Request with the PR No.
    result({ kind: "not_found" }, null);
  });
};

// PurchaseRequest.updateReceiveStatus = (pr_no, request, result) => {
//   sql.query(
//     "UPDATE purchaserequestlist SET email = ?, name = ?, active = ? WHERE id = ?",
//     [customer.email, customer.name, customer.active, id],
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }

//       if (res.affectedRows == 0) {
//         // not found Customer with the id
//         result({ kind: "not_found" }, null);
//         return;
//       }

//       console.log("updated customer: ", { id: id, ...customer });
//       result(null, { id: id, ...customer });
//     }
//   );
// };

PurchaseRequest.remove = (pr_no, result) => {
  sql.query("DELETE FROM purchaserequestlist WHERE pr_no = ?", pr_no, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found PR with the pr_no
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted purchase request with id: ", pr_no);
    result(null, res);
  });
};

PurchaseRequest.removeAll = result => {
  sql.query("DELETE FROM purchaserequestlist", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} purchase request`);
    result(null, res);
  });
};

module.exports = PurchaseRequest;