const express = require('express');
const { login } = require('../controllers/authController');
const router = express.Router();

router.post('/login', login);

const supabase = require('../supabaseClient');

router.get('/test-users', async (req, res) => {
  const { data, error } = await supabase.from('users').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});


module.exports = router;
