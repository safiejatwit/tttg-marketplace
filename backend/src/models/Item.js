import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: Number,
  imageUrl: String,
  isActive: { type: Boolean, default: true },
  expiresAt: Date,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);
export default Item;
