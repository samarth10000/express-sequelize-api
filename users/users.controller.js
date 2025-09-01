const jwt = require("jsonwebtoken");
const User = require("./users.model");
const bcrypt = require("bcrypt");

const insertUser = async (data) => {
  const encryptedPassword = await bcrypt.hash(data.Password, 10);
  const res = await User.create({ ...data, Password: encryptedPassword });
  return res.dataValues;
};

const userLogin = async (data) => {
  const userData = await User.findOne({
    where: {
      email: data.email,
    },
  });

  if (!userData) {
    return null;
  }
  const checkPassword = await bcrypt.compare(
    data.Password,
    userData.dataValues.Password
  );

  if (!checkPassword) {
    return null;
  }

  const token = jwt.sign(
    {
      id: userData.dataValues.id,
      email: userData.dataValues.email,
      isActive: userData.dataValues.isActive,
    },
    process.env.JWT_SECRET,
    { expiresIn: "12h" }
  );

  return {
    userId: userData.dataValues.id,
    access_token: token,
  };
};

const getUsers = async (data) => {
  const users = await User.findAll({
    where: {
      isActive: true,
    },
  });
  if (users.length) {
    return users;
  }
  return null;
};

const updateUserData = async (userId, userData) => {
  const user = await User.findOne({
    where: {
      id: userId,
      isActive: true,
    },
  });
  if (user) {
    const response = await User.update(
      { ...userData },
      {
        where: {
          id: userId,
          returning: true,
        },
      }
    );
    return response;
  }
  return null;
};

const deleteUser = async (userId) => {
  const user = await User.findOne({
    Where: {
      userId,
    },
  });

  if (user) {
    const response = await User.destroy({
      where: {
        id: userId,
      },
    });
    return response;
  }
  return null;
};

module.exports = {
  insertUser,
  getUsers,
  updateUserData,
  deleteUser,
  userLogin,
};
