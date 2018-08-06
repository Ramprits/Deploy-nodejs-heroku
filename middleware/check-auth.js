const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "$2b$10$4eYrC9tfsnxnhc0gn5jOa7TqBFa9n4c5CpaqR7te1H1ye2");
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed!" });
  }
};
