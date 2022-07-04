import { getLogs, newLog } from '../controllers/statementsController';
import validateUser from '../middlewares/validateUser.js';
import express from 'express';


const router = express.Router();

router.get('/transactions', validateUser, getLogs);
router.post('/transaction', newLog);

export default router;