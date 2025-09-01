const express = require("express");
const {
  insertUser,
  getUsers,
  updateUserData,
  deleteUser,
  userLogin,
} = require("./users.controller");
const {
  validateUser,
  validateUpdateUser,
  validatelogin,
} = require("./users.validations");
const Userrouter = express.Router();

Userrouter.get("/", async (req, res) => {
  const userData = await getUsers();
  res
    .status(userData ? 200 : 404)
    .json(userData ? { userData } : { message: "users not found" });
  res.end();
});

Userrouter.post("/login", validatelogin, async (req, res) => {
  // try {
  const userdata = req.body;
  const logindata = await userLogin(userdata);
  res.status(logindata ? 200 : 401).json(
    logindata
      ? {
          loginData: logindata,
        }
      : {
          message: "invalid credentials",
        }
  );
  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }
  res.end();
});

Userrouter.post("/", validateUser, async (req, res) => {
  try {
    const userdata = req.body;
    const newdata = await insertUser(userdata);
    res.status(201).json({
      newUserdata: newdata,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

Userrouter.put("/:userId", validateUpdateUser, (req, res) => {
  const updatedusers = updateUserData(Number(req.params.userId), req.body);
  if (updatedusers) {
    res.status(200).json({
      updatedusers,
    });
  } else {
    res.status(400).json({
      message: "User not available",
    });
  }
  res.end();
});
Userrouter.delete("/:userId", async (req, res) => {
  const deletedUser = await deleteUser(Number(req.params.userId));
  if (deletedUser) {
    res.status(200).json({
      deletedUser,
    });
  } else {
    res.status(404).json({
      message: "No user Found",
    });
  }
  res.end();
});

module.exports = Userrouter;
