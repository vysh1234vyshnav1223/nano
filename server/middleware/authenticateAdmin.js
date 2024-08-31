const jwt = require('jsonwebtoken');

const authenticateAdmin = (req, res, next) => {
  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized Access' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, userData) => {
    if (err || userData.role !== 'admin') {
      return res.status(401).json({ error: 'Unauthorized Access: Admins Only' });
    }

    req.user = userData;
    next();
  });
};

module.exports = authenticateAdmin;
