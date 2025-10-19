const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Joi = require('joi');
const Job = require('../models/Job');
const { adminAuth } = require('../middleware/auth');
const fs = require('fs');

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${Math.random().toString(36).substring(2,8)}${ext}`;
    cb(null, name);
  }
});
const upload = multer({ storage });

const jobSchema = Joi.object({
  title: Joi.string().required(),
  company: Joi.string().allow('', null),
  location: Joi.string().allow('', null),
  description: Joi.string().required(),
  applyUrl: Joi.string().uri().allow('', null)
});

router.get('/jobs', async (req, res, next) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 }).limit(25).lean();
    const host = `${req.protocol}://${req.get('host')}`;
    const jobsWithUrls = jobs.map(j => ({
      ...j,
      imageUrl: j.imageUrl ? `${host}/${j.imageUrl}` : null
    }));
    res.json({ jobs: jobsWithUrls });
  } catch (err) { next(err); }
});

router.post('/admin/jobs', adminAuth, upload.single('image'), async (req, res, next) => {
  try {
    const body = req.body;
    const { error } = jobSchema.validate(body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const jobData = {
      title: body.title,
      company: body.company,
      location: body.location,
      description: body.description,
      applyUrl: body.applyUrl || null,
      postedBy: req.admin._id
    };

    if (req.file) jobData.imageUrl = `uploads/${req.file.filename}`;

    const job = await Job.create(jobData);
    res.status(201).json({ message: 'Job posted', job });
  } catch (err) { next(err); }
});

router.put('/admin/jobs/:id', adminAuth, upload.single('image'), async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const { error } = jobSchema.validate(body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const job = await Job.findById(id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (req.file && job.imageUrl) {
      const oldPath = job.imageUrl.startsWith('uploads/') ? job.imageUrl : null;
      if (oldPath) {
        const fullOld = path.join(__dirname, '..', oldPath);
        fs.unlink(fullOld, (e) => { /* ignore errors */ });
      }
      job.imageUrl = `uploads/${req.file.filename}`;
    }
    job.title = body.title;
    job.company = body.company;
    job.location = body.location;
    job.description = body.description;
    job.applyUrl = body.applyUrl || null;
    job.updatedAt = new Date();
    await job.save();
    res.json({ message: 'Job updated', job });
  } catch (err) { next(err); }
});

router.delete('/admin/jobs/:id', adminAuth, async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.imageUrl && job.imageUrl.startsWith('uploads/')) {
      const fullPath = path.join(__dirname, '..', job.imageUrl);
      fs.unlink(fullPath, (e) => { /* ignore */ });
    }
    await job.remove();
    res.json({ message: 'Job deleted' });
  } catch (err) { next(err); }
});

module.exports = router;
