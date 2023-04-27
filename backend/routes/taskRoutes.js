const express = require('express')
const router = express.Router()
const {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
  getTasksDueToday,
} = require('../controllers/taskController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getTasks).post(protect, addTask)
router.route('/:id').delete(protect, deleteTask).put(protect, updateTask)
router.route('/today').get(protect, getTasksDueToday)

module.exports = router