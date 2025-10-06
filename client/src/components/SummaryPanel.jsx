import React from 'react'

function SummaryPanel({ salary, totalExpenses }) {
  const freeMoney = salary - totalExpenses

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title mb-0">💰 Financial Summary</h5>
      </div>
      <div className="card-body">
        <div className="row text-center">
          <div className="col-md-4">
            <h6>Monthly Salary</h6>
            <p className="h4 text-primary">{salary} TND</p>
          </div>
          <div className="col-md-4">
            <h6>Total Expenses</h6>
            <p className="h4 text-danger">{totalExpenses} TND</p>
          </div>
          <div className="col-md-4">
            <h6>Free Money</h6>
            <p className="h4 free-money">{freeMoney} TND</p>
          </div>
        </div>
        {freeMoney >= 0 ? (
          <div className="alert alert-success mt-3 mb-0">
            ✅ You can still spend <strong>{freeMoney} TND</strong> this month.
          </div>
        ) : (
          <div className="alert alert-danger mt-3 mb-0">
            ⚠️ You've exceeded your budget by <strong>{Math.abs(freeMoney)} TND</strong>.
          </div>
        )}
      </div>
    </div>
  )
}

export default SummaryPanel