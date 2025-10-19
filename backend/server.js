const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const connectDB = require('./config/db');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const adminRoutes = require('./routes/admin');
const jobsRoutes = require('./routes/jobs');
const reviewsRoutes = require('./routes/reviews');
const errorHandler = require('./middleware/errorHandler');

const app = express();

connectDB(process.env.MONGO_URI);

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/admin', adminRoutes);
app.use('/', jobsRoutes);
app.use('/', reviewsRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'JobWala API is running' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
