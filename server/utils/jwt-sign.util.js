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

export default generateToken;
