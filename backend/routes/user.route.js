import expess from 'express';
import { test, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = expess.Router();

// Getting the information
router.get('/', test);
router.post('/update/:id', verifyToken, updateUser);

export default router;