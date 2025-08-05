// backend/src/routes/itemRoutes.js
import { Router } from 'express';
import {
  createItem,
  getItems,
  getItem,
  updateItem,
  deleteItem
} from '../controllers/itemController.js';
import { requireAuth } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';  // only import here

const router = Router();

// Public
router.get('/',    getItems);
router.get('/:id', getItem);

// Protected (handles file uploads)
router.post(
  '/',
  requireAuth,
  upload.array('photos', 5),  // ← Multer will parse up to 5 files here
  createItem
);
router.put('/:id',    requireAuth, updateItem);
router.delete('/:id', requireAuth, deleteItem);

export default router;
