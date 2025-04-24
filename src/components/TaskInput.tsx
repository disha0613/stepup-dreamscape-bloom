
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Check, List, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Task, TaskStatus } from "@/components/TaskCard";
import { generateSubtasks, getTaskDifficulty } from "@/utils/taskUtils";

interface TaskInputProps {
  onAddTask: (task: Task) => void;
  onAddMultipleTasks: (tasks: Task[]) => void;
  userMood?: string;
}

const TaskInput = ({ onAddTask, onAddMultipleTasks, userMood = "neutral" }: TaskInputProps) => {
  const { toast } = useToast();
  const [taskTitle, setTaskTitle] = useState("");
  const [showSubtaskDialog, setShowSubtaskDialog] = useState(false);
  const [generatedSubtasks, setGeneratedSubtasks] = useState<{title: string, selected: boolean, deposit: number}[]>([]);
  const [mainTaskId, setMainTaskId] = useState("");

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!taskTitle.trim()) {
      toast({
        title: "Task title is required",
        description: "Please enter a task title",
        variant: "destructive"
      });
      return;
    }

    // Create the main task
    const newTaskId = Date.now().toString();
    setMainTaskId(newTaskId);
    
    // Generate subtasks based on the main task
    const subtasks = generateSubtasks(taskTitle, userMood);
    
    if (subtasks.length > 0) {
      // Show dialog for subtasks
      setGeneratedSubtasks(
        subtasks.map(title => ({
          title,
          selected: true,
          deposit: getTaskDifficulty(title)
        }))
      );
      setShowSubtaskDialog(true);
    } else {
      // Just add the main task
      addMainTask(newTaskId);
    }
  };

  const addMainTask = (taskId: string) => {
    const newTask: Task = {
      id: taskId,
      title: taskTitle,
      status: "pending",
      dueDate: new Date(Date.now() + 86400000), // 1 day from now by default
    };
    
    onAddTask(newTask);
    setTaskTitle("");
    
    toast({
      title: "Task added!",
      description: "Your new task has been added to your list.",
    });
  };

  const handleSubtasksConfirmed = () => {
    // Add main task
    addMainTask(mainTaskId);
    
    // Add selected subtasks
    const selectedSubtasks = generatedSubtasks
      .filter(task => task.selected)
      .map(task => ({
        id: Date.now().toString() + Math.random().toString(36).slice(2, 7),
        title: task.title,
        status: "pending" as TaskStatus,
        dueDate: new Date(Date.now() + 86400000), // 1 day from now by default
        goalId: mainTaskId, // Link to the main task
        deposit: task.deposit
      }));
    
    if (selectedSubtasks.length > 0) {
      onAddMultipleTasks(selectedSubtasks);
      
      toast({
        title: "Subtasks added!",
        description: `${selectedSubtasks.length} subtasks have been added to your list.`,
      });
    }
    
    setShowSubtaskDialog(false);
    setGeneratedSubtasks([]);
  };

  const toggleSubtask = (index: number) => {
    setGeneratedSubtasks(prev => 
      prev.map((task, i) => 
        i === index ? { ...task, selected: !task.selected } : task
      )
    );
  };

  const getTotalDeposit = () => {
    return generatedSubtasks
      .filter(task => task.selected)
      .reduce((sum, task) => sum + task.deposit, 0);
  };

  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add a new task</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleTaskSubmit} className="flex gap-2">
            <Input
              placeholder="Enter a task like 'Study for GATE exam'..."
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">
              <Plus size={16} className="mr-1" /> Add Task
            </Button>
          </form>
        </CardContent>
      </Card>

      <Dialog open={showSubtaskDialog} onOpenChange={setShowSubtaskDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Break down your task into subtasks</DialogTitle>
            <DialogDescription>
              We've generated some subtasks for "{taskTitle}". Select the ones you want to add.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 my-4 max-h-[60vh] overflow-auto">
            {generatedSubtasks.map((subtask, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 border rounded-md">
                <Checkbox
                  checked={subtask.selected}
                  onCheckedChange={() => toggleSubtask(index)}
                  id={`subtask-${index}`}
                />
                <div className="space-y-1 flex-1">
                  <Label htmlFor={`subtask-${index}`} className="font-medium">
                    {subtask.title}
                  </Label>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-green-600">${subtask.deposit}</span> deposit
                  </div>
                </div>
              </div>
            ))}

            {generatedSubtasks.length > 0 && (
              <div className="border-t pt-3 font-medium">
                Total deposit: ${getTotalDeposit()}
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSubtaskDialog(false)}>
              Just the main task
            </Button>
            <Button onClick={handleSubtasksConfirmed} className="gap-2">
              <Check size={16} /> Add selected subtasks
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TaskInput;
