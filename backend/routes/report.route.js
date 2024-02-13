import express from 'express'
import { verifyToken } from '../utils/verifyUser.js';
import { SendReport, getReports, deleteReport } from '../controllers/report.controller.js';

const router = express.Router();

router.post('/send-report', verifyToken, SendReport);
router.get('/get-reports', verifyToken, getReports);
router.delete('/delete/:id', verifyToken, deleteReport);

export default router;