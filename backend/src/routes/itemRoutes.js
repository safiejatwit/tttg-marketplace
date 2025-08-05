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

const router = Router();

// Public
router.get('/',      getItems);
router.get('/:id',   getItem);

// Protected
router.post('/',     requireAuth, createItem);
router.put('/:id',   requireAuth, updateItem);
router.delete('/:id',requireAuth, deleteItem);

export default router;
