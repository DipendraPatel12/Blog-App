const jwt = require('jsonwebtoken');
const accessTokenSecret = "5651555";
const refreshTokenSecret = "78526";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: "unauthorized" });

  try {
    const decoded = jwt.verify(token, accessTokenSecret);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "invalid token" });
  }
};

module.exports = authenticateToken;
