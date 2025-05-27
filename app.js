const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const passRoutes = require('./routes/passRoutes');

const app = express();

const allowedOrigins = ['https://gatepass-frontend.vercel.app'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/pass', passRoutes);

module.exports = app;
