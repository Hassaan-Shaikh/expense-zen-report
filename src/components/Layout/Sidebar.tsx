
import { useState } from "react";
import { 
  BarChart3, 
  Calendar, 
  CreditCard, 
  DollarSign, 
  Home, 
  PieChart, 
  Plus, 
  Settings, 
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const isMobile = useIsMobile();
  
  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-card p-4 shadow-sm transition-transform duration-300 ease-in-out",
          isMobile && !isOpen && "-translate-x-full",
          isMobile && isOpen && "translate-x-0",
          !isMobile && !isOpen && "-translate-x-full",
          !isMobile && isOpen && "translate-x-0"
        )}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-expense-purple">ExpenseZen</h1>
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        <Button variant="gradient" className="mt-6 expense-gradient-bg">
          <Plus className="mr-2 h-4 w-4" /> Add Transaction
        </Button>
        
        <nav className="mt-8 flex flex-1 flex-col gap-1">
          <NavItem icon={<Home className="h-5 w-5" />} label="Dashboard" active />
          <NavItem icon={<CreditCard className="h-5 w-5" />} label="Transactions" />
          <NavItem icon={<BarChart3 className="h-5 w-5" />} label="Budgets" />
          <NavItem icon={<PieChart className="h-5 w-5" />} label="Reports" />
          <NavItem icon={<Calendar className="h-5 w-5" />} label="Calendar" />
        </nav>
        
        <div className="mt-auto pt-4">
          <NavItem icon={<Settings className="h-5 w-5" />} label="Settings" />
          <div className="mt-4 rounded-lg bg-secondary p-4">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-expense-purple p-2">
                <DollarSign className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium">Premium Plan</p>
                <p className="text-xs text-muted-foreground">Upgrade now</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active }) => {
  return (
    <button
      className={cn(
        "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        active 
          ? "bg-secondary text-expense-purple" 
          : "text-muted-foreground hover:bg-secondary/50 hover:text-expense-purple"
      )}
    >
      {icon}
      {label}
    </button>
  );
};

export default Sidebar;
