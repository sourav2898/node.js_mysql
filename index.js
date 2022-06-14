// "use strict";

const express = require("express");
const config = require("./config");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const mysql = require("mysql");
const conn = mysql.createConnection({
  host: config.host,
  user: config.sql.user,
  password: config.sql.password,
  database: config.sql.database,
  multipleStatements: true,
});

conn.connect((err) => {
  if (err) throw err;

  console.log("connection successfull....");
});

app.listen(config.port, () => {
  console.log("server is listening to http://localhost:" + config.port);
});

// get all employees
app.get("/employees", (req, res) => {
  conn.query("SELECT * FROM EMPLOYEE", (err, rows, fields) => {
    if (!err) {
      console.log("rows", rows);
      res.send(rows);
    } else console.log("err", err);
  });
});

// get employeee as per id
app.get("/employees/:id", (req, res) => {
  conn.query(
    `SELECT * FROM EMPLOYEE WHERE EmpID = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) {
        console.log("rows", rows);
        res.send(rows);
      } else console.log("err", err);
    }
  );
});

// delete employee
app.delete("/employees/:id", (req, res) => {
  conn.query(
    `DELETE FROM EMPLOYEE WHERE EmpID = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) {
        res.send("Delete successfull.");
      } else console.log("err", err);
    }
  );
});

// insert employee
app.post("/employee", (req, res) => {
  const emp = req.body;
  const sql =
    "SET @EmpID = ?;SET @Name = ?;SET @EmployeeId = ?;SET @Salary = ?; \
    CALL EmployeeAddOrEdit(@EmpID,@Name,@EmployeeId,@Salary);";
  conn.query(
    sql,
    [emp.EmpID, emp.Name, emp.EmployeeId, emp.Salary],
    (err, rows, fields) => {
      if (!err) {
        rows.forEach((element) => {
          if (element.constructor == Array) {
            res.send("Inserted employee Id : " + element[0].EmpID);
          }
        });
      } else console.log("err", err);
    }
  );
});

// update employee
app.put("/employee", (req, res) => {
  const emp = req.body;
  const sql =
    "SET @EmpID = ?;SET @Name = ?;SET @EmployeeId = ?;SET @Salary = ?; \
    CALL EmployeeAddOrEdit(@EmpID,@Name,@EmployeeId,@Salary);";
  conn.query(
    sql,
    [emp.EmpID, emp.Name, emp.EmployeeId, emp.Salary],
    (err, rows, fields) => {
      if (!err) {
        res.send("Updated Successfully.");
      } else console.log("err", err);
    }
  );
});
