const asyncHandler = require('express-async-handler')

const Task = require('../models/taskModel')
const User = require('../models/userModel')

// @desc    Get tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user.id })

  res.status(200).json(tasks)
})

// @desc    add new task
// @route   POST /api/tasks
// @access  Private
const addTask = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const task = await Task.create({
    text: req.body.text,
    user: req.user.id,
    priority: req.body.priority ? req.body.priority : '',
    dueDate: req.body.dueDate ? req.body.dueDate : null,
    completed: false,
    list: req.body.list ? req.body.list : null,
  })

  res.status(200).json(task)
})

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)

  if (!task) {
    res.status(400)
    throw new Error('Task not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Check if the logged in user matches the task user
  if (task.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedTask)
})

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)

  if (!task) {
    res.status(400)
    throw new Error('Task not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // check if the logged in user matches the task user
  if (task.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await Task.deleteOne({ _id: req.params.id })

  res.status(200).json({ id: req.params.id })
})

// @desc    Get tasks for today
// @route   GET /api/tasks/today
// @access  Private
const getTasksDueToday = asyncHandler(async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const tasks = await Task.find({
      dueDate: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks due today' });
  }
})

module.exports = {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  getTasksDueToday,
};