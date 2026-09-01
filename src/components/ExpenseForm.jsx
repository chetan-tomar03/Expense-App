import React from 'react';
import { PlusCircle, CheckCircle, XCircle } from 'lucide-react';

export default function ExpenseForm({ formData, onInputChange, onSubmit, editingId, onCancel }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        {editingId ? 'Edit Expense' : 'Add New Expense'}
      </h2>
      
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        {/* Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Description Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-600">Description</label>
            <input
              type="text"
              name="description"
              placeholder="Description (e.g., Groceries)"
              value={formData.description}
              onChange={onInputChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 placeholder-gray-400 bg-white"
              required
            />
          </div>

          {/* Amount Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-600">Amount (₹)</label>
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={onInputChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 placeholder-gray-400 bg-white"
              required
              min="0.01"
              step="any"
            />
          </div>

          {/* Category Dropdown */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-600">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={onInputChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 bg-white"
            >
              <option value="Food">Food</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Date Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-600">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={onInputChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 bg-white"
              required
            />
          </div>

        </div>

        {/* Actions Buttons */}
        <div className="flex gap-3 mt-2">
          <button
            type="submit"
            className="flex-grow bg-[#5A4FCF] text-white py-3 px-6 rounded-lg font-bold hover:bg-[#483db4] focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer font-sans"
          >
            {editingId ? (
              <>
                <CheckCircle size={18} /> Update Expense
              </>
            ) : (
              <>
                <PlusCircle size={18} /> Add Expense
              </>
            )}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-bold hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors flex items-center justify-center gap-2 cursor-pointer font-sans"
            >
              <XCircle size={18} /> Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
