// backend/src/controllers/itemController.js
import Item from '../models/item.js';

/**
 * GET /api/items
 * Fetch a list of items, sorted by newest first.
 */
export async function getItems(req, res) {
  try {
    const items = await Item.find({})
      .sort({ createdAt: -1 })
      .limit(100)
      .populate('sellerId', 'name');
    res.json(items);
  } catch (err) {
    console.error('Error listing items:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

/**
 * GET /api/items/:id
 * Fetch a single item by its ID.
 */
export async function getItem(req, res) {
  try {
    const { id } = req.params;
    const item = await Item.findById(id)
      .populate('sellerId', 'name email');
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    console.error('Error fetching item:', err);
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid item ID' });
    }
    res.status(500).json({ message: 'Server error' });
  }
}

/**
 * POST /api/items
 * Create a new item. Requires authentication.
 */
export async function createItem(req, res) {
  try {
    const { title, description, price, condition, availabilityEnd, photos } = req.body;
    if (!title || !description || !price || !availabilityEnd) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const sellerId = req.user.id;
    const item = await Item.create({
      sellerId,
      title,
      description,
      price,
      condition,
      availabilityEnd,
      photos: photos || []
    });
    res.status(201).json(item);
  } catch (err) {
    console.error('Error creating item:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

/**
 * PUT /api/items/:id
 * Update an existing item. Requires authentication.
 */
export async function updateItem(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;
    // Ensure the seller owns the item
    const item = await Item.findById(id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    if (item.sellerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    Object.assign(item, updates);
    await item.save();
    res.json(item);
  } catch (err) {
    console.error('Error updating item:', err);
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid item ID' });
    }
    res.status(500).json({ message: 'Server error' });
  }
}

/**
 * DELETE /api/items/:id
 * Delete an item. Requires authentication.
 */
export async function deleteItem(req, res) {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    if (item.sellerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    await item.deleteOne();
    res.status(204).end();
  } catch (err) {
    console.error('Error deleting item:', err);
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid item ID' });
    }
    res.status(500).json({ message: 'Server error' });
  }
}
