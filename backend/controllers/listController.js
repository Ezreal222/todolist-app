const asyncHandler = require("express-async-handler");

const List = require("../models/listModel");

// @desc    Get lists
// @route   GET /api/lists
// @access  Private
const getLists = asyncHandler(async (req, res) => {
  const lists = await List.find({ user: req.user.id });

  res.status(200).json(lists);
});

// @desc    Add a new list
// @route   POST /api/lists
// @access  Private
const addList = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a name field");
  }

  const list = await List.create({
    name: req.body.name,
    user: req.user.id,
  });

  res.status(200).json(list);
});

// @desc    Delete list
// @route   DELETE /api/lists/:id
// @access  Private
const deleteList = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);

  if (!list) {
    res.status(400);
    throw new Error("List not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (list.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await List.deleteOne({ _id: req.params.id });

  res.status(200).json({ id: req.params.id });
});

// @desc    Get tasks for a specific list
// @route   GET /api/lists/:listId/tasks
// @access  Private
const getListTasks = asyncHandler(async (req, res) => {
  const listId = req.params.listId;
  const tasks = await Task.find({ list: listId, user: req.user.id });

  res.status(200).json(tasks);
});

module.exports = {
  getLists,
  addList,
  deleteList,
  getListTasks,
};
