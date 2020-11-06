const sql = require("./db.js");

// constructor
const DemoTrans = function (request) {
    this.trans_id = request.trans_id;
    this.demo_id = request.demo_id;
    this.status = request.status;
    this.start_time = request.start_time;
    this.end_time = request.end_time;
};

DemoTrans.startTrans = (newRequest, result) => {
    sql.query(`INSERT INTO demoTrans SET ?`, newRequest, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created new demo transaction: ", { ...newRequest });
        result(null, { ...newRequest });
    });
};

DemoTrans.getAll = (result) => {
    sql.query(`SELECT * FROM demoTrans`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Audit Log: ", res);
            result(null, res);
            return;
        }

        // not found Audit Log with date
        result({ kind: "not_found" }, null);
    });
};

DemoTrans.demoEnable = (demo_id, result) => {
    sql.query(`SELECT COUNT(*) as running FROM IncidentManagementDemo.demoTrans WHERE demo_id = "${demo_id}" AND status = "Started"`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found demo_id: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Error Item with the Log ID
      result({ kind: "not_found" }, null);
    });
  };

DemoTrans.endTrans = (tran_id, result) => {
    sql.query(`Update demoTrans SET end_time = CURRENT_TIMESTAMP WHERE trans_id = "${tran_id}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Transaction ID: ", res);
            result(null, res);
            return;
        }

        // not found Tranasction ID
        result({ kind: "not_found" }, null);
    });
};

module.exports = DemoTrans;