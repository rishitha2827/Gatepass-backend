const Pass = require('../models/Pass');

// ✅ HOD: Create a pass
exports.createPass = async (req, res) => {
  try {
    const { rollno, branch, year, date, time, reason } = req.body;

const pass = new Pass({
  rollno,
  branch,
  year,
  date,
  time,
  reason,
  issued_by: req.user.name,
  left: false,
});

    const result = await pass.save();
    res.json({ message: 'Pass created successfully', data: result });
  } catch (error) {
    console.error('Insert Error:', error);
    res.status(500).json({ error: 'Failed to create pass' });
  }
};

// ✅ HOD: Get passes they issued and are pending (left === false)
exports.getHodUncheckedPasses = async (req, res) => {
  try {
    const data = await Pass.find({
      issued_by: req.user.name,
      left: false
    });
    res.json(data);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch unchecked passes' });
  }
};

// ✅ HOD: Get passes they issued and are completed (left === true)
exports.getHodPastPasses = async (req, res) => {
  try {
    const data = await Pass.find({
      issued_by: req.user.name,
      left: true
    });
    res.json(data);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch past passes' });
  }
};

// ✅ WATCHMAN: See all unchecked passes
exports.getAllUncheckedPasses = async (req, res) => {
  try {
    const data = await Pass.find({ left: false });
    res.json(data);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch all unchecked passes' });
  }
};

// ✅ WATCHMAN: Mark student as left
exports.updateLeftStatus = async (req, res) => {
  try {
    await Pass.findByIdAndUpdate(req.params.id, { left: req.body.left });
    res.json({ message: 'Pass status updated' });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ error: 'Failed to update status' });
  }
};
