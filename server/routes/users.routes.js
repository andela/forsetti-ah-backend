import express, { Router } from 'express';
import { UserController } from '../controllers';
import { signInAuth, superAdminAuth } from '../utils/users/permissions.util';
import {
  tryCatch,
  idValidator,
  validateRole,
} from '../utils';

const { updateUserRole } = UserController;
const router = new Router();

router.patch('/role/:id', signInAuth, superAdminAuth, idValidator, validateRole, tryCatch(updateUserRole));

export default router;
