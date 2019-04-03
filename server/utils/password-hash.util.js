import bcrypt from 'bcrypt';

/**
 * Generates a JWT token
 * @param {string} password
 * @returns {string} token
 */
/* istanbul ignore next */
const passwordHash = async password => bcrypt.hash(password, 10);


export default passwordHash;
