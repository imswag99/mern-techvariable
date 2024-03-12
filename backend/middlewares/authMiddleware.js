const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authenticate = async (req, res, next) => {
  let token = "";

  token = req.cookies.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET, {});
      req.user = await User.findById(decoded.id);
      next();
    } catch (error) {
      res.status(401).json("Not authorized, token failed");
    }
  } else {
    res.status(401).json("Not authorized, no token");
  }
};


module.exports = authenticate;