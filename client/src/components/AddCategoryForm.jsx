import React, { useState } from 'react'

function AddCategoryForm({ onAddCategory }) {
  const [categoryName, setCategoryName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (categoryName.trim()) {
      onAddCategory(categoryName)
      setCategoryName('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Add new category (e.g., Food, Sport, House)"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <button className="btn btn-success" type="submit">
          Add Category
        </button>
      </div>
    </form>
  )
}

export default AddCategoryForm