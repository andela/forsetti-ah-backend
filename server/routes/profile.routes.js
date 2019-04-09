import express, { Router } from 'express';
import { ProfileController } from '../controllers';
import { signInAuth } from '../utils/users/permissions.util';
import {
  tryCatch,
  idValidator,
  validateProfile,
  imageUpload,
} from '../utils';

const {
  followUser, unfollowUser, updateProfile, getProfileById
} = ProfileController;
const router = new Router();

router.post('/:username/follow', [signInAuth], tryCatch(followUser));
router.delete('/:username/follow', [signInAuth], tryCatch(unfollowUser));
router.patch('/', signInAuth, imageUpload, validateProfile, tryCatch(updateProfile));
router.get('/:id', signInAuth, idValidator, tryCatch(getProfileById));

export default router;
