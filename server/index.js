const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { sequelize, syncDatabase } = require('./models');

// Import routes - use relative paths
const userRoutes = require('./routes/users');
const categoryRoutes = require('./routes/categories');
const expenseRoutes = require('./routes/expenses');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/expenses', expenseRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'TND Balance API is running!' });
});

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    
    // Sync database tables
    await syncDatabase();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});