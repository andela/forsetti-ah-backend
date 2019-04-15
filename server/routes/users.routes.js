import express, { Router } from 'express';
import { UserController, BookmarkController } from '../controllers';
import { signInAuth, superAdminAuth } from '../utils/users/permissions.util';
import {
  tryCatch,
  idValidator,
  validateRole,
} from '../utils';

const { updateUserRole } = UserController;
const { getUserBookmark } = BookmarkController;
const router = new Router();

router.patch('/role/:id', signInAuth, superAdminAuth, idValidator, validateRole, tryCatch(updateUserRole));

router.get('/bookmark', signInAuth, tryCatch(getUserBookmark));

export default router;
