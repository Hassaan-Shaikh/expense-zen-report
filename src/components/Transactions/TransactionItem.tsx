
import { Transaction, getCategoryById } from "@/lib/data";
import CategoryBadge from "@/components/ui/CategoryBadge";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface TransactionItemProps {
  transaction: Transaction;
  detailed?: boolean;
  onDelete?: (id: string) => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ 
  transaction,
  detailed = false,
  onDelete
}) => {
  const { id, amount, description, date, categoryId, type } = transaction;
  const category = getCategoryById(categoryId);
  const formattedDate = format(new Date(date), "MMM d, yyyy");
  
  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
      toast({
        title: "Transaction Deleted",
        description: `"${description}" has been removed.`,
      });
    }
  };
  
  return (
    <div className="flex items-center justify-between rounded-lg p-2 hover:bg-muted/50 group">
      <div className="flex items-center gap-3">
        <CategoryBadge categoryId={categoryId} />
        <div>
          <p className="font-medium">{description}</p>
          <p className="text-xs text-muted-foreground">{formattedDate}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className={cn(
          "text-sm font-medium",
          type === "expense" ? "text-expense-red" : "text-expense-green"
        )}>
          {type === "expense" ? "-" : "+"}${amount.toFixed(2)}
        </div>
        {onDelete && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default TransactionItem;
