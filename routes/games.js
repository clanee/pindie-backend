const gamesRouter = require("express").Router();

const {
  findAllGames,
  createGame,
  checkEmptyFields,
  checkIsGameExists,
  checkIfCategoriesAvaliable,
  findGameById,
  checkIfUsersAreSafe,
  updateGame,
  deleteGame,
} = require("../middlewares/games");
const {
  sendAllGames,
  sendGameCreated,
  sendGameUpdated,
  sendGameDeleted,
  sendGameById,
} = require("../controllers/games");

gamesRouter.get("/games", findAllGames, sendAllGames);
gamesRouter.get("/games/:id", findGameById, sendGameById);
gamesRouter.post(
  "/games",
  findAllGames,
  checkIsGameExists,
  checkIfCategoriesAvaliable,
  checkEmptyFields,
  createGame,
  sendGameCreated
);
gamesRouter.put(
  "/games/:id",
  findGameById,
  checkIfUsersAreSafe,
  checkIfCategoriesAvaliable,
  checkEmptyFields,
  updateGame,
  sendGameUpdated
);
gamesRouter.delete("/games/:id", deleteGame, sendGameDeleted);

module.exports = gamesRouter;
