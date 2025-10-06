const express = require('express');
const router = express.Router();
const { Expense, Category } = require('../models');

// Create a new expense in a category
router.post('/', async (req, res) => {
  try {
    const { title, amount, categoryId } = req.body;
    
    // Create the expense
    const expense = await Expense.create({ title, amount, categoryId });
    
    // Update the category's totalAmount
    const category = await Category.findByPk(categoryId);
    if (category) {
      category.totalAmount = parseFloat(category.totalAmount) + parseFloat(amount);
      await category.save();
    }
    
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all expenses for a category
router.get('/category/:categoryId', async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      where: { categoryId: req.params.categoryId }
    });
    
    res.json(expenses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update an expense
router.put('/:id', async (req, res) => {
  try {
    const { title, amount } = req.body;
    const expense = await Expense.findByPk(req.params.id);
    
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    
    // Update category totalAmount if amount changed
    if (amount !== expense.amount) {
      const category = await Category.findByPk(expense.categoryId);
      if (category) {
        category.totalAmount = parseFloat(category.totalAmount) - parseFloat(expense.amount) + parseFloat(amount);
        await category.save();
      }
    }
    
    expense.title = title;
    expense.amount = amount;
    await expense.save();
    
    res.json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an expense
router.delete('/:id', async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);
    
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    
    // Update category totalAmount
    const category = await Category.findByPk(expense.categoryId);
    if (category) {
      category.totalAmount = parseFloat(category.totalAmount) - parseFloat(expense.amount);
      await category.save();
    }
    
    await expense.destroy();
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;