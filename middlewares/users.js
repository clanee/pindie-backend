const user = require("../models/user");
const bcrypt = require("bcryptjs");

const findAllUsers = async (req, res, next) => {
  req.usersArray = await user.find({});
  next();
};

const createUser = async (req, res, next) => {
  console.log("POST /users");
  try {
    console.log(req.body);
    req.user = await user.create(req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Ошибка создания пользователя" }));
  }
};

const findUserById = async (req, res, next) => {
  console.log("GET/users/:id");
  try {
    req.user = await user.findById(req.params.id);
    next();
  } catch (error) {
    res.status(404).send({ message: "Пользователь не найден" });
  }
};

const updateUser = async (req, res, next) => {
  try {
    req.user = await user.findByIdAndUpdate(req.params.id, req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Ошибка обновления пользователя" }));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    req.user = await user.findByIdAndDelete(req.params.id);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Ошибка удаления пользователя" }));
  }
};

const sendUserDeleted = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.user));
};

const checkEmptyNameAndEmailAndPassword = async (req, res, next) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    res.status(400).send({ message: "Заполните пустые поля" });
  } else {
    next();
  }
};

const checkEmptyNameAndEmail = async (req, res, next) => {
  if (!req.body.username || !req.body.email) {
    res.status(400).send({ message: "Заполните пустые поля" });
  } else {
    next();
  }
};

const checkIsUserExists = async (req, res, next) => {
  const isInArray = req.usersArray.find((user) => {
    return req.body.email === user.email;
  });
  if (isInArray) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(
        JSON.stringify({ message: "Пользователь с таким email уже существует" })
      );
  } else {
    next();
  }
};

const filterPassword = (req, res, next) => {
  const filterUser = (user) => {
    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
  };
  if (req.user) {
    req.user = filterUser(req.user);
  }
  if (req.usersArray) {
    req.usersArray = req.usersArray.map((user) => filterUser(user));
  }
  next();
};

const hashPassword = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash;
    next();
  } catch (error) {
    res.status(400).send({ message: "Ошибка хеширования пароля" });
  }
};

module.exports = {
  findAllUsers,
  createUser,
  findUserById,
  updateUser,
  deleteUser,
  sendUserDeleted,
  checkEmptyNameAndEmailAndPassword,
  checkEmptyNameAndEmail,
  checkIsUserExists,
  filterPassword,
  hashPassword,
};
