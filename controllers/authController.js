const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const supabase = require('../supabaseClient');

exports.login = async (req, res) => {
  const { email, password } = req.body;

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
};
