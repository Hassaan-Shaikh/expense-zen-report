
import { getCategoryById } from "@/lib/data";
import { 
  Activity, 
  Car, 
  DollarSign, 
  Film, 
  Home, 
  MoreHorizontal, 
  ShoppingBag, 
  ShoppingCart, 
  Utensils 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  categoryId: string;
  className?: string;
  showLabel?: boolean;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ 
  categoryId,
  className,
  showLabel = false 
}) => {
  const category = getCategoryById(categoryId);
  
  const getIcon = () => {
    switch (category.icon) {
      case 'shopping-cart':
        return <ShoppingCart className="h-4 w-4" />;
      case 'utensils':
        return <Utensils className="h-4 w-4" />;
      case 'car':
        return <Car className="h-4 w-4" />;
      case 'film':
        return <Film className="h-4 w-4" />;
      case 'shopping-bag':
        return <ShoppingBag className="h-4 w-4" />;
      case 'home':
        return <Home className="h-4 w-4" />;
      case 'activity':
        return <Activity className="h-4 w-4" />;
      case 'dollar-sign':
        return <DollarSign className="h-4 w-4" />;
      default:
        return <MoreHorizontal className="h-4 w-4" />;
    }
  };
  
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full text-white",
        category.color
      )}>
        {getIcon()}
      </div>
      {showLabel && (
        <span className="text-sm font-medium">{category.name}</span>
      )}
    </div>
  );
};

export default CategoryBadge;
