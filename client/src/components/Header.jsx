import React from 'react'
import SalaryInput from './SalaryInput'

function Header({ onSalaryUpdate }) {
  return (
    <header className="bg-primary text-white p-3">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="h3 mb-0">💰 TND Balance</h1>
            <p className="mb-0">Manage your monthly salary and expenses</p>
          </div>
          <div className="col-md-6">
            <SalaryInput onSalaryUpdate={onSalaryUpdate} />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header