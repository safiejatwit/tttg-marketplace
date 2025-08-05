// backend/src/controllers/itemController.js
import Item from '../models/item.js';

/**
 * GET /api/items
 */
export async function getItems(req, res) {
  try {
    const items = await Item.find({})
      .sort({ createdAt: -1 })
      .limit(100);
    return res.json(items);
  } catch (err) {
    console.error('Error listing items:', err);
    return res.status(500).json({ message: 'Server error listing items' });
  }
}

/**
 * GET /api/items/:id
 */
export async function getItem(req, res) {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    return res.json(item);
  } catch (err) {
    console.error('Error fetching item:', err);
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid item ID' });
    }
    return res.status(500).json({ message: 'Server error' });
  }
}

/**
 * POST /api/items
 */
export async function createItem(req, res) {
  try {
    const { title, description, price, condition, availabilityEnd } = req.body;
    if (!title || !description || !price || !availabilityEnd) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Handle uploaded photos in req.files
    let photos = [];
    if (req.files && req.files.length) {
      photos = req.files.map(f =>
        `${req.protocol}://${req.get('host')}/uploads/${f.filename}`
      );
    }

    const item = await Item.create({
      sellerId: req.user.id,
      title,
      description,
      price,
      condition,
      availabilityEnd,
      photos
    });

    return res.status(201).json(item);
  } catch (err) {
    console.error('Error creating item:', err);
    return res.status(500).json({ message: 'Server error' });
  }
}

/**
 * PUT /api/items/:id
 */
export async function updateItem(req, res) {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    if (item.sellerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    Object.assign(item, req.body);
    await item.save();
    return res.json(item);
  } catch (err) {
    console.error('Error updating item:', err);
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid item ID' });
    }
    return res.status(500).json({ message: 'Server error' });
  }
}

/**
 * DELETE /api/items/:id
 */
export async function deleteItem(req, res) {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    if (item.sellerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    await item.deleteOne();
    return res.status(204).end();
  } catch (err) {
    console.error('Error deleting item:', err);
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid item ID' });
    }
    return res.status(500).json({ message: 'Server error' });
  }
}
