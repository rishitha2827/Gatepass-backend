const supabase = require('../supabaseClient');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const { data: users, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single();

  if (error || !users) return res.status(400).json({ error: 'User not found' });

  const validPassword = await bcrypt.compare(password, users.password);
  if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign(
    { id: users.id, role: users.role, name: users.username },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.json({ token });
};
