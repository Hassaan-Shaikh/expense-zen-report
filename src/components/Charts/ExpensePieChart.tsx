
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTransactionsByCategory } from "@/lib/data";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const COLORS = [
  "#8B5CF6", // Purple
  "#33C3F0", // Blue
  "#14B8A6", // Teal
  "#10B981", // Green
  "#F59E0B", // Yellow
  "#F97316", // Orange
  "#EF4444", // Red
  "#D6BCFA", // Light Purple
];

const ExpensePieChart = () => {
  const categoryData = getTransactionsByCategory();
  
  // Convert data to format needed for recharts
  const data = Object.entries(categoryData)
    .filter(([_, value]) => value > 0) // Only include categories with expenses
    .map(([name, value], index) => ({
      name,
      value,
      color: COLORS[index % COLORS.length]
    }));
  
  return (
    <Card className="col-span-1 animate-fade-in [animation-delay:200ms]">
      <CardHeader>
        <CardTitle>Expense Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => {
                  // Ensure value is a number before using toFixed
                  return [
                    typeof value === 'number' 
                      ? `$${value.toFixed(2)}` 
                      : `$${value}`, 
                    'Amount'
                  ];
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpensePieChart;
