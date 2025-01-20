import express from 'express';
import { startVideoCall, endCall } from '../controllers/call.js';

const router = express.Router();

// Route to start a video call
router.post('/start-call', startVideoCall);

// Route to end the call
router.post('/end-call', endCall);

export default router;
