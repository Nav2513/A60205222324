require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('../logging-middleware/logger');
const urlRoutes = require('./routes/urlRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);
app.use('/', urlRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`✅ Server running at ${process.env.BASE_URL}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
  });
