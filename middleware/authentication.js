
const jwt = require('jsonwebtoken');
const JWT_SECRET = "1234";

module.exports = (req, res, next) => {
  const token = req.header('authorization');
  if (!token) {
    return res.status(401).json({ error: 'Authorization failed. Token not provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authorization failed. Invalid token.' });
  }
};
