//import express
const express = require("express");
//import env file
require("dotenv").config();

const morgon = require("morgan");

const sequelize = require("./Database/config"); // ✅ Only once!

const app = express();
const port = 3000;

//logging middleware to fetch the info
app.use(morgon("combined"));

//Application level middleware

app.use(express.json());

const productRoutes = require("./products/productRoutes");

//Users Section
const User = require("./users/users.model");
const userRouter = require("./users/userRoutes");
//Employee Section
const Employees = require("./employees/employees.model");
const EmployeeRouter = require("./employees/employeesRoutes");

app.use("/users", userRouter);
app.use("/products", productRoutes);
app.use("/employees", EmployeeRouter);

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    await User.sync({ alter: true });
    await Employees.sync({ alter: true });
    console.log(" Database connected successfully");
    console.log(` Server is running on port ${port}`);
  } catch (error) {
    console.error(" Unable to connect to the database:", error);
  }
});
