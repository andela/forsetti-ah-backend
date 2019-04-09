import sendMail from '../mail.util';
import mailTemplate from '../mail-template/mail-template.util';
import db from '../../models';

const { User, Notification } = db;

/**
 * Process email notification to a user who has been followed
 * @param {int} followeeId user being followed
 * @param {int} followerId user who followed
 * @returns null
 */

const newFollowerMail = async (followeeId, followerId) => {
  const followee = await User.findByPk(followeeId);
  const follower = await User.findByPk(followerId);

  if (!followee || !follower) {
    return;
  }

  const body = `${follower.firstname} ${follower.lastname} is now following you.`;

  const mailOption = {
    email: followee.email,
    subject: 'New follower alert',
    message: mailTemplate(`Hello ${followee.firstname},`, body)
  };

  await Notification.create({
    notification: body,
    userId: followee.id,
    type: 'follow',
    typeId: follower.id,
  });
  sendMail(mailOption);
};

export default newFollowerMail;
