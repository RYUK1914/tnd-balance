import React from 'react'

function ExpenseList({ expenses, onDeleteExpense }) {
  if (expenses.length === 0) {
    return (
      <div className="alert alert-info">
        No expenses in this category yet. Add your first expense!
      </div>
    )
  }

  return (
    <div className="expense-list">
      {expenses.map((expense) => (
        <div key={expense.id} className="expense-item card mb-2">
          <div className="card-body py-2">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="mb-0">{expense.title}</h6>
              </div>
              <div className="d-flex align-items-center">
                <span className="text-danger fw-bold me-3">{expense.amount} TND</span>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onDeleteExpense(expense.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ExpenseList