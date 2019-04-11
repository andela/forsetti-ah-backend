import db from '../models';
import { Response } from '../utils';

const { Report } = db;
/**
 * Report Controller
 * @package Report
 */
class ReportController {
  /**
     * @description - Controller for creating a report record
     *
     * @static
     * @param {object} req
     * @param {object} res
     * @returns {object} report
    */
  static async createReport(req, res) {
    const {
      comment,
      typeId,
      articleId
    } = req.body;
    const { id } = req.user;
    const report = await Report.create({
      comment,
      typeId,
      articleId,
      userId: id,
    });
    const { open } = report;
    const createdReport = {
      comment,
      open,
    };
    return Response(res, 201, 'Report submitted successfully', [createdReport]);
  }
}

export default ReportController;
