const jwt = require('jsonwebtoken');
const asyncHandler 		= require('express-async-handler');
const User = require('../../models/User.js');

const authMiddleware = asyncHandler(async (req, res, next) => {

  const token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.user_id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

module.exports = authMiddleware;
