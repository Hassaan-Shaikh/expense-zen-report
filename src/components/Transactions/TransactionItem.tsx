
import { Transaction, getCategoryById } from "@/lib/data";
import CategoryBadge from "@/components/ui/CategoryBadge";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface TransactionItemProps {
  transaction: Transaction;
  detailed?: boolean;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ 
  transaction,
  detailed = false
}) => {
  const { amount, description, date, categoryId, type } = transaction;
  const category = getCategoryById(categoryId);
  const formattedDate = format(new Date(date), "MMM d, yyyy");
  
  return (
    <div className="flex items-center justify-between rounded-lg p-2 hover:bg-muted/50">
      <div className="flex items-center gap-3">
        <CategoryBadge categoryId={categoryId} />
        <div>
          <p className="font-medium">{description}</p>
          <p className="text-xs text-muted-foreground">{formattedDate}</p>
        </div>
      </div>
      <div className={cn(
        "text-sm font-medium",
        type === "expense" ? "text-expense-red" : "text-expense-green"
      )}>
        {type === "expense" ? "-" : "+"}${amount.toFixed(2)}
      </div>
    </div>
  );
};

export default TransactionItem;
