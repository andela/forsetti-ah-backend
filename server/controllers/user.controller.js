import dotenv from 'dotenv';
import db from '../models';
import {
  passwordHash,
  generateToken,
  Response,
  sendMail,
} from '../utils';

const { User, Role } = db;
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
    return Response(res, 201, 'User registered successfully', [userInfo]);
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

  /**
   * @description Sign in User
   * @param {object} req
   * @param {object} res
   * @returns {object} res
   */

  static async signinUser(req, res) {
    const { email, password } = req.body;
    const successMessage = 'Signed in successfully';
    const errorMessage = 'Invalid Credentials';

    const userResponse = await User.findOne({
      where: { email },
    });
    if (userResponse && userResponse.isPasswordValid(password)) {
      const {
        id, firstname, lastname, roleId
      } = userResponse;
      const token = await generateToken({ id, roleId });
      const data = {
        token,
        user: {
          id,
          firstname,
          lastname,
          email: userResponse.email,
        }
      };
      const mailOption = {
        email,
        subject: `Hi ${firstname}`,
        message: '<h1>Forsetti Backend</h1><h5>Someone has just accessed your account at Author\'s Haven. If you are the one, please ignore this mail.</h5>'
      };
      sendMail(mailOption);
      Response(res, 200, successMessage, data);
    } else {
      Response(res, 400, errorMessage);
    }
  }

  /**
     * @description updates the role of a user
     * @param {object} req
     * @param {object} res
     * @returns {object} User Profile Object
     */
  static async updateUserRole(req, res) {
    const userId = req.params.id;
    const { newrole } = req.body;
    const foundUser = await User.findByPk(userId);

    if (!foundUser) return Response(res, 404, 'This user was not found.');

    const newRoleId = await Role.findOne({ where: { type: newrole } });
    const updatedUser = await User.update({ roleId: newRoleId.dataValues.id }, {
      returning: true,
      where: { id: userId },
    });

    const {
      dataValues: {
        id,
        firstname,
        lastname,
        updatedAt,
      }
    } = updatedUser[1][0];
    const result = {
      id,
      firstname,
      lastname,
      role: newrole,
      updatedAt
    };

    return Response(res, 200, `The user role has been changed to ${newrole}.`, [result]);
  }
}

export default UserController;
