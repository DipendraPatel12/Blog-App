const jwt = require('jsonwebtoken');

const accessTokenSecret = "5651555";
const refreshTokenSecret = "78526";
const accessTokenLife = '15m';
const refreshTokenLife = '7d';

const generateAccessToken = (user) => {
  return jwt.sign({user}, accessTokenSecret, { expiresIn: accessTokenLife });
};

const generateRefreshToken = (user) => {
  return jwt.sign({user}, refreshTokenSecret, { expiresIn: refreshTokenLife });
};

module.exports = { generateAccessToken, generateRefreshToken };
