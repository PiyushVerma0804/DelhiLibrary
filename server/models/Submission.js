import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [500, 'Title cannot exceed 500 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  libraryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Library',
    required: [true, 'Library ID is required']
  },
  type: {
    type: String,
    enum: ['photo', 'document', 'field_note'],
    required: [true, 'Type is required']
  },
  source: {
    type: String,
    required: [true, 'Source is required'],
    trim: true,
    maxlength: [200, 'Source cannot exceed 200 characters']
  },
  year: {
    type: Number,
    min: [1000, 'Year must be at least 1000'],
    max: [new Date().getFullYear(), 'Year cannot be in the future']
  },
  language: {
    type: String,
    trim: true,
    maxlength: [50, 'Language cannot exceed 50 characters']
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [50, 'Tag cannot exceed 50 characters']
  }],
  fileUrl: {
    type: String,
    required: [true, 'File URL is required'],
    trim: true,
    match: [/^https?:\/\/.+\..+/, 'Please provide a valid URL starting with http:// or https://']
  },
  contributorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Contributor ID is required']
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
    // Note: Status should NOT be set by user input, only updated by admin logic in controller
  }
}, {
  timestamps: true
});

// Custom validator to limit tags to maximum 10
submissionSchema.path('tags').validate(function(value) {
  return value.length <= 10;
}, 'Maximum 10 tags allowed');

export default mongoose.model('Submission', submissionSchema);
