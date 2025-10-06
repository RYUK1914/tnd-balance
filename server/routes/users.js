const express = require('express');
const router = express.Router();
const { User, Category, Expense } = require('../models');

// Create a new user
router.post('/', async (req, res) => {
  try {
    const { name, salary } = req.body;
    const user = await User.create({ name, salary });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user by ID with categories and expenses//READ
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{
        model: Category,
        as: 'categories',
        include: [{
          model: Expense,
          as: 'expenses'
        }]
      }]
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update user salary
router.put('/:id/salary', async (req, res) => {
  try {
    const { salary } = req.body;
    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    user.salary = salary;
    await user.save();
    
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;