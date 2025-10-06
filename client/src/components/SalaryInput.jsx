import React, { useState } from 'react'

function SalaryInput({ onSalaryUpdate }) {
  const [salary, setSalary] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (salary && salary > 0) {
      await onSalaryUpdate(parseFloat(salary))
      setSalary('')
      alert('Salary updated successfully!')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="number"
          className="form-control"
          placeholder="Enter monthly salary (TND)"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          step="0.01"
          min="0"
        />
        <button className="btn btn-light" type="submit">
          Set Salary
        </button>
      </div>
    </form>
  )
}

export default SalaryInput