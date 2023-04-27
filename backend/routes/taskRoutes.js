const express = require('express')
const router = express.Router()
const {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
  getTasksDueToday,
  //getTasksByList,
} = require('../controllers/taskController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getTasks).post(protect, addTask)
router.route('/:id').delete(protect, deleteTask).put(protect, updateTask)
router.route('/today').get(protect, getTasksDueToday)
//router.route("/list/:listId").get(protect, getTasksByList);

module.exports = router