import { expect } from 'chai';
import db from '../models';
import { newArticleMail, newFollowerMail, newCommentMail } from '../utils';

const { Notification } = db;

describe('Email notification', () => {
  describe('New article notificaion', () => {
    // Process email notification function for new article
    before(async () => {
      // IDs provided by seeded data
      await newArticleMail('3d1c5f17-7580-4cea-8647-99e7440c5d43', 'Article test notification', 'ddbc0491-f25b-44c1-a5df-25795fc7fada');
    });

    it('notifications should be present in the database for a follower', async () => {
      const notification = await Notification.findAll({
        where: {
          type: 'article'
        },
      });
      expect(notification[0].userId).to.equal('ab32abe7-8233-482e-a6fe-d4ffab90c9be');
    });
  });

  describe('New follower notificaion', () => {
    // Process email notification function for new follower
    before(async () => {
      // IDs provided by seeded data
      await newFollowerMail('3d1c5f17-7580-4cea-8647-99e7440c5d43', 'fd7355e2-5593-4547-8444-79d4bc1622bc');
    });

    it('notification should be present in the database for the user being followed', async () => {
      const notification = await Notification.findAll({
        where: {
          type: 'follow'
        },
      });
      expect(notification[0].userId).to.equal('3d1c5f17-7580-4cea-8647-99e7440c5d43');
    });
  });

  describe('New comment notificaion', () => {
    // Process email notification function for new comment
    before(async () => {
      // IDs provided by seeded data
      await newCommentMail('ddbc0491-f25b-44c1-a5df-25795fc7fada', 'fd7355e2-5593-4547-8444-79d4bc1622bc');
    });

    it('notification should be present in the database for the author of the article commented on', async () => {
      const notification = await Notification.findAll({
        where: {
          type: 'comment'
        },
      });
      expect(notification[0].userId).to.equal('3d1c5f17-7580-4cea-8647-99e7440c5d43');
    });
  });
});
