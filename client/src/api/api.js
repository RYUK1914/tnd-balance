import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
})

// Users API
export const usersAPI = {
  create: (userData) => api.post('/users', userData),
  get: (id) => api.get(`/users/${id}`),
  updateSalary: (id, salary) => api.put(`/users/${id}/salary`, { salary }),
}

// Categories API
export const categoriesAPI = {
  create: (categoryData) => api.post('/categories', categoryData),
  getByUser: (userId) => api.get(`/categories/user/${userId}`),
  update: (id, categoryData) => api.put(`/categories/${id}`, categoryData),
  delete: (id) => api.delete(`/categories/${id}`),
}

// Expenses API
export const expensesAPI = {
  create: (expenseData) => api.post('/expenses', expenseData),
  getByCategory: (categoryId) => api.get(`/expenses/category/${categoryId}`),
  update: (id, expenseData) => api.put(`/expenses/${id}`, expenseData),
  delete: (id) => api.delete(`/expenses/${id}`),
}

export default api