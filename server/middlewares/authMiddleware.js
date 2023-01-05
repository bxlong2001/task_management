const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  console.log('run');
  const token = req.header('Authorization').split(" ")[1];
  if (!token) {
    return res.status(404).json({
      message: "Token is valid",
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(404).json({
        message: "The user is not authentication",
      });
    }
    if (user) {
      console.log(user);
      next();
    } else {
      return res.status(404).json({
        message: "The user is not authentication",
      });
    }
  });
};
module.exports = authMiddleware;
