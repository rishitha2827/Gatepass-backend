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

// HOD: View only passes they issued and status is false (unchecked)
router.get(
  '/hod/unchecked',
  authMiddleware,
  authorizeRoles('hod'),
  passController.getHodUncheckedPasses
);

// HOD: View only passes they issued and status is true (past)
router.get(
  '/hod/history',
  authMiddleware,
  authorizeRoles('hod'),
  passController.getHodPastPasses
);

// WATCHMAN: View all passes where left is false
router.get(
  '/watchman/unchecked',
  authMiddleware,
  authorizeRoles('watchman'),
  passController.getAllUncheckedPasses
);

// WATCHMAN: Mark pass as left
router.patch(
  '/update/:id',
  authMiddleware,
  authorizeRoles('watchman'),
  passController.updateLeftStatus
);

module.exports = router;
