const Project = require("../models/Project");
const JWT = require("jsonwebtoken");
const newProject = async (req, res, next) => {
  try {
    const newProject = new Project(req.value.body);
    const checkNameProject = await Project.find({ Name: newProject.Name });

    if (checkNameProject.length > 0) {
      return res.status(400).json({ message: "tên đã tồn tại" });
    } else {
      await newProject.save();
      return res.status(201).json({ project: newProject });
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllProjectOfUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    console.log(process.env.JWT_SECRET);
    const decodeToken = JWT.verify(token, process.env.JWT_SECRET);
    console.log(decodeToken);
    const id = decodeToken.sub;
    const projects = await Project.find({
      $or: [{ Owner: id }, { Collaborator: [id] }],
    })
      .populate({
        path: "Owner",
        select: "-password",
      })
      .populate({
        path: "Collaborator",
        select: "-password",
      })
      .populate({
        path: "TaskList",
      });
    return res.status(200).json({ success: true, data: projects });
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

const deleteProject = async (req, res, next) => {
  try {
    const id = req.params.projectId;
    const deletePr = await Project.deleteOne({ _id: id });
    if (deletePr) {
      return res.status(200).json({ message: "Xóa thành công" });
    } else {
      return res.status(404).json({ message: "Xóa không thành công" });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  newProject,
  editProject,
  getAllProjectOfUser,
  deleteProject,
};
