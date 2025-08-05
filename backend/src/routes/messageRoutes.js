// backend/src/routes/messageRoutes.js

import { Router } from 'express';
import { createMessage, getMessages } from '../controllers/messageController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Create a new message on a thread (requires auth)
router.post('/', requireAuth, createMessage);

// Fetch all messages in a thread (requires auth)
router.get('/:threadId', requireAuth, getMessages);

export default router;
