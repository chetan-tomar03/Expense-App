import { useState, useEffect } from 'react';
import CategoryPieChart from './components/CategoryPieChart';
import DashboardStats from './components/DashboardStats';
import ExpenseForm from './components/ExpenseForm';
import ExpenseFilters from './components/ExpenseFilters';
import ExpenseList from './components/ExpenseList';

export default function App() {
  // 1. Initial State loaded from LocalStorage
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('expenses');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing expenses from localStorage:', e);
        return [];
      }
    }
    // Default sample data on first load
    return [
      {
        id: '1',
        description: 'Amazon Order',
        amount: 5000,
        category: 'Shopping',
        date: '2025-11-23'
      },
      {
        id: '2',
        description: 'Prepaid bill',
        amount: 499,
        category: 'Bills',
        date: '2025-11-23'
      },
      {
        id: '3',
        description: 'Dinner at Restaurant',
        amount: 1800,
        category: 'Food',
        date: '2025-11-24'
      }
    ];
  });

  // 2. Form state
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0]
  });

  // 3. Edit state
  const [editingId, setEditingId] = useState(null);

  // 4. Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('date-desc');

  // Save to LocalStorage when expenses change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  // 5. Calculations for Metrics
  const totalSpent = expenses.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
  const highestExpense = expenses.reduce((max, item) => {
    const val = parseFloat(item.amount) || 0;
    return val > max ? val : max;
  }, 0);
  const totalExpensesCount = expenses.length;

  // 6. Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { description, amount, category, date } = formData;

    if (!description.trim()) {
      alert('Please enter a description.');
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount greater than 0.');
      return;
    }
    if (!date) {
      alert('Please select a date.');
      return;
    }

    if (editingId) {
      // Edit Mode
      setExpenses((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? { ...item, description: description.trim(), amount: parseFloat(amount), category, date }
            : item
        )
      );
      setEditingId(null);
    } else {
      // Add Mode
      const newExpense = {
        id: Date.now().toString(),
        description: description.trim(),
        amount: parseFloat(amount),
        category,
        date
      };
      setExpenses((prev) => [newExpense, ...prev]);
    }

    // Reset Form
    setFormData({
      description: '',
      amount: '',
      category: 'Food',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleEdit = (expense) => {
    setEditingId(expense.id);
    setFormData({
      description: expense.description,
      amount: expense.amount.toString(),
      category: expense.category,
      date: expense.date
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      setExpenses((prev) => prev.filter((item) => item.id !== id));
      if (editingId === id) {
        setEditingId(null);
        setFormData({
          description: '',
          amount: '',
          category: 'Food',
          date: new Date().toISOString().split('T')[0]
        });
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      description: '',
      amount: '',
      category: 'Food',
      date: new Date().toISOString().split('T')[0]
    });
  };

  // 7. Filtering & Sorting logic
  const filteredExpenses = expenses
    .filter((item) => {
      const matchesSearch = item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'All Categories' || item.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'date-desc') {
        return new Date(b.date) - new Date(a.date);
      }
      if (sortBy === 'date-asc') {
        return new Date(a.date) - new Date(b.date);
      }
      if (sortBy === 'amount-desc') {
        return b.amount - a.amount;
      }
      if (sortBy === 'amount-asc') {
        return a.amount - b.amount;
      }
      return 0;
    });
  return (
    <div className="min-h-screen bg-[#5A4FCF] text-gray-800 py-10 px-4 md:px-8 flex justify-center">
      <div className="max-w-4xl w-full flex flex-col gap-6">
        
        {/* Header */}
        <div className="text-center text-white mb-2">
          <h1 className="text-4xl md:text-5xl font-extrabold flex items-center justify-center gap-3 tracking-tight">
            <span>💸</span> Expense Tracker
          </h1>
          <p className="text-indigo-100 text-base md:text-lg mt-2 font-medium opacity-90">
            Track your spending, stay on budget
          </p>
        </div>

        {/* Dashboard Card Container (Stats + Chart) */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 flex flex-col gap-8">
          
          {/* Metrics Component */}
          <DashboardStats
            totalSpent={totalSpent}
            highestExpense={highestExpense}
            totalExpensesCount={totalExpensesCount}
          />

          {/* Spending Chart Component */}
          <div className="border-t border-gray-100 pt-6">
            <CategoryPieChart expenses={expenses} />
          </div>

        </div>

        {/* Add/Edit Expense Form Component */}
        <ExpenseForm
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          editingId={editingId}
          onCancel={handleCancelEdit}
        />

        {/* Filters and Search Bar Component */}
        <ExpenseFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Expenses List Component */}
        <ExpenseList
          expenses={filteredExpenses}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

      </div>
    </div>
  );
}
