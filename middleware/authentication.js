const jwt = require("jsonwebtoken");

const User = require("../model/userschema")

const authenticate = (fn) => {
  return async (req, res, next) => {
    try {
      
      const token = req.cookies.jwtoken;
      const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
      const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token });
      if (!rootUser) {
        throw new Error("User not found")
      }
      req.token = token;
      req.rootUser = rootUser;
      req.userID = rootUser._id;
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = authenticate;