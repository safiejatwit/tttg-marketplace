// backend/src/controllers/messageController.js
import Message from '../models/message.js'; // your Mongoose model, adjust path as needed

/**
 * POST /api/messages
 * Body: { threadId, text }
 * Creates a new message in a thread. Requires authentication.
 */
export async function createMessage(req, res) {
  try {
    const { threadId, text } = req.body;
    if (!threadId || !text) {
      return res.status(400).json({ message: 'Missing threadId or text' });
    }
    const message = await Message.create({
      threadId,
      senderId: req.user.id,
      text,
      createdAt: new Date()
    });
    res.status(201).json(message);
  } catch (err) {
    console.error('Error creating message:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

/**
 * GET /api/messages/:threadId
 * Retrieves all messages for a given thread. Requires authentication.
 */
export async function getMessages(req, res) {
  try {
    const { threadId } = req.params;
    const messages = await Message.find({ threadId })
      .sort({ createdAt: 1 })
      .populate('senderId', 'name');
    res.json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ message: 'Server error' });
  }
}
