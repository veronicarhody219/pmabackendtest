const Board = require("../model/Board");
const mongoose = require("mongoose");

const getBoards = async (req, res) => {
  const boards = await Board.find({}).sort({createdAt: -1});
  res.status(200).json(boards);
};
const getBoard = async (req, res) => {
  const {id} = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No boards found"});
  }

  const board = await Board.findById(id);
  if (!board) {
    return res.status(404).json({error: "No boards found"});
  }
  res.status(200).json(board);
};

const createBoard = async (req, res) => {
  const {title} = req.body;
  try {
    const board = await Board.create({title});
    res.status(200).json(board);
  } catch (error) {
    console.log(error);
    res.status(400).json({error: error.message});
  }
};
const deleteBoard = async (req, res) => {
  const {id} = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No boards found"});
  }
  const board = await Board.findOneAndDelete({_id: id});
  if (!board) {
    return res.status(404).json({error: "No boards found"});
  }
  res.status(200).json(board);
};
const deleteAllBoards = async (req, res) => {
  const board = await Board.deleteMany();
  if (!board) {
    return res.status(404).json({error: "No boards found"});
  }
  res.status(200).json(board);
};

const updateBoard = async (req, res) => {
  const {id} = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No board found"});
  }
  const board = await Board.findOneAndUpdate({_id: id}, {...req.body});
  if (!board) {
    return res.status(404).json({error: "No board found"});
  }
  res.status(200).json(board);
};
module.exports = {
  getBoards,
  getBoard,
  createBoard,
  deleteBoard,
  updateBoard,
  deleteAllBoards,
};
