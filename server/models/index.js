const sequelize = require('../database');
const User = require('./user');
const Category = require('./category');
const Expense = require('./expense');

// Define associations

// User → Categories: One-to-Many
User.hasMany(Category, {
  foreignKey: 'userId',
  as: 'categories'
});

Category.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

// Category → Expenses: One-to-Many
Category.hasMany(Expense, {
  foreignKey: 'categoryId',
  as: 'expenses'
});

Expense.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category'
});

// Sync database (create tables)
const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false }); // Set force: true to drop tables and recreate
    console.log('Database tables synced successfully');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

module.exports = {
  sequelize,
  User,
  Category,
  Expense,
  syncDatabase
};