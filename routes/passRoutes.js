const express = require('express');
const router = express.Router();
const passController = require('../controllers/passController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.post('/create', authMiddleware, passController.createPass);
router.get('/all', authMiddleware, passController.getPasses);
router.patch('/update/:id', authMiddleware, passController.updateLeftStatus);

module.exports = router;
