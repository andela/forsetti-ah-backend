
/**
 * @desciption - Specify a key of an array that is required in another array
 *
 * @param {Object} haystack
 * @param {Array} needle
 * @returns {Array} Array of required items
 */
const isRequired = (haystack, needle) => {
  const required = [];
  needle.forEach((value) => {
    if (!Object.keys(haystack).includes(value)) {
      required.push({ [value]: `${value} field is required` });
    }
  });
  return required;
};

export default isRequired;
