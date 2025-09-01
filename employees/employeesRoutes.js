const express = require("express");
const { InsertEmployees, GetSingleUser } = require("./employees.controller");

const EmployeeRouter = express.Router();

EmployeeRouter.post("/", async (req, res) => {
  const EmployeeData = req.body;
  const getEmployees = await InsertEmployees(EmployeeData);
  if (getEmployees) {
    res.status(200).json({
      getEmployees,
    });
  } else {
    res.status(404).json({
      message: "Not Found",
    });
  }
  res.end();
});

EmployeeRouter.get("/SingleEmployee/:employeeId", async (req, res) => {
  const employeeId = req.params.employeeId;
  const EmployeeData = await GetSingleUser(employeeId);
  if (EmployeeData) {
    res.status(200).json({
      EmployeeData,
    });
  } else {
    res.status(404).json({
      message: "Employee not found ",
    });
  }
});

module.exports = EmployeeRouter;
