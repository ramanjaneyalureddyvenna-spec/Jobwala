const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Review = require('../models/Review');
const { adminAuth } = require('../middleware/auth');

const reviewSchema = Joi.object({
  author: Joi.string().required(),
  content: Joi.string().required(),
  rating: Joi.number().min(1).max(5).optional()
});

router.get('/reviews', async (req, res, next) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }).lean();
    res.json({ reviews });
  } catch (err) { next(err); }
});

router.post('/admin/reviews', adminAuth, async (req, res, next) => {
  try {
    const { error, value } = reviewSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    const review = await Review.create({
      ...value,
      postedBy: req.admin._id
    });
    res.status(201).json({ message: 'Review posted', review });
  } catch (err) { next(err); }
});

router.put('/admin/reviews/:id', adminAuth, async (req, res, next) => {
  try {
    const { error, value } = reviewSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    review.author = value.author;
    review.content = value.content;
    review.rating = value.rating || review.rating;
    review.updatedAt = new Date();
    await review.save();
    res.json({ message: 'Review updated', review });
  } catch (err) { next(err); }
});

router.delete('/admin/reviews/:id', adminAuth, async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    await review.remove();
    res.json({ message: 'Review deleted' });
  } catch (err) { next(err); }
});

module.exports = router;
