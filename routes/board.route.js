const express = require("express");
const {
  createBoard,
  getBoards,
  getBoard,
  deleteBoard,
  updateBoard,
  deleteAllBoards,
} = require("../controllers/boardController");
const router = express.Router();

router.post("/", createBoard);

router.get("/", getBoards);

router.get("/:id", getBoard);

router.delete("/", deleteAllBoards);

router.delete("/:id", deleteBoard);

router.put("/:id", updateBoard);

module.exports = router;
