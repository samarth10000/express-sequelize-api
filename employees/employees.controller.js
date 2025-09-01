const Employees = require("../employees/employees.model");

const InsertEmployees = async (data) => {
  const res = await Employees.create(data);
  return res.dataValues;
};

const GetSingleUser = async (employeeId) => {
  const employee = await Employees.findOne({
    where: {
      id: employeeId,
    },
  });
  if (employee) {
    return employee.dataValues;
  } else {
    return null;
  }
};

module.exports = {
  InsertEmployees,
  GetSingleUser,
};
