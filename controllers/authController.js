// server/controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // MongoDB model

exports.login = async (req, res) => {
  const { email, password } = req.body;

<<<<<<< HEAD
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
=======
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !user) return res.status(400).json({ message: 'User not found' });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign(
    { id: user.id, role: user.role, name: user.firstName },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.json({ token, user });
};

// 🔧 Add this function
exports.register = async (req, res) => {
  const { firstName, lastName, email, mobile, password, unit, role } = req.body;

  // Check if user already exists
  const { data: existingUser } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase.from('users').insert([
    {
      firstName,
      lastName,
      email,
      mobile,
      password: hashedPassword,
      unit,
      role,
    },
  ]);

  if (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Registration failed' });
  }

  res.status(201).json({ message: 'User registered successfully' });
>>>>>>> 9fd734a8a183b355666a1802390fbf120de76934
};
