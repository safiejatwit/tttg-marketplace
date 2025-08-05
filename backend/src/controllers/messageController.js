import Message from '../models/Message.js';

export async function sendMessage(req, res) {
  try {
    const { receiver, content } = req.body;
    const message = new Message({
      sender: req.user.id,
      receiver,
      content
    });
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function getConversation(req, res) {
  try {
    const { userId } = req.params;
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, receiver: userId },
        { sender: userId, receiver: req.user.id }
      ]
    }).sort('timestamp');
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}