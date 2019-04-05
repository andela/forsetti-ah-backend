import sendMail from '../mail.util';
import db from '../../models';
import mailTemplate from '../mail-template/mail-template.util';

const { User, Notification } = db;

/**
 * Process new article email notification to followers
 * @param {int} userId id of the author
 * @param {string} articleTitle
 * @param {int} articleId
 * @returns null
 */

const newArticleMail = async (userId, articleTitle, articleId) => {
  const user = await User.findByPk(userId);

  const followers = await user.getFollowers({
    attributes: ['id', 'email', 'firstname', 'lastname'],
    where: { subscribed: true }
  });

  if (followers.length === 0) {
    return;
  }

  const body = `${user.firstname} ${user.lastname} has published a new article: ${articleTitle}.`;

  followers.forEach(async (follower) => {
    const mailOption = {
      email: follower.email,
      subject: `New article: ${articleTitle}`,
      message: mailTemplate(`Hello ${follower.firstname},`, body)
    };

    await Notification.create({
      notification: body,
      userId: follower.id,
      type: 'article',
      typeId: articleId,
    });
    sendMail(mailOption);
  });
};

export default newArticleMail;
