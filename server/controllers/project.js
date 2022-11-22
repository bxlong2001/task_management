const Project = require("../models/Project");

const newProject = async (req, res, next) => {
  try {
    const newProject = new Project(req.value.body);
    const checkNameProject = await Project.find({ Name: newProject.Name });
    if (!checkNameProject) {
      await newProject.save();
      return res.status(201).json({ project: newProject });
    } else {
      return res.status(400).json({ message: "tên đã tồn tại" });
    }
  } catch (error) {
    console.log(error);
  }
};
const editProject = async (req, res, next) => {
  try {
    const newProject = req.value.body;
    const edit = await Project.updateOne(
      {
        _id: req.params.idProject,
      },
      newProject
    );
    if (edit) {
      return res.status(200).json({ message: "sửa thành công" });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  newProject,
  editProject,
};
