
import { Transaction, transactions } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TransactionItem from "@/components/Transactions/TransactionItem";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import useTransactionStore from "@/store/Transaction";

interface RecentTransactionsProps {
  customTransactions?: Transaction[];
  onDelete?: (id: string) => void;
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ 
  customTransactions,
  onDelete
}) => {
  const {transactions, getTotalIncome, getTotalExpenses, deleteTransaction} = useTransactionStore();
  // Use custom transactions if provided, otherwise use the default transactions
  // const transactionsToShow = customTransactions || transactions;
  
  // Get the 5 most recent transactions
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 7);

  return (
    <Card className="col-span-1 lg:col-span-2 animate-fade-in [animation-delay:400ms]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Transactions</CardTitle>
        {/* <Button variant="ghost" size="sm" className="gap-1 text-expense-purple">
          View All <ArrowUpRight className="h-4 w-4" />
        </Button> */}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <TransactionItem 
              key={transaction.id} 
              transaction={transaction}
              onDelete={deleteTransaction}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
