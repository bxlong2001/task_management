const Task = require("../models/Task");

const newTask = async (req, res, next) => {
  try {
    const newTask = new Task(req.value.body);
    const projectId = req.params.projectId;
    const checkNameTask = await Task.find({
      ProjectId: projectId,
      Name: newTask.Name,
    });
    if (checkNameTask.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "tên đã tồn tại" });
    } else {
      await newTask.save();
      
      return res.status(200).json({ success: true, task: newTask });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
module.exports = {
  newTask,
};
