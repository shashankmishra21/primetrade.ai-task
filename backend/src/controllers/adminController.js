const prisma = require('../config/prisma');

const getAllTasks = async(req, res ) => {
    try{
        const task = await prisma.task.findMany({
            where: {userId: req.user.userId},
            orderBy: {createdAt: 'desc'}
    });
    res.status(200).json({
        success: true,
        count: task.length,
        task
    });

    } catch(error){
        console.error('Get tasks error:',error);
        res.status(500).json({
            success:false,
            message: 'Server error'
        });
    }
}

const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title) {
      return res.status(400).json({ 
        success: false, 
        message: 'Title is required' 
      });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description: description || '',
        status: status || 'PENDING',
        userId: req.user.userId
      }
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      task
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    // Check if task exists and belongs to user
    const existingTask = await prisma.task.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingTask) {
      return res.status(404).json({ 
        success: false, 
        message: 'Task not found' 
      });
    }

    if (existingTask.userId !== req.user.userId) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized' 
      });
    }

    const task = await prisma.task.update({
      where: { id: parseInt(id) },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(status && { status })
      }
    });

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      task
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const existingTask = await prisma.task.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingTask) {
      return res.status(404).json({ 
        success: false, 
        message: 'Task not found' 
      });
    }

    if (existingTask.userId !== req.user.userId) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized' 
      });
    }

    await prisma.task.delete({
      where: { id: parseInt(id) }
    });

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

module.exports = { 
  getAllTasks, 
  createTask, 
  updateTask, 
  deleteTask 
};