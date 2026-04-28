'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'

interface Expense {
  _id: string
  category: string
  amount: number
  description: string
  date: string
}

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    category: 'Food',
    amount: '',
    description: '',
  })

  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    fetchExpenses()
  }, [])

  const fetchExpenses = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${apiUrl}/api/expenses`)
      setExpenses(response.data)
    } catch (error) {
      console.error('Failed to fetch expenses:', error)
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post(`${apiUrl}/api/expenses`, {
        ...formData,
        amount: parseFloat(formData.amount),
        date: new Date().toISOString().split('T')[0],
      })
      setFormData({ category: 'Food', amount: '', description: '' })
      fetchExpenses()
    } catch (error) {
      console.error('Failed to add expense:', error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${apiUrl}/api/expenses/${id}`)
      fetchExpenses()
    } catch (error) {
      console.error('Failed to delete expense:', error)
    }
  }

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Expense Tracker</h1>
        <p className="text-gray-600 mb-8">Manage your daily expenses efficiently</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add Expense</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Food</option>
                    <option>Transport</option>
                    <option>Entertainment</option>
                    <option>Shopping</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Dinner at restaurant"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                  Add Expense
                </button>
              </form>
            </div>
          </div>

          {/* Expenses List Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Your Expenses</h2>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total Spent</p>
                  <p className="text-3xl font-bold text-blue-600">${totalExpenses.toFixed(2)}</p>
                </div>
              </div>

              {loading ? (
                <p className="text-gray-600">Loading expenses...</p>
              ) : expenses.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No expenses yet. Add one to get started!</p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {expenses.map((expense) => (
                    <div
                      key={expense._id}
                      className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{expense.category}</p>
                        <p className="text-sm text-gray-600">{expense.description}</p>
                        <p className="text-xs text-gray-500">{new Date(expense.date).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right ml-4">
                        <p className="font-bold text-gray-800">${expense.amount.toFixed(2)}</p>
                        <button
                          onClick={() => handleDelete(expense._id)}
                          className="text-xs text-red-600 hover:text-red-800 mt-1"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
