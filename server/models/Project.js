const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
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
    Owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
    TaskList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
