
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export interface Goal {
  id: string;
  title: string;
  description?: string;
  target: number;
  current: number;
  deposit: number;
  deadline: Date;
  totalTasks: number;
  completedTasks: number;
}

interface GoalCardProps {
  goal: Goal;
  onViewDetails?: (goalId: string) => void;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount);
};

const GoalCard = ({ goal, onViewDetails }: GoalCardProps) => {
  const { id, title, description, target, current, deposit, deadline, totalTasks, completedTasks } = goal;
  
  const progress = Math.round((completedTasks / totalTasks) * 100) || 0;
  const daysLeft = Math.max(0, Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));
  
  // Calculate earnings
  const earned = Math.round((completedTasks / totalTasks) * deposit);
  
  return (
    <Card className="h-full hover:shadow-md transition-all">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
          <Badge variant={daysLeft < 3 ? "destructive" : "outline"}>
            {daysLeft} days left
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>Progress: {progress}%</span>
              <span>
                {completedTasks} of {totalTasks} tasks
              </span>
            </div>
            <Progress value={progress} />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Deposit</p>
              <p className="text-lg font-semibold">{formatCurrency(deposit)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Earned so far</p>
              <p className="text-lg font-semibold text-green-600">{formatCurrency(earned)}</p>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={() => onViewDetails?.(id)} 
          variant="outline" 
          className="w-full"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GoalCard;
