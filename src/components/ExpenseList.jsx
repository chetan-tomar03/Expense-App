import React from 'react';
import { Pencil, Trash2, Calendar } from 'lucide-react';

export default function ExpenseList({ expenses, onEdit, onDelete }) {
  // Color mapper for badges
  const getBadgeStyle = (category) => {
    switch (category) {
      case 'Food':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Shopping':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Bills':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'Entertainment':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Recent Expenses ({expenses.length})
      </h2>

      {expenses.length === 0 ? (
        <div className="text-center py-8 text-gray-400 font-medium font-sans">
          No matching expenses found.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-indigo-200 transition-all duration-200 gap-4"
            >
              {/* Left Column: Info */}
              <div className="flex items-start gap-3">
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-gray-800 text-lg font-sans">{expense.description}</span>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border font-sans ${getBadgeStyle(
                        expense.category
                      )}`}
                    >
                      {expense.category}
                    </span>
                  </div>
                  <span className="text-gray-400 text-sm flex items-center gap-1 font-sans">
                    <Calendar size={13} /> {expense.date}
                  </span>
                </div>
              </div>

              {/* Right Column: Amount & Actions */}
              <div className="flex items-center justify-between md:justify-end gap-6">
                <span className="text-xl font-extrabold text-indigo-700">
                  ₹{expense.amount.toFixed(2)}
                </span>
                
                <div className="flex items-center gap-2">
                  {/* Edit Button */}
                  <button
                    onClick={() => onEdit(expense)}
                    title="Edit Expense"
                    className="p-2.5 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 hover:text-emerald-700 rounded-lg transition-colors cursor-pointer"
                  >
                    <Pencil size={18} />
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => onDelete(expense.id)}
                    title="Delete Expense"
                    className="p-2.5 text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
