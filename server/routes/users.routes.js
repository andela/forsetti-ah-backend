import express, { Router } from 'express';
import {
  UserController,
  BookmarkController,
  ProfileController
} from '../controllers';
import { signInAuth, superAdminAuth } from '../utils/users/permissions.util';
import {
  tryCatch,
  UuidValidator,
  validateRole,
  imageUpload,
  validateProfile
} from '../utils';

const { updateUserRole, getUsers } = UserController;
const { getUserBookmark } = BookmarkController;
const { getProfileById, updateProfile } = ProfileController;
const { validId } = UuidValidator;
const router = new Router();

router.patch('/role/:id', signInAuth, superAdminAuth, validId, validateRole, tryCatch(updateUserRole));
router.patch('/role/:id', signInAuth, superAdminAuth, validId, validateRole, tryCatch(updateUserRole));
router.patch('/profile', signInAuth, imageUpload, validateProfile, tryCatch(updateProfile));
router.get('/bookmark', signInAuth, tryCatch(getUserBookmark));
router.get('/profile/:id', signInAuth, validId, tryCatch(getProfileById));
router.get('/', signInAuth, tryCatch(getUsers));

export default router;
