import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Response from './response.util';

dotenv.config();

const { JWT_SECRET } = process.env;

/**
 * Generates a JWT token
 * @param {object} data
 * @param {string} expires
 * @returns {string} token
 */
const generateToken = async (data, expires) => {
  const token = await jwt.sign(data, JWT_SECRET, { expiresIn: expires });
  return token;
};

/**
 * verify token
 * @param {Object} token
 * @param {Object} res
 * @returns {object} userdata
 */
const verifyToken = async (token, res) => jwt.verify(token, JWT_SECRET, (err, decoded) => {
  if (err) {
    return Response(res, 401, err.message);
  }
  return decoded;
});


export {
  generateToken,
  verifyToken,
};
