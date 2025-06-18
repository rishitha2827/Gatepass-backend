// server/controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // MongoDB model

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username and password (plain-text match)
    const user = await User.findOne({ username, password });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    // Create JWT token with role info
    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
};
