
import { useState, useEffect } from "react";
import RecentTransactions from "./RecentTransactions";
import { Transaction, transactions } from "@/lib/data";

interface TransactionsWrapperProps {
  initialTransactions?: Transaction[];
  onDeleteTransaction?: (id: string) => void;
  customTransactions?: Transaction[];
}

const TransactionsWrapper: React.FC<TransactionsWrapperProps> = ({ 
  initialTransactions, 
  onDeleteTransaction,
  customTransactions 
}) => {
  const [transactionList, setTransactionList] = useState<Transaction[]>(
    customTransactions || initialTransactions || transactions
  );

  // Update local state when props change
  useEffect(() => {
    if (customTransactions) {
      setTransactionList(customTransactions);
    }
  }, [customTransactions]);

  const handleDeleteTransaction = (id: string) => {
    // Update local state
    setTransactionList((current) => current.filter(t => t.id !== id));
    
    // Propagate change to parent component if callback provided
    if (onDeleteTransaction) {
      onDeleteTransaction(id);
    }
  };

  return (
    <RecentTransactions 
      customTransactions={transactionList}
      onDelete={handleDeleteTransaction}
    />
  );
};

export default TransactionsWrapper;
