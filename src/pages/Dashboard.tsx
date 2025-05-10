
import React, { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import VirtualCompanion from "@/components/VirtualCompanion";
import TaskCard, { Task, TaskStatus, Comment } from "@/components/TaskCard";
import StreakCounter from "@/components/StreakCounter";
import MoodChecker from "@/components/MoodChecker";
import TaskInput from "@/components/TaskInput";
import { useToast } from "@/hooks/use-toast";

// Mock data for initial tasks with comments
const mockTasks: Task[] = [
  {
    id: "1",
    title: "Complete math assignment",
    description: "Algebra Chapter 7, Problems 1-20",
    status: "pending",
    dueDate: new Date(Date.now() + 3600000), // 1 hour from now
    comments: [
      {
        id: "c1",
        text: "Need to focus on the quadratic equations section",
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        author: "Me"
      }
    ]
  },
  {
    id: "2",
    title: "30 minutes of Spanish practice",
    status: "completed",
    dueDate: new Date(),
    comments: [
      {
        id: "c2",
        text: "Focused on past tense conjugations",
        createdAt: new Date(Date.now() - 43200000), // 12 hours ago
        author: "Me"
      },
      {
        id: "c3",
        text: "Used Duolingo and completed 3 lessons",
        createdAt: new Date(Date.now() - 21600000), // 6 hours ago
        author: "Me"
      }
    ]
  },
  {
    id: "3",
    title: "Read 20 pages of psychology textbook",
    status: "pending",
    dueDate: new Date(Date.now() + 7200000), // 2 hours from now
  },
  {
    id: "4",
    title: "Submit English essay draft",
    status: "missed",
    dueDate: new Date(Date.now() - 86400000), // 1 day ago
    comments: [
      {
        id: "c4",
        text: "Missed deadline due to power outage",
        createdAt: new Date(Date.now() - 43200000), // 12 hours ago
        author: "Me"
      }
    ]
  }
];

const Dashboard = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [currentStreak, setCurrentStreak] = useState(7);
  const [longestStreak, setLongestStreak] = useState(14);
  const [companionMood, setCompanionMood] = useState<"happy" | "neutral" | "sad">("neutral");
  const [tasksCompleted, setTasksCompleted] = useState(23);
  const [todayComplete, setTodayComplete] = useState(false);
  const [userMood, setUserMood] = useState<string>("neutral");
  
  // Handle task status change
  const handleTaskStatusChange = (taskId: string, status: TaskStatus) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { ...task, status } 
          : task
      )
    );
    
    // Update tasks completed count
    if (status === "completed") {
      setTasksCompleted(prev => prev + 1);
      toast({
        title: "Task completed!",
        description: "Great job! Keep going.",
      });
      
      // Check if all of today's tasks are complete
      const updatedTasks = tasks.map(task => 
        task.id === taskId ? { ...task, status } : task
      );
      
      const todaysTasks = updatedTasks.filter(task => 
        new Date(task.dueDate).toDateString() === new Date().toDateString()
      );
      
      const allComplete = todaysTasks.every(task => task.status === "completed");
      if (allComplete && todaysTasks.length > 0) {
        setTodayComplete(true);
        setCompanionMood("happy");
        toast({
          title: "All of today's tasks complete!",
          description: "Amazing work! Your companion is proud of you.",
        });
      }
    } else {
      // If marking as incomplete
      setTasksCompleted(prev => Math.max(0, prev - 1));
      
      // Check if we need to update today's completion status
      const updatedTasks = tasks.map(task => 
        task.id === taskId ? { ...task, status } : task
      );
      
      const todaysTasks = updatedTasks.filter(task => 
        new Date(task.dueDate).toDateString() === new Date().toDateString()
      );
      
      const allComplete = todaysTasks.every(task => task.status === "completed");
      if (!allComplete && todayComplete) {
        setTodayComplete(false);
      }
    }
  };
  
  // Handle mood changes
  const handleMoodChange = (mood: any) => {
    // Store user mood
    setUserMood(mood);
    
    // Update companion mood based on user mood
    if (["great", "good"].includes(mood)) {
      setCompanionMood("happy");
    } else if (["okay"].includes(mood)) {
      setCompanionMood("neutral");
    } else {
      setCompanionMood("sad");
    }
    
    toast({
      title: "Mood updated",
      description: "Your companion has adjusted to match your energy!",
    });
  };
  
  // Handle adding a new task
  const handleAddTask = (task: Task) => {
    setTasks(prev => [...prev, task]);
  };
  
  // Handle adding multiple tasks at once
  const handleAddMultipleTasks = (newTasks: Task[]) => {
    setTasks(prev => [...prev, ...newTasks]);
  };

  // Handle adding a comment to a task
  const handleAddComment = (taskId: string, commentText: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const newComment: Comment = {
          id: Date.now().toString(),
          text: commentText,
          createdAt: new Date(),
          author: "Me"
        };
        
        return {
          ...task,
          comments: [...(task.comments || []), newComment]
        };
      }
      return task;
    }));
  };

  return (
    <div className="animate-fade-in">
      <h1 className="mb-6">Dashboard</h1>
      
      <TaskInput 
        onAddTask={handleAddTask} 
        onAddMultipleTasks={handleAddMultipleTasks}
        userMood={userMood}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Today's Tasks</CardTitle>
            <CardDescription>Stay on track with your goals</CardDescription>
          </CardHeader>
          <CardContent>
            {tasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onStatusChange={handleTaskStatusChange}
                onAddComment={handleAddComment}
              />
            ))}
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <StreakCounter 
            currentStreak={currentStreak}
            longestStreak={longestStreak}
            todayComplete={todayComplete}
          />
          
          <Card>
            <CardContent className="p-6 flex justify-center">
              <VirtualCompanion 
                streak={currentStreak}
                tasksCompleted={tasksCompleted}
                mood={companionMood}
              />
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MoodChecker onMoodChange={handleMoodChange} />
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Your productivity snapshot</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-pastel-green p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Completed Tasks</p>
                <p className="text-2xl font-bold">{tasksCompleted}</p>
              </div>
              <div className="bg-pastel-blue p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <p className="text-2xl font-bold">{currentStreak} days</p>
              </div>
              <div className="bg-pastel-yellow p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Completion Rate</p>
                <p className="text-2xl font-bold">
                  {Math.round((tasks.filter(t => t.status === "completed").length / tasks.length) * 100)}%
                </p>
              </div>
              <div className="bg-pastel-purple p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Pending Tasks</p>
                <p className="text-2xl font-bold">
                  {tasks.filter(t => t.status === "pending").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
