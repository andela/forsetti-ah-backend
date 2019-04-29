import express, { Router } from 'express';
import { ProfileController } from '../controllers';
import { signInAuth } from '../utils/users/permissions.util';
import {
  tryCatch,
  UuidValidator,
  validateProfile,
  imageUpload,
} from '../utils';

const {
  followUser,
  unfollowUser,
  updateProfile,
  getProfileById,
  getFollowers,
  getNotifications,
  getFollowee
} = ProfileController;
const { validId } = UuidValidator;
const router = new Router();

router.post('/:username/follow', [signInAuth], tryCatch(followUser));
router.delete('/:username/follow', [signInAuth], tryCatch(unfollowUser));
router.get('/followers', signInAuth, tryCatch(getFollowers));
router.get('/followee', signInAuth, tryCatch(getFollowee));
router.get('/notifications', signInAuth, tryCatch(getNotifications));
router.get('/:id', signInAuth, validId, tryCatch(getProfileById));
router.patch('/', signInAuth, imageUpload, validateProfile, tryCatch(updateProfile));

export default router;
