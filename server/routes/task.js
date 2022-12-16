const express = require("express");
// const route = express.route()
const route = require("express-promise-router")();
const TaskController = require("../controllers/task");
const {
  validateBody,
  validateParam,
  schemas,
} = require("../helpers/routerHelpers");
const authMiddleware = require("../middlewares/authMiddleware");

route
  .route("/newTask/:projectId")
  .post(
    authMiddleware,
    validateParam(schemas.idSchema, "projectId"),
    validateBody(schemas.newTaskSchema),
    TaskController.newTask
  );
route
  .route("/editTask/:projectId/:TaskId")
  .patch(
    authMiddleware,
    validateBody(schemas.idSchema, "TaskId"),
    TaskController.editTask
  );

module.exports = route;
