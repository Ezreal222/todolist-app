const express = require("express");
const {
  getLists,
  addList,
  deleteList,
  getListTasks,
} = require("../controllers/listController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getLists).post(protect, addList);
router.route("/:id").delete(protect, deleteList);
router.route('/:listId/tasks').get(protect, getListTasks);

module.exports = router;
