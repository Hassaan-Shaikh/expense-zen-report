
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Layout/Navbar";
import Sidebar from "@/components/Layout/Sidebar";
import Summary from "@/components/Dashboard/Summary";
import RecentTransactions from "@/components/Dashboard/RecentTransactions";
import ExpensePieChart from "@/components/Charts/ExpensePieChart";
import SpendingTrendChart from "@/components/Charts/SpendingTrendChart";
import BudgetProgress from "@/components/Budgets/BudgetProgress";
import TransactionForm from "@/components/Transactions/TransactionForm";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className={`flex flex-1 flex-col transition-all duration-300`}>
        <Navbar onToggleSidebar={toggleSidebar} />
        
        <main className="flex-1 p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <Button 
                className="expense-gradient-bg"
                onClick={() => setShowTransactionForm(true)}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Transaction
              </Button>
            </div>
            
            <div className="space-y-6">
              <Summary />
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <SpendingTrendChart />
                <ExpensePieChart />
                <BudgetProgress />
                <RecentTransactions />
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <TransactionForm 
        isOpen={showTransactionForm} 
        onClose={() => setShowTransactionForm(false)} 
      />
    </div>
  );
};

export default Index;
