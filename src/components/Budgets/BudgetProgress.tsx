
import { budgets, getCategoryById } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import CategoryBadge from "@/components/ui/CategoryBadge";

const BudgetProgress = () => {
  // Sort budgets by percentage spent (descending)
  const sortedBudgets = [...budgets].sort(
    (a, b) => (b.spent / b.amount) - (a.spent / a.amount)
  );
  
  return (
    <Card className="col-span-1 animate-fade-in [animation-delay:300ms]">
      <CardHeader>
        <CardTitle>Budget Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedBudgets.map((budget) => {
            const category = getCategoryById(budget.categoryId);
            const percentage = Math.round((budget.spent / budget.amount) * 100);
            let statusColor = "text-expense-green";
            
            if (percentage >= 90) {
              statusColor = "text-expense-red";
            } else if (percentage >= 70) {
              statusColor = "text-expense-orange";
            } else if (percentage >= 50) {
              statusColor = "text-expense-yellow";
            }
            
            return (
              <div key={budget.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CategoryBadge categoryId={budget.categoryId} />
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>
                  <div className={`text-sm font-medium ${statusColor}`}>
                    ${budget.spent.toFixed(0)} / ${budget.amount.toFixed(0)}
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
