const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    Name: {
      type: String,
    },
    Notes: {
      type: String,
    },
    Status: {
      type: String,
      enum: ["todo", "in_progress", "done"],
      default: "todo",
    },
    Collaborator: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    StartDate: {
      type: Date,
      default: new Date(),
    },
    EndDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;
