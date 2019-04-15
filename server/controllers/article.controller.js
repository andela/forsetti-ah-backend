import db from '../models';
import slugify from '../utils/slugify.utils';
import { Response, mailTemplate, sendMail } from '../utils';

const {
  Article, Tag, ArticleTag, User, Comment,
} = db;
/**
 * Article Controller
 * @package Article
 */
class ArticleController {
  static async createArticle(req, res) {
    /**
     * @description - Controller for create an article endpoint
     *
     * @static
     * @param {object} request
     * @param {object} response
     * @returns {object}
     * @memberof createArticle
    */
    if (req.file) req.body.image = req.file.secure_url;
    const {
      title, body, tagList, image, description, published,
    } = req.body;
    const { id } = req.user;
    const tags = [...new Set(tagList)];
    const article = await Article.create({
      title,
      body,
      tagList: tags,
      description,
      image,
      published,
      slug: slugify(`${title} ${Date.now()}`),
      userId: id
    });
    if (tags) {
      let insertTags = tags.map(async (newTags) => {
        const newtag = await Tag.findOrCreate({ where: { name: newTags } });
        return newtag[0];
      });

      insertTags = await Promise.all(insertTags);

      await article.addTags(insertTags);
    }
    const {
      dataValues: {
        firstname,
        email,
        bio,
        image: userimage
      }
    } = await article.getAuthor();
    const author = {
      firstname,
      email,
      bio,
      image: userimage
    };
    if (!article) {
      return Response(res, 400, 'Article was not created successfully');
    }
    return Response(res, 201, 'Article successfully created', { article, author });
  }

  /**
   * Edit article controller
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} response
   */
  static async editArticle(req, res) {
    const {
      params: { slug },
      body: {
        description, title, body, tagList
      }, user: { id }
    } = req;
    const tags = [...new Set(tagList)];
    const updatedArticle = await Article.update({
      description,
      title,
      body,
      tagList
    }, {
      where: {
        slug, userId: id,
      },
      returning: true,
    });
    let insertTags;
    const articleId = updatedArticle[1][0].dataValues.id;
    const editInstance = updatedArticle[1][0];
    if (tags) {
      await ArticleTag.destroy({ where: { articleId } });
      insertTags = tags.map(async (newTags) => {
        const newtag = await Tag.findOrCreate({ where: { name: newTags } });
        return newtag[0];
      });

      insertTags = await Promise.all(insertTags);
      await editInstance.addTags(insertTags);
    }
    const {
      dataValues: {
        firstname,
        email,
        bio,
        image
      }
    } = await editInstance.getAuthor();
    const {
      dataValues: {
        updatedAt
      }
    } = updatedArticle[1][0];
    const response = {
      article: {
        slug,
        title,
        description,
        body,
        tagList,
        updatedAt,
      },
      author: {
        firstname,
        email,
        bio,
        image
      }
    };
    if (!updatedArticle) {
      return Response(res, 400, 'Error editing article');
    }
    return Response(res, 200, 'Article edited successfully', response);
  }

  static async getAllArticles(req, res) {
    /**
     * @description - Controller to get all articles endpoint
     *
     * @static
     * @param {object} request
     * @param {object} response
     * @returns {object}
     * @memberof getAllArticles
    */
    const articles = await Article.findAndCountAll({
      where: { published: true },
      include: [{
        model: User,
        as: 'author',
        attributes: ['firstname', 'lastname', 'bio', 'image']
      },
      {
        model: Comment,
        as: 'comments'
      }]
    });
    if (articles.count === 0) {
      return Response(res, 400, 'There is no article in database');
    }
    return Response(res, 200, 'Articles successfully retrieved', { articles });
  }

  /**
   * Share article controller
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} response
   */
  static async shareArticle(req, res) {
    const {
      body: { email },
      params: { slug },
      user: { id }
    } = req;
    const {
      dataValues: {
        firstname,
        lastname
      }
    } = await User.findOne({ where: { id } });
    const {
      dataValues: {
        title
      }
    } = await Article.findOne({ where: { slug } });
    const message = `<p>  
                    ${firstname} ${lastname} shared this article <b>${title}</b> on Author's Haven,
                  </p>
                  <p>
                  click <a href= ${process.env.FRONTEND_URL}${encodeURI(slug)}> ${title}</a> to view
                  </p>`;
    const mailOption = {
      email,
      subject: 'Author\'s Haven',
      message: mailTemplate('Hello there', message)
    };
    await sendMail(mailOption);
    return Response(res, 200, 'Article shared successfully');
  }
}
export default ArticleController;
