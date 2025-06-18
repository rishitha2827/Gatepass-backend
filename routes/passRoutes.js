const express = require('express');
const router = express.Router();
const passController = require('../controllers/passController');
const { authMiddleware, authorizeRoles } = require('../middlewares/authMiddleware');

// HOD: Create a pass
router.post(
  '/create',
  authMiddleware,
  authorizeRoles('hod'),
  passController.createPass
);

// HOD: View passes they issued
router.get(
  '/issued',
  authMiddleware,
  authorizeRoles('HOD'), // or 'hod', match case with DB
  passController.getHodPasses
);

// WATCHMAN: View all unchecked passes
router.get(
  '/unchecked',
  authMiddleware,
  authorizeRoles('watchman'),
  passController.getUncheckedPasses
);

// WATCHMAN: Update student left status
router.patch(
  '/update/:id',
  authMiddleware,
  authorizeRoles('watchman'),
  passController.updateLeftStatus
);

router.get(
  '/issued',
  authMiddleware,
  authorizeRoles('hod'),
  passController.getHodPasses
);

router.get(
  '/unchecked',
  authMiddleware,
  authorizeRoles('hod'),
  passController.getUncheckedPasses
);

module.exports = router;
