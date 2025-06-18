// server/controllers/passController.js
const Pass = require('../models/Pass');

// ✅ HOD: Create a pass
exports.createPass = async (req, res) => {
  try {
    const pass = new Pass({
      ...req.body,
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

// ✅ HOD: View all passes issued by them
exports.getHodPasses = async (req, res) => {
  try {
    const data = await Pass.find({ issued_by: req.user.name }); // Only HOD's own passes
    res.json(data);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch HOD passes' });
  }
};

// ✅ WATCHMAN: View unchecked passes (left === false)
exports.getUncheckedPasses = async (req, res) => {
  try {
    const data = await Pass.find({ left: false }); // No filter on 'issued_by'
    res.json(data);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch unchecked passes' });
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
