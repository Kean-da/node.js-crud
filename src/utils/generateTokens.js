const jwt = require('jsonwebtoken');

const generateToken = (res, user_id) => {
  const token = jwt.sign({ user_id }, process.env.JWT_SECRET, {
    expiresIn: Math.floor(Date.now() / 1000) + ((60 * 24) * 60), //expires in 24hours
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: Math.floor(Date.now() / 1000) + ((60 * 24) * 60), // 24hours
  });
};

module.exports = generateToken;
