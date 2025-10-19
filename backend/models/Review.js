const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  author: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

module.exports = mongoose.model('Review', ReviewSchema);
