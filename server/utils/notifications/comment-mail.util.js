import sendMail from '../mail.util';
import mailTemplate from '../mail-template/mail-template.util';
import db from '../../models';

const { User, Notification, Article } = db;

/**
 * Process new comment email notification to author of an article
 * @param {int} articleId
 * @param {int} userId user who commented
 * @returns null
 */

const newCommentMail = async (articleId, userId) => {
  const article = await Article.findOne({
    where: { id: articleId },
    include: {
      model: User,
      as: 'user'
    }
  });
  const author = article.user;
  const user = await User.findByPk(userId);

  if (!user || !author) {
    return;
  }

  const body = `${user.firstname} ${user.lastname} commented on ${article.title}.`;

  const mailOption = {
    email: author.email,
    subject: 'New comment',
    message: mailTemplate(`Hello ${author.firstname},`, body)
  };

  await Notification.create({
    notification: body,
    userId: author.id,
    type: 'comment',
    typeId: articleId,
  });
  sendMail(mailOption);
};

export default newCommentMail;
