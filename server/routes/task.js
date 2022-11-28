const express = require("express");
// const route = express.route()
const route = require("express-promise-router")();
const {
    validateBody,
    validateParam,
    schemas,
  } = require("../helpers/routerHelpers");


  
module.exports = route;