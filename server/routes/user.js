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

route.post(
  "/auth/google",
  passport.authenticate("google-token", { session: false }),
  UserController.authGoogle
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

route
  .route("/:userID/decks")
  .get(validateParam(schemas.idSchema, "userID"), UserController.getUserDecks)
  .post(
    validateParam(schemas.idSchema, "userID"),
    validateBody(schemas.deckSchema),
    UserController.newUserDeck
  );

module.exports = route;
