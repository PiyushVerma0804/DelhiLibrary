import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import submissionRoutes from './routes/submissions.js';
import adminSubmissionRoutes from './routes/adminSubmissions.js';
import documentRoutes from './routes/documents.js';
import libraryRoutes from './routes/libraries.js';

dotenv.config({ path: "./.env" });

const app = express();

app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/admin/submissions', adminSubmissionRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/libraries', libraryRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API running' });
});

// 404 handler for invalid routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { error: err.stack })
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
