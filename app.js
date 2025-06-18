const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const passRoutes = require('./routes/passRoutes');

const app = express();

<<<<<<< HEAD
const allowedOrigins = ['https://gatepass-frontend.vercel.app/', 
  'http://localhost:5501',
  'http://127.0.0.1:5501'
];
=======
const allowedOrigins = ['https://gatepass-frontend.vercel.app'];
>>>>>>> 9fd734a8a183b355666a1802390fbf120de76934

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/pass', passRoutes);

module.exports = app;
