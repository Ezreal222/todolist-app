const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    list: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
      required: false,
    },
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", ""],
      default: "",
      require: false,
    },
    dueDate: {
      type: Date,
      require: false,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
