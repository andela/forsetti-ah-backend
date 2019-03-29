/**
 * @description Wraps a controller function in a try-catch block
 * @param  {object} req - The request object
 * @param  {object} res - The response object
 * @returns Status code and error message if an error is thrown
 */

/* istanbul ignore next */
const tryCatch = controller => async (req, res) => {
  try {
    await controller(req, res);
  } catch (error) {
    return res.status(503).json({ status: 503, message: 'Some error occurred. Please try again' });
  }
  return true;
};

export default tryCatch;
