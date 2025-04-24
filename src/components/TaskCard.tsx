
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, Clock, DollarSign } from "lucide-react";

export type TaskStatus = "completed" | "pending" | "missed";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate: Date;
  goalId?: string;
  deposit?: number;
}

interface TaskCardProps {
  task: Task;
  onStatusChange?: (id: string, status: TaskStatus) => void;
}

const TaskCard = ({ task, onStatusChange }: TaskCardProps) => {
  const { id, title, description, status, dueDate, deposit } = task;
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };
  
  const handleStatusChange = () => {
    if (onStatusChange) {
      const newStatus: TaskStatus = status === "completed" ? "pending" : "completed";
      onStatusChange(id, newStatus);
    }
  };

  return (
    <Card className={`
      ${status === "completed" ? "border-green-400 bg-green-50" : 
        status === "missed" ? "border-red-400 bg-red-50" : 
        "border-yellow-400 bg-yellow-50"}
      mb-3 transition-all hover:shadow-md
    `}>
      <CardContent className="p-3 flex items-start justify-between">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={status === "completed"}
            onCheckedChange={handleStatusChange}
            className={`mt-1 ${status === "completed" ? "bg-green-500" : ""}`}
          />
          <div>
            <h3 className={`text-base font-medium mb-0 ${status === "completed" ? "line-through text-muted-foreground" : ""}`}>
              {title}
            </h3>
            {description && (
              <p className="text-sm text-muted-foreground m-0">{description}</p>
            )}
            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
              <span className="flex items-center">
                <Clock size={12} className="mr-1" />
                {formatDate(dueDate)}
              </span>
              
              {deposit && (
                <span className="flex items-center text-green-600 font-medium">
                  <DollarSign size={12} className="mr-0.5" />
                  {deposit}
                </span>
              )}
            </div>
          </div>
        </div>
        <Badge variant={
          status === "completed" ? "default" : 
          status === "missed" ? "destructive" : 
          "outline"
        }>
          {status === "completed" && (
            <span className="flex items-center">
              <Check size={12} className="mr-1" /> Done
            </span>
          )}
          {status === "pending" && "Pending"}
          {status === "missed" && "Missed"}
        </Badge>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
