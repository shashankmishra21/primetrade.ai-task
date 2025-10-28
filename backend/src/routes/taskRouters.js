const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { 
  getAllTasks, 
  createTask, 
  updateTask, 
  deleteTask 
} = require('../controllers/taskController');

router.use(authenticateToken);

router.get('/', getAllTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
