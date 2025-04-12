import { create } from 'zustand';
import { Transaction, transactions } from '@/lib/data';

type TransactionType = {
    id: string;
    amount: number;
    description: string;
    date: string;
    categoryId: string;
    type: 'income' | 'expense';
};

interface TransactionState {
    transactions: TransactionType[];
    getTotalIncome: () => number;
    getTotalExpenses: () => number;
    setTransactions: (newTransaction: TransactionType) => void;
    deleteTransaction: (id: string) => void;
}

const useTransactionStore = create<TransactionState>((set, get) => ({
    transactions: [
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
    ],
    getTotalIncome: () => {
        const transactions = get().transactions;
        return transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
    },
    
    getTotalExpenses: () => {
        const transactions = get().transactions;
        return transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
    },
    
    setTransactions: (newTransaction) => set(state => ({
        transactions: [...state.transactions, newTransaction]
    })),

    deleteTransaction: (id) => set((state) => ({
      transactions: state.transactions.filter((transaction) => transaction.id !== id),
    }))
}));

export default useTransactionStore;