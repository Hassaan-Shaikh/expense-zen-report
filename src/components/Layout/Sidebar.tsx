import { useState } from "react";
import { 
  BarChart3, 
  Calendar, 
  CreditCard, 
  DollarSign, 
  Download,
  FileText,
  Home, 
  Menu,
  PieChart, 
  Plus,
  Settings,
  Trash2,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/hooks/use-toast";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Transaction } from "@/lib/data";
import TransactionItem from "@/components/Transactions/TransactionItem";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  transactions, 
  onDeleteTransaction 
}) => {
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isRemoveTransactionsOpen, setIsRemoveTransactionsOpen] = useState(false);
  
  // Function for downloading reports
  const downloadReport = (type: 'monthly' | 'annual' | 'export') => {
    // In a real application, this would generate and download a real report
    // For now, we'll just show a mock download with sample data
    
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
    
    let filename = '';
    let content = '';
    
    switch (type) {
      case 'monthly':
        filename = `ExpenseZen_Monthly_Report_${dateStr}.csv`;
        content = "Date,Category,Amount\n2023-04-01,Groceries,123.45\n2023-04-02,Entertainment,67.89\n2023-04-05,Utilities,210.00";
        break;
      case 'annual':
        filename = `ExpenseZen_Annual_Report_${today.getFullYear()}.csv`;
        content = "Month,Income,Expenses,Savings\nJanuary,5000,3200,1800\nFebruary,5000,3500,1500\nMarch,5200,3100,2100";
        break;
      case 'export':
        filename = `ExpenseZen_Data_Export_${dateStr}.csv`;
        content = "ID,Date,Category,Description,Amount\n1,2023-04-01,Groceries,Supermarket,123.45\n2,2023-04-02,Entertainment,Movie tickets,67.89\n3,2023-04-05,Utilities,Electricity bill,210.00";
        break;
    }
    
    // Create a blob and download it
    const blob = new Blob([content], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Report Downloaded",
      description: `Your ${type} report has been downloaded.`,
    });
  };

  // Function to open the remove transactions drawer/sheet
  const openRemoveTransactions = () => {
    setIsRemoveTransactionsOpen(true);
  };

  // For mobile we'll use the Sheet component from shadcn
  if (isMobile) {
    return (
      <>
        <Sheet open={isOpen} onOpenChange={(open) => {
          if (!open) onClose();
        }}>
          <SheetContent side="left" className="p-0 w-72 border-r">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4">
                <h1 className="text-xl font-bold text-expense-purple">ExpenseZen</h1>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <Button variant="gradient" className="mx-4 mt-2 expense-gradient-bg">
                <Plus className="mr-2 h-4 w-4" /> Add Transaction
              </Button>
              
              <nav className="mt-8 flex flex-1 flex-col gap-1 px-2">
                <NavItem 
                  icon={<Home className="h-5 w-5" />} 
                  label="Dashboard" 
                  active 
                  isCollapsed={false} 
                />
                <NavItem 
                  icon={<CreditCard className="h-5 w-5" />} 
                  label="Transactions" 
                  isCollapsed={false}
                />
                <NavItem 
                  icon={<Trash2 className="h-5 w-5" />} 
                  label="Remove Transactions" 
                  isCollapsed={false}
                  onClick={openRemoveTransactions} 
                />
                <NavItem 
                  icon={<BarChart3 className="h-5 w-5" />} 
                  label="Budgets" 
                  isCollapsed={false} 
                />

                {/* Reports section */}
                <Collapsible className="w-full">
                  <CollapsibleTrigger className="w-full">
                    <NavItem 
                      icon={<FileText className="h-5 w-5" />} 
                      label="Reports" 
                      isCollapsed={false} 
                      isDropdown
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-8">
                    <NavItem 
                      icon={<PieChart className="h-4 w-4" />} 
                      label="Monthly Report" 
                      isCollapsed={false}
                      isSubmenu
                      onClick={() => downloadReport('monthly')}
                    />
                    <NavItem 
                      icon={<BarChart3 className="h-4 w-4" />} 
                      label="Annual Report" 
                      isCollapsed={false}
                      isSubmenu
                      onClick={() => downloadReport('annual')}
                    />
                    <NavItem 
                      icon={<Download className="h-4 w-4" />} 
                      label="Export Data" 
                      isCollapsed={false}
                      isSubmenu
                      onClick={() => downloadReport('export')}
                    />
                  </CollapsibleContent>
                </Collapsible>

                <NavItem 
                  icon={<Calendar className="h-5 w-5" />} 
                  label="Calendar" 
                  isCollapsed={false} 
                />
              </nav>
              
              <div className="mt-auto px-2 pb-4 pt-2">
                <NavItem 
                  icon={<Settings className="h-5 w-5" />} 
                  label="Settings" 
                  isCollapsed={false} 
                />
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
          </SheetContent>
        </Sheet>

        {/* Mobile Remove Transactions Drawer */}
        <Drawer open={isRemoveTransactionsOpen} onOpenChange={setIsRemoveTransactionsOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Remove Transactions</DrawerTitle>
              <DrawerDescription>Select transactions to remove</DrawerDescription>
            </DrawerHeader>
            <div className="px-4 py-2 max-h-[70vh] overflow-y-auto">
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <TransactionItem 
                    key={transaction.id} 
                    transaction={transaction} 
                    onDelete={onDeleteTransaction}
                  />
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4">No transactions to show</p>
              )}
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline" className="w-full">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    );
  }
  
  // Desktop view
  return (
    <>
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r bg-card shadow-sm transition-all duration-300 ease-in-out",
          !isOpen && "-translate-x-full",
          isOpen && "translate-x-0",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        <div className="flex items-center justify-between p-4">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-expense-purple">ExpenseZen</h1>
          )}
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn(!isCollapsed && "ml-auto")}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        
        {!isCollapsed ? (
          <Button variant="gradient" className="mx-4 mt-2 expense-gradient-bg">
            <Plus className="mr-2 h-4 w-4" /> Add Transaction
          </Button>
        ) : (
          <Button variant="gradient" className="mx-auto mt-2 h-10 w-10 expense-gradient-bg p-0">
            <Plus className="h-5 w-5" />
          </Button>
        )}
        
        <nav className="mt-8 flex flex-1 flex-col gap-1 px-2">
          <NavItem 
            icon={<Home className="h-5 w-5" />} 
            label="Dashboard" 
            active 
            isCollapsed={isCollapsed} 
          />
          <NavItem 
            icon={<CreditCard className="h-5 w-5" />} 
            label="Transactions" 
            isCollapsed={isCollapsed} 
          />
          <NavItem 
            icon={<Trash2 className="h-5 w-5" />} 
            label="Remove Transactions" 
            isCollapsed={isCollapsed} 
            onClick={openRemoveTransactions}
            tooltip="Remove Transactions"
          />
          <NavItem 
            icon={<BarChart3 className="h-5 w-5" />} 
            label="Budgets" 
            isCollapsed={isCollapsed} 
          />

          {/* Reports dropdown section */}
          <Collapsible className="w-full">
            <CollapsibleTrigger className="w-full">
              <NavItem 
                icon={<FileText className="h-5 w-5" />} 
                label="Reports" 
                isCollapsed={isCollapsed} 
                isDropdown
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-8">
              {!isCollapsed && (
                <>
                  <NavItem 
                    icon={<PieChart className="h-4 w-4" />} 
                    label="Monthly Report" 
                    isCollapsed={isCollapsed}
                    isSubmenu
                    onClick={() => downloadReport('monthly')}
                  />
                  <NavItem 
                    icon={<BarChart3 className="h-4 w-4" />} 
                    label="Annual Report" 
                    isCollapsed={isCollapsed}
                    isSubmenu
                    onClick={() => downloadReport('annual')}
                  />
                  <NavItem 
                    icon={<Download className="h-4 w-4" />} 
                    label="Export Data" 
                    isCollapsed={isCollapsed}
                    isSubmenu
                    onClick={() => downloadReport('export')}
                  />
                </>
              )}
            </CollapsibleContent>
          </Collapsible>

          <NavItem 
            icon={<Calendar className="h-5 w-5" />} 
            label="Calendar" 
            isCollapsed={isCollapsed} 
          />
        </nav>
        
        <div className="mt-auto px-2 pb-4 pt-2">
          <NavItem 
            icon={<Settings className="h-5 w-5" />} 
            label="Settings" 
            isCollapsed={isCollapsed} 
          />
          {!isCollapsed && (
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
          )}
        </div>
      </div>

      {/* Desktop Remove Transactions Drawer */}
      <Drawer open={isRemoveTransactionsOpen} onOpenChange={setIsRemoveTransactionsOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Remove Transactions</DrawerTitle>
            <DrawerDescription>Select transactions to remove</DrawerDescription>
          </DrawerHeader>
          <div className="px-4 py-2 max-h-[60vh] overflow-y-auto">
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <TransactionItem 
                  key={transaction.id} 
                  transaction={transaction} 
                  onDelete={onDeleteTransaction}
                />
              ))
            ) : (
              <p className="text-center text-muted-foreground py-4">No transactions to show</p>
            )}
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline" className="w-full">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  isCollapsed?: boolean;
  isDropdown?: boolean;
  isSubmenu?: boolean;
  onClick?: () => void;
  tooltip?: string;
}

const NavItem: React.FC<NavItemProps> = ({ 
  icon, 
  label, 
  active, 
  isCollapsed = false,
  isDropdown = false,
  isSubmenu = false,
  onClick,
  tooltip
}) => {
  return (
    <button
      onClick={onClick}
      title={tooltip}
      className={cn(
        "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        active 
          ? "bg-secondary text-expense-purple" 
          : "text-muted-foreground hover:bg-secondary/50 hover:text-expense-purple",
        isSubmenu && "py-1.5 text-xs",
        isCollapsed && "justify-center px-0"
      )}
    >
      {icon}
      {!isCollapsed && (
        <>
          <span className="flex-1 text-left">{label}</span>
          {isDropdown && <ChevronIcon />}
        </>
      )}
    </button>
  );
};

const ChevronIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

export default Sidebar;
