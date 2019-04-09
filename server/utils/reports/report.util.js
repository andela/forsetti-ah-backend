import isEmpty from '../isEmpty.util';
import db from '../../models';
import Response from '../response.util';

const { ReportType } = db;

/**
 * Validates that the report body is not empty
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @return {any} isEmpty function
 */
const reportCheck = (req, res, next) => isEmpty(req.body, res, next);

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {any} next/error response
 */
const reportTypeCheck = async (req, res, next) => {
  const { typeId } = req.body;
  const type = await ReportType.findByPk(typeId);
  if (type === null) return Response(res, 400, 'Report type does not exist');
  return next();
};

export {
  reportTypeCheck,
  reportCheck,
};
