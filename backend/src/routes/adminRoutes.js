const express = require('express');
const router = express.Router();
const { authenticateToken, isAdmin } = require('../middleware/auth');
const { 
  getAllUsers, 
  getAllTasksAdmin, 
  deleteAnyTask 
} = require('../controllers/adminController');

router.use(authenticateToken);
router.use(isAdmin);

router.get('/users', getAllUsers);
router.get('/tasks', getAllTasksAdmin);
router.delete('/tasks/:id', deleteAnyTask);

module.exports = router;
