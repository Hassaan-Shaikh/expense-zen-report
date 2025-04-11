
import { useEffect, useState } from "react";
import { categories } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { transactions } from "@/lib/data";
import useTransactionStore from "@/store/Transaction";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import CategoryBadge from "@/components/ui/CategoryBadge";
import { format } from "date-fns";
import { toast } from "sonner";

interface TransactionFormProps {
  isOpen: boolean;
  onClose: () => void;
}

function generate16BitId(): number {
  // Generate a random number between 0 and 65535 (inclusive)
  return Math.floor(Math.random() * 65536);
}

const TransactionForm: React.FC<TransactionFormProps> = ({ isOpen, onClose }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const {transactions, setTransactions} = useTransactionStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!description || !amount || !categoryId) {
      toast.error("Please fill all required fields");
      return;
    }

    const TransactionObject = {
      
        id: generate16BitId().toString(),
        amount: parseFloat(amount),
        description: description,
        date: date,
        categoryId: categoryId,
        type: type,
      
    }

    setTransactions(TransactionObject);
    
    // In a real app, we would save the transaction here
    toast.success("Transaction added successfully");
    resetForm();
    onClose();
  };

  useEffect(() => {
    console.log(transactions);
  }, [transactions])
  
  const resetForm = () => {
    setDescription("");
    setAmount("");
    setCategoryId("");
    setType("expense");
    setDate(format(new Date(), "yyyy-MM-dd"));
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Transaction Type</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={type === "expense" ? "default" : "outline"}
                className={type === "expense" ? "bg-expense-red" : ""}
                onClick={() => setType("expense")}
              >
                Expense
              </Button>
              <Button
                type="button"
                variant={type === "income" ? "default" : "outline"}
                className={type === "income" ? "bg-expense-green" : ""}
                onClick={() => setType("income")}
              >
                Income
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What was this for?"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
              <Input
                id="amount"
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8"
                placeholder="0.00"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories
                  .filter(cat => type === "income" ? cat.id === "income" : cat.id !== "income")
                  .map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      <div className="flex items-center gap-2">
                        <CategoryBadge categoryId={category.id} />
                        {category.name}
                      </div>
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="expense-gradient-bg">
              Add Transaction
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionForm;
