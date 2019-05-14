import db from '../models';
import slugify from '../utils/slugify.utils';
import {
  verifyToken,
  Response,
  mailTemplate,
  sendMail,
  Rating,
  newArticleMail,
  readTime,
} from '../utils';

const { getArticleRating } = Rating;
const {
  Article, User, Comment, Readstat, Tag, ArticleTag, Clap, DraftComment
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
      title, body, tagList, image, description, published, slug
    } = req.body;
    const publishedBoolean = !!published;

    const { id } = req.user;
    const readingTime = await readTime(body);
    const tags = [...new Set(tagList)];
    const article = await Article.create({
      title,
      body,
      tagList: tags,
      description,
      image,
      readingTime,
      published: publishedBoolean,
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
    await newArticleMail(id, title, article.slug, article.id);
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
        description, title, body, tagList, published
      }, user: { id }
    } = req;
    const publishedBoolean = !!published;
    let editImage;
    if (req.file) editImage = req.file.secure_url;
    const tags = [...new Set(tagList)];
    const readingTime = await readTime(body);
    const updatedArticle = await Article.update({
      description,
      title,
      body,
      image: editImage,
      readingTime,
      tagList,
      published: publishedBoolean
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
        createdAt,
        updatedAt
      }
    } = updatedArticle[1][0];
    const response = {
      article: {
        slug,
        readingTime,
        title,
        description,
        body,
        image,
        tagList,
        createdAt,
        updatedAt
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
    const { page } = req.query;
    const limit = 10;
    const offset = limit * (page - 1);
    const order = [['createdAt', 'DESC']];
    const articles = await Article.findAndCountAll({
      limit,
      offset,
      order,
      where: { published: true },
      include: [{
        model: User,
        as: 'author',
        attributes: ['firstname', 'lastname', 'username', 'bio', 'image']
      }],
    });

    if (articles.count === 0) {
      return Response(res, 400, 'There is no article in database');
    }
    const pages = Math.ceil(articles.count / limit);

    if (page > pages) {
      return Response(res, 404, 'There are no articles here');
    }
    articles.nextpage = page < pages ? 'true' : 'false';
    return Response(res, 200, 'Articles successfully retrieved', { articles, pages });
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

  /**
    * @description gets a single article
    * @param {object} req
    * @param {object} res
    * @returns {object} An article and it's associated comments
    */
  static async getOneArticle(req, res) {
    const { slug: articleSlug } = req.params;
    const existingArticle = await Article.findOne({
      where: { slug: articleSlug },
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'username', 'bio', 'image', 'firstname', 'lastname']
        }
      ],
    });

    if (!existingArticle) return Response(res, 404, 'Article not found.');

    const {
      dataValues: {
        id,
        slug,
        title,
        description, body, tags, author, published, readingTime, createdAt, updatedAt, image
      }
    } = existingArticle;

    const articleRating = await Rating.getArticleRating(id);
    const commentsTable = published ? Comment : DraftComment;

    const articleProperties = await Promise.all([
      Clap.count({ where: { articleId: id } }),
      commentsTable.findAndCountAll({
        where: {
          articleId: id,
          parentId: null
        }
      }),
      commentsTable.count({ where: { articleId: id } }),
    ]);

    const articleObject = {
      id,
      slug,
      title,
      description,
      body,
      image,
      tags,
      author,
      claps: articleProperties[0],
      rating: articleRating,
      readingTime,
      createdAt,
      updatedAt
    };

    const { authorization } = req.headers;
    if (authorization) {
      const token = authorization.split(' ')[1];
      const decoded = await verifyToken(token);
      await Readstat.findOrCreate({
        where: { userId: decoded.id },
        defaults: {
          userId: decoded.id,
          articleId: id,
          slug,
        },
      });
    }

    const mainComments = articleProperties[1].rows;
    if (mainComments.length) {
      const commentCount = articleProperties[2];
      let counter = 0;
      mainComments.forEach(async (comment) => {
        const threadComment = await commentsTable.findAll({
          where: { parentId: comment.dataValues.id }
        });
        comment.dataValues.threadcomments = threadComment;
        counter += 1;

        if (counter === mainComments.length) {
          articleObject.comments = mainComments;
          articleObject.commentCount = commentCount;
          return Response(res, 200, 'Article found.', [articleObject]);
        }
      });
    } else {
      articleObject.comments = '0 comments';
      return Response(res, 200, 'Article found.', [articleObject]);
    }
  }

  /*
   * Delete article
   * description Get all tags
   * @param {object} req
   * @param {object} res
   * @returns {object} response
   */
  static async deleteArticle(req, res) {
    const {
      params: { slug }, user: { id }
    } = req;

    const article = await Article.destroy({
      where: {
        slug,
        userId: id,
      }
    });
    if (article) return Response(res, 200, `Successfully deleted ${article} article`);
    return Response(res, 400, 'Article was not deleted');
  }

  /**
   * description Get all tags
   * @param {object} req
   * @param {object} res
   * @returns {object} response
   */
  static async getAllTags(req, res) {
    const tags = await Tag.findAndCountAll({
      attributes: ['name']
    });
    return Response(res, 200, 'Tags successfully retrieved', { tags });
  }

  /*
   * @description Get top rated articles controller
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async getTopArticle(req, res) {
    const allarticles = await Article.findAll({
      where: {
        published: true,
      },
      attributes: {
        exclude: ['published', 'userId']
      },
      include: [{
        model: User,
        as: 'author',
        attributes: {
          exclude: ['istokenreset', 'password', 'social', 'roleId', 'subscribed', 'id']
        }
      }]
    });
    const rate = allarticles.map(async (article) => {
      const ratings = await getArticleRating(article.dataValues.id);
      const {
        id, slug, title, description, body, image, tagList, createdAt, updatedAt, author
      } = article;
      const rateObj = {
        id,
        slug,
        title,
        description,
        body,
        image,
        tagList,
        createdAt,
        updatedAt,
        author,
        ratings
      };
      return rateObj;
    });
    const rateResponse = await Promise.all(rate);
    const response = rateResponse.sort((a, b) => b.ratings - a.ratings);
    return Response(res, 200, 'Retrieved all top rated articles feed', { article: response });
  }
}

export default ArticleController;
