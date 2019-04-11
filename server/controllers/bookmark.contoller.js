import db from '../models';
import Response from '../utils/response.util';

const { Bookmark, Article } = db;
/**
 * Bookmark Controller
 * @package bookmark
 */
class BookmarkController {
  /**
   * @description - Controller for creating a bookmark endpoint
   * @param {object} req
   * @param {object} res
   * @returns {object} response
  */
  static async createOrRemoveBookmark(req, res) {
    const {
      articleId
    } = req.params;
    const { id } = req.user;
    const isArticleExists = await Article.findOne({ where: { id: articleId } });
    if (!isArticleExists) return Response(res, 404, 'Article not found');

    await Bookmark.findOrCreate({
      where: { articleId, userId: id }
    }).spread((bookmark, created) => {
      if (created) return Response(res, 201, 'Article has been successfully bookmarked', { bookmark });
      bookmark.destroy();
      return Response(res, 200, 'Bookmark removed successfully');
    });
  }
}
export default BookmarkController;
