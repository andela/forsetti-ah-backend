import { Router } from 'express';
import { ReportController } from '../controllers';
import {
  tryCatch,
  reportCheck,
  articleExist,
  reportTypeCheck,
} from '../utils';

import { signInAuth } from '../utils/users/permissions.util';

const { createReport } = ReportController;

const router = new Router();

router.post('/', [reportCheck, signInAuth, articleExist, reportTypeCheck], tryCatch(createReport));

export default router;
