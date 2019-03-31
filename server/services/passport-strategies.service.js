import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import controllers from '../controllers';

const { UserController } = controllers;
const { socialCallback } = UserController;

dotenv.config();


const {
  FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET, BACKEND_URL,
  TWITTER_APP_ID, TWITTER_APP_SECRET, GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET
} = process.env;


const facebookSetup = {
  clientID: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_CLIENT_SECRET,
  callbackURL: `${BACKEND_URL}api/v1/auth/facebook/callback`,
  profileFields: ['id', 'emails', 'displayName', 'photos'],
};

const twitterSetup = {
  consumerKey: TWITTER_APP_ID,
  consumerSecret: TWITTER_APP_SECRET,
  callbackURL: `${BACKEND_URL}api/v1/auth/twitter/callback`,
  includeEmail: true,
};

const googleSetup = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${BACKEND_URL}api/v1/auth/google/callback`
};

const facebookStrategy = new FacebookStrategy(facebookSetup, socialCallback);
const twitterStrategy = new TwitterStrategy(twitterSetup, socialCallback);
const googleStrategy = new GoogleStrategy(googleSetup, socialCallback);

export { facebookStrategy, twitterStrategy, googleStrategy };
