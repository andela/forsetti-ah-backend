import dotenv from 'dotenv';
import db from '../models';
import utils from '../utils';
import sendMail from '../utils/mail.util';

const { User } = db;
const { passwordHash, generateToken } = utils;
dotenv.config();

/**
 * User Controller
 * @package User
 */
class UserController {
  /**
   * Create a user
   * @param {object} req
   * @param {object} res
   * @returns {object} responseObject
   */
  static async create(req, res) {
    const {
      firstname, lastname, email, password
    } = req.body;

    const hashedPassword = await passwordHash(password);
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    const token = await generateToken({ id: newUser.id });
    const userInfo = {
      token,
      user: {
        firstname,
        lastname,
        email
      }
    };

    const mailOption = {
      email,
      subject: 'Welcome to Author\'s Haven',
      message: `<h3>Hi ${firstname},
      <p>Thanks for joining and we hope you read stories that change your life forever!</p>
      Warm regards.`,
    };
    sendMail(mailOption);
    return res.status(201).json({ status: 201, message: 'User registered successfully', data: [userInfo] });
  }
  /**
     * @description returns tokens and profile from social service
     * @param {string} accessToken
     * @param {string} refreshToken
     * @param {object} profile
     * @param {function} done
     * @returns {object} User Profile Object
     */

  static async socialCallback(accessToken, refreshToken, profile, done) {
    const {
      id, displayName, emails, provider, photos,
    } = profile;

    if (!emails) {
      const userWithNoEmail = { noEmail: true };
      return done(null, userWithNoEmail);
    }

    const userEmail = emails[0].value;
    const names = displayName.split(' ');
    const hashedPassword = await passwordHash(id);
    const profileImage = photos[0].value;

    const [user] = await User.findOrCreate({
      where: { email: userEmail },
      defaults: {
        firstname: names[0],
        lastname: names[1],
        password: hashedPassword,
        email: userEmail,
        social: provider,
        image: profileImage,
      },
    });

    return done(null, user.dataValues);
  }

  /**
     * @description redirects user to the frontend
     * @param {object} req
     * @param {object} res
     * @returns {string} - Frontend url
     */
  static async socialRedirect(req, res) {
    if (req.user.noEmail) {
      return res.redirect(`${process.env.FRONTEND_URL}/auth/social?error=${400}`);
    }

    const { id, email } = req.user;
    const token = await generateToken({ id, email });
    return res.redirect(`${process.env.FRONTEND_URL}/auth/social?${token}`);
  }
}

export default UserController;
