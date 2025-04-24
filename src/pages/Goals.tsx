
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import GoalCard, { Goal } from "@/components/GoalCard";
import { format } from "date-fns";

// Mock data for initial goals
const mockGoals: Goal[] = [
  {
    id: "1",
    title: "Learn Python Programming",
    description: "Master Python fundamentals and build a simple web app",
    deposit: 50,
    target: 100,
    current: 30,
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    totalTasks: 10,
    completedTasks: 3,
  },
  {
    id: "2",
    title: "Get Fit for Summer",
    description: "Exercise regularly and improve stamina",
    deposit: 100,
    target: 200,
    current: 70,
    deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
    totalTasks: 20,
    completedTasks: 14,
  }
];

const Goals = () => {
  const { toast } = useToast();
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [isCreating, setIsCreating] = useState(false);
  
  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deposit, setDeposit] = useState<number>(0);
  const [deadline, setDeadline] = useState<Date | undefined>(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  );
  
  const handleCreateGoal = () => {
    if (!title || !deposit || !deadline) {
      toast({
        variant: "destructive",
        title: "Missing fields",
        description: "Please fill in all required fields.",
      });
      return;
    }
    
    const newGoal: Goal = {
      id: Date.now().toString(),
      title,
      description,
      deposit,
      target: deposit * 2, // Example calculation
      current: 0,
      deadline,
      totalTasks: 0,
      completedTasks: 0,
    };
    
    setGoals([...goals, newGoal]);
    toast({
      title: "Goal created!",
      description: "Your new goal has been set up successfully.",
    });
    
    // Reset form
    setTitle("");
    setDescription("");
    setDeposit(0);
    setDeadline(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
    setIsCreating(false);
  };
  
  const handleViewDetails = (goalId: string) => {
    toast({
      title: "Goal details",
      description: "Viewing details of the goal. (Full implementation coming soon)",
    });
  };
  
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="mb-0">Goal Setup</h1>
        <Button onClick={() => setIsCreating(!isCreating)}>
          {isCreating ? "Cancel" : (
            <>
              <Plus size={16} className="mr-1" /> New Goal
            </>
          )}
        </Button>
      </div>
      
      {isCreating && (
        <Card className="mb-8 bg-pastel-purple/10">
          <CardHeader>
            <CardTitle>Create a New Goal</CardTitle>
            <CardDescription>Define your goal, break it into tasks, and set a cash deposit</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Goal Title *</Label>
                <Input 
                  id="title" 
                  placeholder="What do you want to achieve?" 
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Add some details about your goal..." 
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="deposit">Cash Deposit Amount ($) *</Label>
                <div className="flex items-center">
                  <span className="mr-2">$</span>
                  <Input 
                    id="deposit" 
                    type="number" 
                    placeholder="0" 
                    min="0"
                    value={deposit || ""}
                    onChange={e => setDeposit(Number(e.target.value))}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  This amount will be used as a motivation. You'll earn it back as you complete tasks.
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="deadline">Deadline *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="deadline"
                      variant={"outline"}
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {deadline ? format(deadline, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={deadline}
                      onSelect={setDeadline}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <Button className="mt-4" onClick={handleCreateGoal}>
                Create Goal
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>
      
      {goals.length === 0 && !isCreating && (
        <Card className="text-center p-12">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-xl font-semibold">No Goals Yet</h3>
          <p className="text-muted-foreground mb-6">
            Create your first goal to start tracking your progress.
          </p>
          <Button onClick={() => setIsCreating(true)}>
            <Plus size={16} className="mr-1" /> Create Your First Goal
          </Button>
        </Card>
      )}
    </div>
  );
};

export default Goals;
