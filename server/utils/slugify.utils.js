import slugify from 'slugify';

/**
 * @description - Generates a slug
 * @param {string} value
 * @returns {string} slug
 */
const slug = value => slugify(value);

export default slug;
