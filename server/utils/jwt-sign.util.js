import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { JWT_SECRET } = process.env;

/**
 * Generates a JWT token
 * @param {object} data
 * @returns {string} token
 */
const generateToken = async (data) => {
  const token = await jwt.sign(data, JWT_SECRET, { expiresIn: '30d' });
  return token;
};

/**
 * Verifies a JWT token
 * @param {string} token
 * @returns {string} decoded token
 */
const verifyToken = async (token) => {
  const decoded = await jwt.verify(token, JWT_SECRET);
  return decoded;
};

export { generateToken, verifyToken };
