// backend/src/models/item.js
import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title:           { type: String, required: true },
  description:     { type: String, required: true },
  price:           { type: Number, required: true },
  condition:       { type: String, enum: ['New','Like-new','Good','Fair'], default: 'Good' },
  photos:          [String],
  availabilityEnd: { type: Date, required: true },
}, { timestamps: true });

export default mongoose.model('Item', itemSchema);
