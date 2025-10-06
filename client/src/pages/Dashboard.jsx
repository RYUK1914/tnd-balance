import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import AddCategoryForm from '../components/AddCategoryForm'
import CategoryTabs from '../components/CategoryTabs'
import ExpenseList from '../components/ExpenseList'
import AddExpenseForm from '../components/AddExpenseForm'
import SummaryPanel from '../components/SummaryPanel'
import SpendingChart from '../components/SpendingChart'
import { usersAPI, categoriesAPI, expensesAPI } from '../api/api'

function Dashboard() {
  const [user, setUser] = useState(null)
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState(null)
  const [loading, setLoading] = useState(true)

  // Load user and categories on component mount
  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      setLoading(true)
      // For now, we'll use user ID 1. Later we can add authentication
      const userResponse = await usersAPI.get(1)
      setUser(userResponse.data)
      
      const categoriesResponse = await categoriesAPI.getByUser(1)
      setCategories(categoriesResponse.data)
      
      if (categoriesResponse.data.length > 0) {
        setActiveCategory(categoriesResponse.data[0])
      }
    } catch (error) {
      console.error('Error loading user data:', error)
      // If user doesn't exist, create a default one
      await createDefaultUser()
    } finally {
      setLoading(false)
    }
  }

  const createDefaultUser = async () => {
    try {
      const userResponse = await usersAPI.create({
        name: 'Default User',
        salary: 2000
      })
      setUser(userResponse.data)
      setCategories([])
    } catch (error) {
      console.error('Error creating default user:', error)
    }
  }

  // Add a new category
  const handleAddCategory = async (name) => {
    try {
      const response = await categoriesAPI.create({
        name,
        userId: 1 // Using user ID 1 for now
      })
      const newCategory = response.data
      setCategories([...categories, newCategory])
      if (!activeCategory) {
        setActiveCategory(newCategory)
      }
    } catch (error) {
      console.error('Error adding category:', error)
      alert('Error adding category. Please try again.')
    }
  }

  // Add expense to active category
  const handleAddExpense = async (title, amount) => {
    if (!activeCategory) return

    try {
      const response = await expensesAPI.create({
        title,
        amount,
        categoryId: activeCategory.id
      })
      
      // Reload categories to get updated totals
      const categoriesResponse = await categoriesAPI.getByUser(1)
      setCategories(categoriesResponse.data)
      
      // Update active category with new expense
      const updatedActiveCategory = categoriesResponse.data.find(
        cat => cat.id === activeCategory.id
      )
      setActiveCategory(updatedActiveCategory)
    } catch (error) {
      console.error('Error adding expense:', error)
      alert('Error adding expense. Please try again.')
    }
  }

  // Delete expense
  const handleDeleteExpense = async (expenseId) => {
    try {
      await expensesAPI.delete(expenseId)
      
      // Reload categories to get updated totals
      const categoriesResponse = await categoriesAPI.getByUser(1)
      setCategories(categoriesResponse.data)
      
      // Update active category
      if (activeCategory) {
        const updatedActiveCategory = categoriesResponse.data.find(
          cat => cat.id === activeCategory.id
        )
        setActiveCategory(updatedActiveCategory)
      }
    } catch (error) {
      console.error('Error deleting expense:', error)
      alert('Error deleting expense. Please try again.')
    }
  }

  // Update salary
  const handleSalaryUpdate = async (newSalary) => {
    try {
      const response = await usersAPI.updateSalary(1, newSalary)
      setUser(response.data)
    } catch (error) {
      console.error('Error updating salary:', error)
    }
  }

  if (loading) {
    return (
      <div className="container-fluid">
        <Header />
        <div className="d-flex justify-content-center mt-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    )
  }

  const totalExpenses = categories.reduce((total, category) => total + parseFloat(category.totalAmount), 0)

  return (
    <div className="container-fluid">
      <Header onSalaryUpdate={handleSalaryUpdate} />
      
      <div className="row mt-4">
        {/* Left Column - Categories & Expenses */}
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <AddCategoryForm onAddCategory={handleAddCategory} />
              
              {categories.length > 0 && (
                <>
                  <CategoryTabs
                    categories={categories}
                    activeCategory={activeCategory}
                    onCategorySelect={setActiveCategory}
                  />
                  
                  {activeCategory && (
                    <>
                      <AddExpenseForm onAddExpense={handleAddExpense} />
                      <ExpenseList
                        expenses={activeCategory.expenses || []}
                        onDeleteExpense={handleDeleteExpense}
                      />
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        
        <div className="col-lg-4">
          <div className="row">
            <div className="col-12 mb-4">
              <SummaryPanel 
                salary={user?.salary || 0} 
                totalExpenses={totalExpenses} 
              />
            </div>
            <div className="col-12">
              <SpendingChart categories={categories} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard