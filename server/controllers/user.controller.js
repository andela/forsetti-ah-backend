import db from '../models';
import utils from '../utils';
import sendMail from '../utils/mail.util';

const { User } = db;
const { passwordHash, generateToken } = utils;

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
}

export default UserController;
