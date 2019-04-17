import readingTime from 'reading-time';
import stripHtml from './stripHtml.util';
import baseUtils from './articles/base.util';
/**
 * Returns reading time for a text
 * @param {string} text
 * @returns {string} reading time
 */
const readTime = async (text) => {
  if (!baseUtils.isString(text)) return 'Content must be a string';
  const plainText = await stripHtml(text);
  return readingTime(plainText).minutes;
};

export default readTime;
