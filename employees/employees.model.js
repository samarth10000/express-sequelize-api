const { DataTypes } = require("sequelize");
const sequelize = require("../Database/config");

const Employees = sequelize.define(
  "Employees",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allownull: false,
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salary: {
      type: DataTypes.DECIMAL(10, 2),
    },
    emp_dept_id: {
      type: DataTypes.INTEGER,
      allownull: true,
    },
    emp_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  { tableName: "employees", timestamps: true }
);

module.exports = Employees;
