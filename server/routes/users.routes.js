import express, { Router } from 'express';
import { UserController, ProfileController } from '../controllers';
import { signInAuth, superAdminAuth } from '../utils/users/permissions.util';
import {
  tryCatch,
  idValidator,
  validateRole,
  validateProfile,
  imageUpload,
} from '../utils';

const { updateUserRole } = UserController;
const { getProfileById, updateProfile } = ProfileController;
const router = new Router();

router.patch('/role/:id', signInAuth, superAdminAuth, idValidator, validateRole, tryCatch(updateUserRole));
router.patch('/profile', signInAuth, imageUpload, validateProfile, tryCatch(updateProfile));
router.get('/profile/:id', signInAuth, idValidator, tryCatch(getProfileById));

export default router;
