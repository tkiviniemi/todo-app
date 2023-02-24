const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifiedToken = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw new Error('Authentication failed');
    }
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = { id: decodedToken.id };
    next();
  } catch (err) {
    return res.status(401).send('Authentication failed');
  }
};

module.exports = verifiedToken;
