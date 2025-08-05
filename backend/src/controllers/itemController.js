import Item from '../models/Item.js';

export async function createItem(req, res) {
  try {
    const { title, description, price, imageUrl, expiresAt } = req.body;
    const item = new Item({
      title,
      description,
      price,
      imageUrl,
      expiresAt,
      owner: req.user.id
    });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function getItems(req, res) {
  try {
    const items = await Item.find({ isActive: true }).populate('owner', 'name');
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function updateItem(req, res) {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    if (item.owner.toString() !== req.user.id) return res.sendStatus(403);

    Object.assign(item, req.body);
    await item.save();
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function deleteItem(req, res) {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    if (item.owner.toString() !== req.user.id) return res.sendStatus(403);

    item.isActive = false;
    await item.save();
    res.json({ message: 'Item unlisted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}