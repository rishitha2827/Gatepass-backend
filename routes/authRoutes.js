const express = require('express');
const { login } = require('../controllers/authController');
const router = express.Router();

router.post('/login', login);

const supabase = require('../supabaseClient');

module.exports = router;
