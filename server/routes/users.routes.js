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
} from '../utils';

const { updateUserRole, getUsers } = UserController;
const { getUserBookmark } = BookmarkController;
const { validId } = UuidValidator;
const router = new Router();

router.patch('/role/:id', signInAuth, superAdminAuth, validId, validateRole, tryCatch(updateUserRole));
router.get('/bookmark', signInAuth, tryCatch(getUserBookmark));
router.get('/', signInAuth, tryCatch(getUsers));

export default router;
