
import { Bell, Menu, Search, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onToggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex h-16 items-center justify-between border-b px-4 md:px-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onToggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
        <div className={cn(isMobile ? "flex" : "hidden md:flex")}>
          <h1 className="text-xl font-bold text-expense-purple">ExpenseZen</h1>
        </div>
      </div>
      
      <div className="hidden md:flex md:w-1/3">
        <div className="relative w-full">
          <p>
            "For All Your Expensive Needs!"
          </p>
          {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search transactions..."
            className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
          /> */}
        </div>
      </div>
      <div></div>
      {/* <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <UserCircle className="h-7 w-7 text-expense-purple" />
        </Button>
      </div> */}
    </div>
  );
};

export default Navbar;
