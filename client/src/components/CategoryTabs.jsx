import React from 'react'

function CategoryTabs({ categories, activeCategory, onCategorySelect }) {
  return (
    <ul className="nav nav-tabs mb-3">
      {categories.map((category) => (
        <li key={category.id} className="nav-item">
          <button
            className={`nav-link ${activeCategory?.id === category.id ? 'active' : ''}`}
            onClick={() => onCategorySelect(category)}
          >
            {category.name}
            <span className="badge bg-secondary ms-2">{category.totalAmount} TND</span>
          </button>
        </li>
      ))}
    </ul>
  )
}

export default CategoryTabs