
const jwt = require('jsonwebtoken');
const JWT_SECRET = "1234";

const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token missing.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token.' });
  }
};

module.exports = authenticateUser;
