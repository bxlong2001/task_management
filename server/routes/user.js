const express = require("express");
// const route = express.route()
const route = require("express-promise-router")();

const UserController = require("../controllers/user");

const {
  validateBody,
  validateParam,
  schemas,
} = require("../helpers/routerHelpers");

const passport = require("passport");
const passportConfig = require("../middlewares/passport");
const { session } = require("passport");
const authMiddleware = require("../middlewares/authMiddleware");

route.route("/refreshToken").post(UserController.refreshToken);

route.post(
  "/auth/google",
  passport.authenticate("google-token", { session: false }),
  UserController.authGoogle
);
route
  .route("/auth/facebook")
  .post(
    passport.authenticate("facebook-token", { session: false }),
    UserController.authFacebook
  );
route
  .route("/")
  .get(UserController.index)
  .post(validateBody(schemas.userSchema), UserController.newUser);

route
  .route("/signUp")
  .post(validateBody(schemas.authSignUpSchema), UserController.signUp);

route
  .route("/signIn")
  .post(
    validateBody(schemas.authSignInSchema),
    passport.authenticate("local", { session: false }),
    UserController.signIn
  );

route
  .route("/secret")
  .get(passport.authenticate("jwt", { session: false }), UserController.secret);

route.route("/getAllUser").get(authMiddleware, UserController.getAllUser);
route.route("/userCurrent").get(UserController.getUserCurrent);
route
  .route("/:userID")
  .get(validateParam(schemas.idSchema, "userID"), UserController.getUser)
  .put(
    validateParam(schemas.idSchema, "userID"),
    validateBody(schemas.userSchema),
    UserController.replaceUser
  )
  .patch(
    validateParam(schemas.idSchema, "userID"),
    validateBody(schemas.userOptionalSchema),
    UserController.updateUser
  );


module.exports = route;
