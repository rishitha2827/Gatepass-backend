const supabase = require('../supabaseClient');

exports.createPass = async (req, res) => {
  const { student_name, student_email, branch, year, date, time, reason } = req.body;
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
  res.json({ message: 'Pass created' });
};

exports.getPasses = async (req, res) => {
  const { data, error } = await supabase.from('passes').select('*');
  if (error) return res.status(500).json({ error: 'Failed to fetch passes' });
  res.json(data);
};

exports.updateLeftStatus = async (req, res) => {
  const { id } = req.params;
  const { left } = req.body;

  const { error } = await supabase.from('passes').update({ left }).eq('id', id);
  if (error) return res.status(500).json({ error: 'Failed to update status' });

  res.json({ message: 'Status updated' });
};