import React from 'react';

export default function DashboardStats({ totalSpent, highestExpense, totalExpensesCount }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Spent Card */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white text-center shadow-md transform transition duration-300 hover:scale-102">
        <p className="text-sm font-semibold tracking-wider text-blue-100 uppercase font-sans">Total Spent</p>
        <p className="text-3xl font-extrabold mt-2">₹{totalSpent.toFixed(2)}</p>
      </div>

      {/* Highest Expense Card */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white text-center shadow-md transform transition duration-300 hover:scale-102">
        <p className="text-sm font-semibold tracking-wider text-purple-100 uppercase font-sans">Highest Expense</p>
        <p className="text-3xl font-extrabold mt-2">₹{highestExpense.toFixed(2)}</p>
      </div>

      {/* Total Expenses Card */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white text-center shadow-md transform transition duration-300 hover:scale-102">
        <p className="text-sm font-semibold tracking-wider text-indigo-100 uppercase font-sans">Total Expenses</p>
        <p className="text-3xl font-extrabold mt-2">{totalExpensesCount}</p>
      </div>
    </div>
  );
}
