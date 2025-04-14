
import { budgets, getCategoryById } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import CategoryBadge from "@/components/ui/CategoryBadge";
import useTransactionStore from "@/store/Transaction";
import { useEffect } from "react";

const BudgetProgress = () => {
  const {transactions, getTotalIncome, getTotalExpenses} = useTransactionStore();
  const totalIncome = getTotalIncome();
  const totalExpenses = getTotalExpenses();
  const used = transactions.filter(t => t.type === 'expense').reduce((sum, budget) => sum + budget.amount, 0);
  const expenseTypes = [...transactions].filter(t => t.type === 'expense');
  const balance = totalIncome - totalExpenses
  const expenseByCategory = [...transactions]
  .filter(t => t.type === 'expense')
  .reduce((acc, curr) => {
    const { categoryId, amount = 0 } = curr;
    if (!categoryId) return acc; // skip if no categoryId
    
    if (!acc[categoryId]) {
      acc[categoryId] = amount;
    } else {
      acc[categoryId] += amount;
    }
    
    return acc;
  }, {});
  let categoryBudget = balance <= 0 ? 0 : (totalIncome * 0.7) / Object.entries(expenseByCategory).length;

  useEffect(() => {
    console.log(expenseByCategory)
  }, [])

  // Sort budgets by percentage spent (descending)
  // const sortedBudgets = [...transactions].sort(
  //   (a, b) => (b.spent / b.amount) - (a.spent / a.amount)
  // );
  return (
    <Card className="col-span-1 animate-fade-in [animation-delay:300ms]">
      <CardHeader>
        <CardTitle>Budget Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
        {Object.entries(expenseByCategory).map(([budget, amount]) => {
            const percentage = Math.round((parseFloat(amount.toString()) / categoryBudget) * 100);
            let statusColor = "text-expense-green";
            
            if (percentage >= 90) {
              statusColor = "text-expense-red";
            } else if (percentage >= 70) {
              statusColor = "text-expense-orange";
            } else if (percentage >= 50) {
              statusColor = "text-expense-yellow";
            }
            
            return (
              <div key={budget} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CategoryBadge categoryId={budget} />
                    <span className="text-sm font-medium">{budget[0].toUpperCase() + budget.slice(1, budget.length)}</span>
                  </div>
                  <div className={`text-sm font-medium ${statusColor}`}>
                    ${amount.toString()} / ${categoryBudget.toFixed(0)}
                  </div>
                </div>
                <Progress 
                  value={percentage} 
                  className={percentage >= 90 ? "bg-expense-red/20" : ""}
                />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetProgress;
