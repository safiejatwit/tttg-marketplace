import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import itemRoutes from './routes/itemRoutes.js';
import messageRoutes from './routes/messageRoutes.js';

dotenv.config();
await connectDB();

const app = express();

// Resolve __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploaded files from backend/uploads (correct)
app.use(
  '/uploads',
  express.static(path.join(__dirname, '../../uploads'))
);
app.use(cors({
   origin: 'http://localhost:5174',
   credentials: true
}));

app.use(express.json());

// Configure Multer storage for handling photo uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${Date.now()}${ext}`);
  }
});
export const upload = multer({ storage });

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/messages', messageRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', time: new Date().toISOString() });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend listening on http://localhost:${PORT}`);
});
