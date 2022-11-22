/**
 * We can interact with mongoose in three diffirent ways:
 * [v] Callback
 * [v] Promises
 * [v] Async/await (Promises)
 */

const Deck = require("../models/Deck");
const User = require("../models/User");

const { JWT_SECRET, REFRESH_TOKEN } = require("../configs");
const JWT = require("jsonwebtoken");

const encodedToken = (userID) => {
  return JWT.sign(
    {
      iss: "Hiep Nguyen",
      sub: userID,
      iat: new Date().getTime(),
    },
    JWT_SECRET,
    {
      expiresIn: "3m",
    }
  );
};

const createRefreshToken = (data) => {
  const access_token = JWT.sign({ data }, REFRESH_TOKEN, {
    expiresIn: "365d",
  });
  return access_token;
};

const refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.headers.token.split(" ")[1];
    if (refreshToken) {
      JWT.verify(refreshToken, REFRESH_TOKEN, function (err, user) {
        if (err) {
          console.log("2");
          return res.status(404).json({
            message: "The user is not authentication",
          });
        }
        if (user) {
          const newAccessToken = encodedToken(user._id);
          return res.json({
            status: "OK",
            access_token: newAccessToken,
          });
        } else {
          return res.json({
            message: "The user is not authentication",
          });
        }
      });
    } else {
      return res.json({
        message: "The refreshToken is not valid",
      });
    }
  } catch (err) {
    return res.json({
      status: "err",
      message: err,
    });
  }
};

const authFacebook = async (req, res, next) => {
  const token = encodedToken(req.user._id);
  res.setHeader("Authorization", token);
  return res.status(200).json({ success: true });
};

const authGoogle = async (req, res, next) => {
  try {
    const token = encodedToken(req.user._id);
    const refreshToken = createRefreshToken(req.user._id);
    const User = req.user;
    res.setHeader("Authorization", token);
    return res.status(200).json({ success: true, token, User, refreshToken });
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (req, res, next) => {
  const { userID } = req.value.params;

  const user = await User.findById(userID);

  return res.status(200).json({ user });
};

const getUserDecks = async (req, res, next) => {
  const { userID } = req.value.params;

  // Get user
  const user = await User.findById(userID).populate("decks");

  return res.status(200).json({ decks: user.decks });
};

const index = async (req, res, next) => {
  const users = await User.find({});

  return res.status(200).json({ users });
};

const newUser = async (req, res, next) => {
  const newUser = new User(req.value.body);

  await newUser.save();

  return res.status(201).json({ user: newUser });
};

const newUserDeck = async (req, res, next) => {
  const { userID } = req.value.params;

  // Create a new deck
  const newDeck = new Deck(req.value.body);

  // Get user
  const user = await User.findById(userID);

  // Assign user as a deck's owner
  newDeck.owner = user;

  // Save the deck
  await newDeck.save();

  // Add deck to user's decks array 'decks'
  user.decks.push(newDeck._id);

  // Save the user
  await user.save();

  res.status(201).json({ deck: newDeck });
};

const replaceUser = async (req, res, next) => {
  // enforce new user to old user
  const { userID } = req.value.params;

  const newUser = req.value.body;

  const result = await User.findByIdAndUpdate(userID, newUser);

  return res.status(200).json({ success: true });
};

const secret = async (req, res, next) => {
  return res.status(200).json({ resources: true });
};

const signIn = async (req, res, next) => {
  try {
    const token = encodedToken(req.user._id);
    res.setHeader("Authorization", token);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

const signUp = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.value.body;

  // Check if there is a user with the same user
  const foundUser = await User.findOne({ email });
  if (foundUser)
    return res
      .status(403)
      .json({ error: { message: "Email is already in use." } });

  // Create a new user
  const newUser = new User({ firstName, lastName, email, password });
  newUser.save();

  // Encode a token
  const token = encodedToken(newUser._id);

  res.setHeader("Authorization", token);
  return res.status(201).json({ success: true, token });
};

const updateUser = async (req, res, next) => {
  // number of fields
  const { userID } = req.value.params;

  const newUser = req.value.body;

  const result = await User.findByIdAndUpdate(userID, newUser);

  return res.status(200).json({ success: true });
};

module.exports = {
  refreshToken,
  getUser,
  getUserDecks,
  index,
  newUser,
  newUserDeck,
  replaceUser,
  secret,
  signIn,
  signUp,
  updateUser,
  authGoogle,
  authFacebook,
};
