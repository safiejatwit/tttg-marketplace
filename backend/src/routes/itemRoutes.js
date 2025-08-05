import { Router } from 'express';
import {
  createItem,
  getItems,
  updateItem,
  deleteItem
} from '../controllers/itemController.js';
import auth from '../middleware/auth.js';

const router = Router();

router.get('/', getItems);
router.post('/', auth, createItem);
router.put('/:id', auth, updateItem);
router.delete('/:id', auth, deleteItem);

export default router;