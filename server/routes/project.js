const express = require("express");
const route = require("express-promise-router")();
const ProjectController = require("../controllers/project");
const {
  validateBody,
  validateParam,
  schemas,
} = require("../helpers/routerHelpers");

route
  .route("/newProject")
  .post(validateBody(schemas.newProjectSchema), ProjectController.newProject);

route
  .route("/editProject/:idProject")
  .put(validateBody(schemas.newProjectSchema), ProjectController.editProject);
module.exports = route;
