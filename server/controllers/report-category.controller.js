import db from '../models';
import { Response } from '../utils';

const { ReportType } = db;
/**
 * Handles actions for the ReportCategory model
 * @package ReportCategory
 */
class ReportCategory {
  /**
   * Fetches all report categories
   * @param {object} req
   * @param {object} res
   * @returns {any} response
   */
  static async getAll(req, res) {
    const reportCategories = await ReportType.findAndCountAll({
      attributes: ['id', 'name']
    });
    return Response(res, 200, 'Report catgories retrieved', reportCategories);
  }
}

export default ReportCategory;
