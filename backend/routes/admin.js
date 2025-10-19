const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const Admin = require('../models/Admin');
const { adminAuth } = require('../middleware/auth');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN || '7d';
const ADMIN_SETUP_SECRET = process.env.ADMIN_SETUP_SECRET || 'setup_secret';

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().optional(),
  setupSecret: Joi.string().required()
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

router.post('/setup', async (req, res, next) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    const { username, password, name, setupSecret } = value;
    if (setupSecret !== ADMIN_SETUP_SECRET) {
      return res.status(403).json({ message: 'Invalid setup secret' });
    }
    const exists = await Admin.findOne({ username });
    if (exists) return res.status(400).json({ message: 'Admin username already exists' });
    const passwordHash = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ username, passwordHash, name });
    return res.status(201).json({ message: 'Admin created', adminId: admin._id });
  } catch (err) { next(err); }
});

router.post('/login', async (req, res, next) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    const { username, password } = value;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, admin.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: admin._id, username: admin.username }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });
    res.json({ token, expiresIn: TOKEN_EXPIRES_IN, admin: { id: admin._id, username: admin.username, name: admin.name } });
  } catch (err) { next(err); }
});

router.get('/me', adminAuth, (req, res) => {
  res.json({ admin: req.admin });
});

module.exports = router;

