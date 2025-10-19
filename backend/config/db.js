const mongoose = require('mongoose');

// Directly hardcode your MongoDB URI here
const MONGODB_URI = "mongodb+srv://ramanjaneyalureddyvenna_db_user:vofhlnLUplmuqFvv@cluster0.gvoauc1.mongodb.net/jobwala?retryWrites=true&w=majority";

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

module.exports = connectDB;
