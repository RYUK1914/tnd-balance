import React from 'react'

function SpendingChart({ categories }) {
  // For now, we'll show a simple list. We'll add Chart.js later.
  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title mb-0">📊 Spending by Category</h5>
      </div>
      <div className="card-body">
        {categories.length === 0 ? (
          <p className="text-muted">No categories yet. Add some expenses to see the chart.</p>
        ) : (
          <div className="list-group">
            {categories.map((category) => (
              <div key={category.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{category.name}</span>
                <span className="badge bg-primary rounded-pill">{category.totalAmount} TND</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SpendingChart