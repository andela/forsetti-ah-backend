import db from '../models';
import { Response } from '../utils';

const { User, Article, Readstat } = db;

/**
 * Profile Controller
 * @package User
 */
class ProfileController {
  /**
    * @description gets the profile of the a user
    * @param {object} req
    * @param {object} res
    * @returns {object} User Profile Object
    */
  static async getProfileById(req, res) {
    const { id } = req.params;
    const userProfile = await User.findByPk(id);
    if (!userProfile) return Response(res, 404, 'No profile found for this user.');

    const userActivity = await Promise.all([
      Article.findAndCountAll({
        where: { userId: id },
        attributes: ['slug', 'title', 'createdAt']
      }),
      Readstat.findAndCountAll({
        where: { userId: id },
        attributes: ['articleId', 'slug', 'createdAt']
      }),
      userProfile.getFollowers(),
    ]);

    const {
      dataValues: {
        firstname,
        lastname,
        username,
        bio,
        image,
      }
    } = userProfile;

    const profileObject = {
      firstname,
      lastname,
      username,
      bio,
      image,
      articlesWritten: `${userActivity[0].count} articles written.`,
      articlesWrittenList: userActivity[0].rows,
      articlesRead: `You have read ${userActivity[1].count} article(s).`,
      articlesReadList: userActivity[1].rows,
      followers: `You have ${userActivity[2].length} followers.`,
    };
    return Response(res, 200, 'User profile found.', [profileObject]);
  }

  /**
     * @description edits a user's profile
     * @param {object} req
     * @param {object} res
     * @returns {object} Updated User Profile Object
     */
  static async updateProfile(req, res) {
    const { id } = req.user;
    if (req.file) req.body.image = req.file.secure_url;
    const {
      firstname, lastname, username, bio, image
    } = req.body;

    const updatedProfile = await User.update({
      firstname, lastname, username, bio, image
    }, {
      returning: true,
      where: { id },
    });
    const { dataValues } = updatedProfile[1][0];
    delete dataValues.password;
    return Response(res, 200, 'Profile updated successfully.', [dataValues]);
  }

  /**
     * @description follows another user
     * @param {object} req
     * @param {object} res
     * @returns {object} user that has been followed
     */
  static async followUser(req, res) {
    const { username } = req.params;
    const { id } = req.user;
    const follower = await User.findByPk(id);
    const followee = await User.findOne({ where: { username } });

    if (!followee) {
      return Response(res, 404, 'User does not exist');
    }
    if (follower.id === followee.id) {
      return Response(res, 409, 'Cannot follow self');
    }
    const newFollower = await followee.addFollowers(follower);
    if (!newFollower) {
      return Response(res, 400, 'Cannot follow user twice');
    }
    const followers = await followee.getFollowers();
    const user = {
      followee: followee.username,
      followers: followers.map(follow => ({ follower: follow.username })),
    };
    return Response(res, 200, 'Successfully followed user', user);
  }

  /**
     * @description unfollows a user
     * @param {object} req
     * @param {object} res
     * @returns {object} user that has been unfollowed
     */

  static async unfollowUser(req, res) {
    const { username } = req.params;
    const { id } = req.user;
    const follower = await User.findByPk(id);
    const followee = await User.findOne({ where: { username } });
    if (!followee) {
      return Response(res, 404, 'User does not exist');
    }
    if (follower.id === followee.id) {
      return Response(res, 409, 'Cannot follow self');
    }
    const unfollow = await followee.removeFollowers(follower);
    if (!unfollow) {
      return Response(res, 400, 'Cannot follow user twice');
    }
    const followers = await followee.getFollowers();
    const user = {
      followee: followee.username,
      followers: followers.map(follow => ({ follower: follow.username })),
    };
    return Response(res, 200, 'Successfully unfollowed user', user);
  }
}

export default ProfileController;
