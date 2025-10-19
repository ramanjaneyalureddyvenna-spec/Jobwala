const mongoose = require('mongoose');

async function connectDB(mongodb+srv://ramanjaneyalureddyvenna_db_user:CraVJmJUs7tdzRHb@cluster0.gvoauc1.mongodb.net/jobwala?retryWrites=true&w=majority {
  try {
    await mongoose.connect(mongodb+srv://ramanjaneyalureddyvenna_db_user:CraVJmJUs7tdzRHb@cluster0.gvoauc1.mongodb.net/jobwala?retryWrites=true&w=majority, {
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
