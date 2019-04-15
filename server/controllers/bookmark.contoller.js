import db from '../models';
import Response from '../utils/response.util';

const { Bookmark, Article, User } = db;
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

  /**
   * Get users bookmark
   * @param {object} req
   * @param {Object} res
   * @returns {Object} response
   */
  static async getUserBookmark(req, res) {
    const { user: { id } } = req;

    const response = await Bookmark.findAndCountAll({
      where: { userId: id },
      include: [{
        model: Article,
        attributes: ['id', 'slug', 'title', 'description',
          'body', 'image', 'tagList', 'createdAt', 'updatedAt']
      }, {
        model: User,
        attributes: ['username', 'email', 'image']
      }]
    });
    return Response(res, 200, 'user bookmarks successfully retrieved', response);
  }
}
export default BookmarkController;
