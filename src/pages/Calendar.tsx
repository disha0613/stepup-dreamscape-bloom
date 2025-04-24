
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Task, TaskStatus } from "@/components/TaskCard";
import { useToast } from "@/hooks/use-toast";
import { format, isSameDay } from "date-fns";

// Generate mock tasks across dates
const generateMockTasks = () => {
  const today = new Date();
  const tasks: Task[] = [];
  
  for (let i = -15; i < 15; i++) {
    const taskDate = new Date();
    taskDate.setDate(today.getDate() + i);
    
    // Only add tasks on some days
    if (Math.random() > 0.5) {
      // Add 1-3 tasks per day
      const tasksPerDay = Math.floor(Math.random() * 3) + 1;
      
      for (let j = 0; j < tasksPerDay; j++) {
        const status: TaskStatus = 
          i < 0 ? (Math.random() > 0.3 ? "completed" : "missed") : 
          i === 0 ? (Math.random() > 0.5 ? "completed" : "pending") :
          "pending";
          
        tasks.push({
          id: `task-${i}-${j}`,
          title: `Task ${j + 1} for ${format(taskDate, "MMM dd")}`,
          status,
          dueDate: taskDate,
          description: Math.random() > 0.5 ? `Description for task on ${format(taskDate, "MMM dd")}` : undefined,
        });
      }
    }
  }
  
  return tasks;
};

const Calendar = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [tasks, setTasks] = useState<Task[]>(generateMockTasks());
  
  // Filter tasks for the selected date
  const selectedDateTasks = date 
    ? tasks.filter(task => isSameDay(new Date(task.dueDate), date)) 
    : [];
    
  // Calculate stats for the selected date
  const completedTasks = selectedDateTasks.filter(t => t.status === "completed").length;
  const totalTasks = selectedDateTasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Get days with tasks for highlighting in the calendar
  const getDayHighlight = (day: Date) => {
    const dayTasks = tasks.filter(task => isSameDay(new Date(task.dueDate), day));
    
    if (dayTasks.length === 0) {
      return undefined;
    }
    
    const allCompleted = dayTasks.every(t => t.status === "completed");
    const allMissed = dayTasks.every(t => t.status === "missed");
    const hasPending = dayTasks.some(t => t.status === "pending");
    
    if (allCompleted) return "bg-green-100 text-green-800";
    if (allMissed) return "bg-red-100 text-red-800";
    if (hasPending) return "bg-yellow-100 text-yellow-800";
    
    return "bg-gray-100"; // Mixed statuses
  };

  return (
    <div className="animate-fade-in">
      <h1 className="mb-6">Calendar View</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Tasks Calendar</CardTitle>
              <CardDescription>
                View and manage your scheduled tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-6">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                modifiersStyles={{
                  selected: {
                    backgroundColor: "hsl(var(--primary))",
                    color: "white",
                  }
                }}
                modifiers={{
                  taskDay: (day) => {
                    return tasks.some(task => isSameDay(new Date(task.dueDate), day));
                  }
                }}
                modifiersClassNames={{
                  taskDay: "font-bold"
                }}
                components={{
                  DayContent: ({ date, ...props }) => {
                    const highlight = getDayHighlight(date);
                    
                    // Count tasks for this day
                    const dayTasks = tasks.filter(task => 
                      isSameDay(new Date(task.dueDate), date)
                    );
                    
                    return (
                      <div
                        {...props}
                        className={`relative w-full h-full flex items-center justify-center ${highlight || ""}`}
                      >
                        <span>{date.getDate()}</span>
                        {dayTasks.length > 0 && (
                          <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-primary"></span>
                        )}
                      </div>
                    );
                  }
                }}
              />
            </CardContent>
          </Card>
          
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">
              {date ? (
                format(date, "MMMM do, yyyy") === format(new Date(), "MMMM do, yyyy") 
                  ? "Today's Tasks" 
                  : `Tasks for ${format(date, "MMMM do, yyyy")}`
              ) : "Tasks"}
            </h2>
            
            {selectedDateTasks.length > 0 ? (
              <div className="space-y-3">
                {selectedDateTasks.map(task => (
                  <Card key={task.id} className={`
                    ${task.status === "completed" ? "border-green-400 bg-green-50" : 
                      task.status === "missed" ? "border-red-400 bg-red-50" : 
                      "border-yellow-400 bg-yellow-50"}
                  `}>
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-base font-medium">{task.title}</h3>
                          {task.description && (
                            <p className="text-sm text-muted-foreground">{task.description}</p>
                          )}
                        </div>
                        <Badge variant={
                          task.status === "completed" ? "default" : 
                          task.status === "missed" ? "destructive" : 
                          "outline"
                        }>
                          {task.status === "completed" && "Completed"}
                          {task.status === "pending" && "Pending"}
                          {task.status === "missed" && "Missed"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-gray-50">
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">No tasks scheduled for this day.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Day Stats</CardTitle>
              <CardDescription>
                {date ? format(date, "MMMM do, yyyy") : "Select a date"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedDateTasks.length > 0 ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-pastel-blue p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">Tasks</p>
                      <p className="text-2xl font-bold">{totalTasks}</p>
                    </div>
                    <div className="bg-pastel-green p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">Completed</p>
                      <p className="text-2xl font-bold">{completedTasks}</p>
                    </div>
                    <div className="bg-pastel-yellow p-4 rounded-lg col-span-2">
                      <p className="text-sm text-muted-foreground">Completion Rate</p>
                      <p className="text-2xl font-bold">{completionRate}%</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-1">Status Breakdown</h4>
                    <div className="flex gap-2">
                      <div className="h-2 bg-green-400" style={{ width: `${
                        (selectedDateTasks.filter(t => t.status === "completed").length / totalTasks) * 100
                      }%` }}></div>
                      <div className="h-2 bg-yellow-400" style={{ width: `${
                        (selectedDateTasks.filter(t => t.status === "pending").length / totalTasks) * 100
                      }%` }}></div>
                      <div className="h-2 bg-red-400" style={{ width: `${
                        (selectedDateTasks.filter(t => t.status === "missed").length / totalTasks) * 100
                      }%` }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Completed</span>
                      <span>Pending</span>
                      <span>Missed</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">
                    No data available for this day.
                  </p>
                  {date && format(date, "yyyy-MM-dd") > format(new Date(), "yyyy-MM-dd") && (
                    <Button 
                      variant="outline" 
                      className="mt-3"
                      onClick={() => toast({
                        title: "Coming Soon",
                        description: "Adding tasks from the calendar will be available in a future update!"
                      })}
                    >
                      Add Task for This Day
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="bg-pastel-purple/20">
            <CardHeader>
              <CardTitle>Calendar Legend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-100 border border-green-400"></div>
                  <span>All tasks completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-yellow-100 border border-yellow-400"></div>
                  <span>Tasks pending</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-100 border border-red-400"></div>
                  <span>Missed tasks</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-primary"></div>
                  <span>Selected day</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Monthly Overview</CardTitle>
              <CardDescription>April 2023</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Total Tasks</span>
                  <span className="font-semibold">38</span>
                </div>
                <div className="flex justify-between">
                  <span>Completed</span>
                  <span className="font-semibold text-green-600">29</span>
                </div>
                <div className="flex justify-between">
                  <span>Pending</span>
                  <span className="font-semibold text-yellow-600">5</span>
                </div>
                <div className="flex justify-between">
                  <span>Missed</span>
                  <span className="font-semibold text-red-600">4</span>
                </div>
                <div className="flex justify-between">
                  <span>Completion Rate</span>
                  <span className="font-semibold">76%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
