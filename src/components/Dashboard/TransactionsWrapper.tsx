
import { useState } from "react";
import RecentTransactions from "./RecentTransactions";
import { Transaction, transactions } from "@/lib/data";

interface TransactionsWrapperProps {
  initialTransactions?: Transaction[];
}

const TransactionsWrapper: React.FC<TransactionsWrapperProps> = ({ initialTransactions }) => {
  const [transactionList, setTransactionList] = useState<Transaction[]>(initialTransactions || transactions);

  const handleDeleteTransaction = (id: string) => {
    setTransactionList((current) => current.filter(t => t.id !== id));
  };

  return (
    <RecentTransactions 
      customTransactions={transactionList}
      onDelete={handleDeleteTransaction}
    />
  );
};

export default TransactionsWrapper;
