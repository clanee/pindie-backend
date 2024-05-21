const games = require("../models/game");

const findAllGames = async (req, res, next) => {
  req.gamesArray = await games.find({}).populate("categories").populate({
    path: "users",
    select: "-password",
  });
  next();
};

module.exports = findAllGames;
