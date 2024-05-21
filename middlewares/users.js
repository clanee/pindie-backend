const user = require("../models/user");

const findAllUsers = async (req, res, next) => {
  req.usersArray = await user.find({});
  next();
};

module.exports = findAllUsers;
