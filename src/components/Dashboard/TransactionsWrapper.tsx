
import { useState } from "react";
import RecentTransactions from "./RecentTransactions";
import { Transaction } from "@/lib/data";

interface TransactionsWrapperProps {
  initialTransactions?: Transaction[];
}

const TransactionsWrapper: React.FC<TransactionsWrapperProps> = ({ initialTransactions }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions || []);

  const handleDeleteTransaction = (id: string) => {
    setTransactions((current) => current.filter(t => t.id !== id));
  };

  return (
    <RecentTransactions 
      customTransactions={transactions}
      onDelete={handleDeleteTransaction}
    />
  );
};

export default TransactionsWrapper;
