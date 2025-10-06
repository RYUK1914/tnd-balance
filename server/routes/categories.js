const express = require('express');
const router = express.Router();
const { Category, Expense } = require('../models');

// Create a new category for a user
router.post('/', async (req, res) => {
  try {
    const { name, userId } = req.body;
    const category = await Category.create({ name, userId, totalAmount: 0 });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all categories for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const categories = await Category.findAll({
      where: { userId: req.params.userId },
      include: [{
        model: Expense,
        as: 'expenses'
      }]
    });
    
    res.json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update category
router.put('/:id', async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.findByPk(req.params.id);
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    category.name = name;
    await category.save();
    
    res.json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete category
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    await category.destroy();
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;