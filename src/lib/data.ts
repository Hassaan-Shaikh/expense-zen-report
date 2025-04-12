
// Mock data for the expense tracker

export type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

export type Transaction = {
  id: string;
  amount: number;
  description: string;
  date: string;
  categoryId: string;
  type: 'income' | 'expense';
};

export type Budget = {
  id: string;
  categoryId: string;
  amount: number;
  spent: number;
};

export const categories: Category[] = [
  { id: 'groceries', name: 'Groceries', icon: 'shopping-cart', color: 'category-gradient-1' },
  { id: 'dining', name: 'Dining', icon: 'utensils', color: 'category-gradient-2' },
  { id: 'transport', name: 'Transport', icon: 'car', color: 'category-gradient-3' },
  { id: 'entertainment', name: 'Entertainment', icon: 'film', color: 'category-gradient-4' },
  { id: 'shopping', name: 'Shopping', icon: 'shopping-bag', color: 'category-gradient-5' },
  { id: 'utilities', name: 'Utilities', icon: 'home', color: 'category-gradient-6' },
  { id: 'health', name: 'Health', icon: 'activity', color: 'category-gradient-7' },
  { id: 'other', name: 'Other', icon: 'more-horizontal', color: 'category-gradient-1' },
  { id: 'income', name: 'Income', icon: 'dollar-sign', color: 'category-gradient-4' },
];

export let transactions: Transaction[] = [
  {
    id: '1',
    amount: 42.50,
    description: 'Grocery shopping',
    date: '2025-04-09',
    categoryId: 'groceries',
    type: 'expense',
  },
  {
    id: '2',
    amount: 28.75,
    description: 'Restaurant dinner',
    date: '2025-04-08',
    categoryId: 'dining',
    type: 'expense',
  },
  {
    id: '3',
    amount: 35.00,
    description: 'Uber ride',
    date: '2025-04-07',
    categoryId: 'transport',
    type: 'expense',
  },
  {
    id: '4',
    amount: 15.50,
    description: 'Movie tickets',
    date: '2025-04-06',
    categoryId: 'entertainment',
    type: 'expense',
  },
  {
    id: '5',
    amount: 120.00,
    description: 'New shoes',
    date: '2025-04-05',
    categoryId: 'shopping',
    type: 'expense',
  },
  {
    id: '6',
    amount: 85.40,
    description: 'Electric bill',
    date: '2025-04-04',
    categoryId: 'utilities',
    type: 'expense',
  },
  {
    id: '7',
    amount: 65.30,
    description: 'Pharmacy',
    date: '2025-04-03',
    categoryId: 'health',
    type: 'expense',
  },
  {
    id: '8',
    amount: 2500.00,
    description: 'Salary',
    date: '2025-04-01',
    categoryId: 'income',
    type: 'income',
  },
  {
    id: '9',
    amount: 200.00,
    description: 'Freelance work',
    date: '2025-04-02',
    categoryId: 'income',
    type: 'income',
  },
  {
    id: '10',
    amount: 18.20,
    description: 'Coffee shop',
    date: '2025-04-09',
    categoryId: 'dining',
    type: 'expense',
  },
];

export const budgets: Budget[] = [
  { id: '1', categoryId: 'groceries', amount: 300, spent: 210 },
  { id: '2', categoryId: 'dining', amount: 200, spent: 145 },
  { id: '3', categoryId: 'transport', amount: 150, spent: 85 },
  { id: '4', categoryId: 'entertainment', amount: 100, spent: 75 },
  { id: '5', categoryId: 'shopping', amount: 200, spent: 180 },
];

// Helper functions for data manipulation
export const getCategoryById = (id: string): Category => {
  return categories.find(category => category.id === id) || categories[7]; // Default to "Other"
};

export const getTransactionsByCategory = (): Record<string, number> => {
  const result: Record<string, number> = {};
  
  // Initialize all categories with 0
  categories.forEach(category => {
    if (category.id !== 'income') {
      result[category.name] = 0;
    }
  });
  
  // Sum up transactions by category
  transactions.forEach(transaction => {
    if (transaction.type === 'expense') {
      const category = getCategoryById(transaction.categoryId);
      result[category.name] = (result[category.name] || 0) + transaction.amount;
    }
  });
  
  return result;
};

export const getMonthlySpending = (): { name: string; amount: number }[] => {
  return [
    { name: 'Oct', amount: 1200 },
    { name: 'Nov', amount: 1100 },
    { name: 'Dec', amount: 1300 },
    { name: 'Jan', amount: 900 },
    { name: 'Feb', amount: 1500 },
    { name: 'Mar', amount: 1000 },
  ];
};

export const getTotalIncome = (): number => {
  return transactions
    .filter(transaction => transaction.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
};

export const getTotalExpenses = (): number => {
  return transactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
};

export const getBudgetStatus = (): { total: number; used: number } => {
  const total = budgets.reduce((sum, budget) => sum + budget.amount, 0);
  const used = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  return { total, used };
};
