import db from '../models';
import { Response } from '../utils';

const { User, Article, Follower } = db;

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
      Article.count({ where: { userId: id } }),
      // Follower.count({ where: { follower: id } }),
      // Follower.count({ where: { followee: id } }),
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
      articles: `${userActivity[0]} articles written.`,
      // following: `You are following ${userActivity[1]} authors.`,
      // followers: `You have ${userActivity[2]} followers.`
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
}

export default ProfileController;
