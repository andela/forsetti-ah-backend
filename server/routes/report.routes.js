import { Router } from 'express';
import { ReportController, ReportCategoryController } from '../controllers';
import {
  tryCatch,
  reportCheck,
  articleExist,
  reportTypeCheck,
} from '../utils';

import { signInAuth } from '../utils/users/permissions.util';

const { createReport } = ReportController;
const { getAll } = ReportCategoryController;

const router = new Router();

router.get('/categories', signInAuth, tryCatch(getAll));
router.post('/', [reportCheck, signInAuth, articleExist, reportTypeCheck], tryCatch(createReport));

export default router;
