const express = require('express')
const router = express.Router()
const {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
} = require('../controllers/taskController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getTasks).post(protect, addTask)
router.route('/:id').delete(protect, deleteTask).put(protect, updateTask)

module.exports = router