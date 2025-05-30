
import { getTotalExpenses, getTotalIncome, getBudgetStatus } from "@/lib/data";
import { ArrowDown, ArrowUp, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useTransactionStore from "@/store/Transaction";
import { Progress } from "@/components/ui/progress";
import { useEffect } from "react";

const Summary = () => {
  const {transactions, getTotalIncome, getTotalExpenses} = useTransactionStore();
  const totalIncome = getTotalIncome();
  const totalExpenses = getTotalExpenses();
  const balance = totalIncome - totalExpenses;
  let totalBudget = balance <= 0 ? 0 : totalIncome * 0.7;
  // const { total: budgetTotal, used: budgetUsed } = getBudgetStatus();
  const used = transactions.filter(t => t.type === 'expense').reduce((sum, budget) => sum + budget.amount, 0);
  const budgetPercentage = balance <= 0 ? 0 : Math.round((used / totalBudget) * 100);
  
  useEffect(() => {
    console.log(totalIncome)
  },[totalIncome]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="animate-fade-in">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${balance.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">Current balance</p>
        </CardContent>
      </Card>
      
      <Card className="animate-fade-in [animation-delay:100ms]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Income</CardTitle>
          <ArrowUp className="h-4 w-4 text-expense-green" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-expense-green">
            +${totalIncome.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">Total income this month</p>
        </CardContent>
      </Card>
      
      <Card className="animate-fade-in [animation-delay:200ms]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Expenses</CardTitle>
          <ArrowDown className="h-4 w-4 text-expense-red" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-expense-red">
            -${totalExpenses.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">Total expenses this month</p>
        </CardContent>
      </Card>
      
      <Card className="animate-fade-in [animation-delay:300ms]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Budget Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <div className="text-2xl font-bold">
              {budgetPercentage}%
            </div>
            <div className="text-sm text-muted-foreground">
              ${used.toFixed(0)}/${totalBudget.toFixed(0)}
            </div>
          </div>
          <Progress value={budgetPercentage} className="mt-2" />
          <p className="mt-2 text-xs text-muted-foreground">
            {budgetPercentage < 75 ? "On track with your budget" : (budgetPercentage >= 100 ? "Total budget used" : "Approaching budget limit")}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Summary;
