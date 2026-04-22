import mongoose from 'mongoose';

const librarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Library name is required'],
    trim: true,
    maxlength: [200, 'Library name cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
    maxlength: [200, 'Location cannot exceed 200 characters']
  },
  openingTime: {
    type: String,
    required: [true, 'Opening time is required'],
    trim: true
  },
  closingTime: {
    type: String,
    required: [true, 'Closing time is required'],
    trim: true
  },
  imageUrl: {
    type: String,
    trim: true
  },
  introContent: {
    type: String,
    required: false,
    trim: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Library', librarySchema);
