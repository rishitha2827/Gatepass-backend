const supabase = require('../supabaseClient');

// ✅ HOD: Create a pass
exports.createPass = async (req, res) => {
  const { student_name, branch, year, date, time, reason } = req.body;
  const issued_by = req.user.name;

  const { data, error } = await supabase.from('passes').insert([
    {
      student_name,
      branch,
      year,
      date,
      time,
      reason,
      issued_by,
      left: false,
    },
  ]);

  if (error) {
    console.error("Supabase Insert Error:", error);
    return res.status(500).json({ error: error.message });
  }

  res.json({ message: 'Pass created successfully', data });
};

// ✅ HOD: View all passes issued by them
exports.getHodPasses = async (req, res) => {
  const hodName = req.user.name;

  const { data, error } = await supabase
    .from('passes')
    .select('*')
    .eq('issued_by', hodName);

  if (error) {
    console.error("Fetch error:", error);
    return res.status(500).json({ error: 'Failed to fetch passes' });
  }

  res.json(data);
};

// ✅ WATCHMAN: View unchecked passes (left === false)
exports.getUncheckedPasses = async (req, res) => {
  const { data, error } = await supabase
    .from('passes')
    .select('*')
    .eq('left', false);

  if (error) {
    console.error("Fetch error:", error);
    return res.status(500).json({ error: 'Failed to fetch unchecked passes' });
  }

  res.json(data);
};

// ✅ WATCHMAN: Mark student as left
exports.updateLeftStatus = async (req, res) => {
  const { id } = req.params;
  const { left } = req.body;

  const { error } = await supabase
    .from('passes')
    .update({ left })
    .eq('id', id);

  if (error) {
    console.error("Update error:", error);
    return res.status(500).json({ error: 'Failed to update status' });
  }

  res.json({ message: 'Pass status updated' });
};

exports.getHodPasses = async (req, res) => {
  const issued_by = req.user.name;

  const { data, error } = await supabase
    .from('passes')
    .select('*')
    .eq('issued_by', issued_by);

  if (error) return res.status(500).json({ error: 'Failed to fetch passes' });
  res.json(data);
};

exports.getUncheckedPasses = async (req, res) => {
  const issued_by = req.user.name;

  const { data, error } = await supabase
    .from('passes')
    .select('*')
    .eq('issued_by', issued_by)
    .eq('left', false);

  if (error) return res.status(500).json({ error: 'Failed to fetch unchecked passes' });
  res.json(data);
};
