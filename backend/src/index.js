import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());

app.get('/api/health', (req, res) =>
  res.json({ status: 'OK', time: new Date().toISOString() })
);

const PORT = process.env.PORT || 4000;
import { connectDB } from './config/db.js';
await connectDB();

app.listen(PORT, () =>
  console.log(`🚀 Backend listening on http://localhost:${PORT}`)
);
