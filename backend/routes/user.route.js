import expess from 'express';
import { test } from '../controllers/user.controller.js';

const router = expess.Router();

// Getting the information
router.get('/', test);

export default router;