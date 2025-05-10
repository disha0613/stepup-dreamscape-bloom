
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Check, Clock, DollarSign, MessageSquare } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export type TaskStatus = "completed" | "pending" | "missed";

export interface Comment {
  id: string;
  text: string;
  createdAt: Date;
  author?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate: Date;
  goalId?: string;
  deposit?: number;
  comments?: Comment[];
}

interface TaskCardProps {
  task: Task;
  onStatusChange?: (id: string, status: TaskStatus) => void;
  onAddComment?: (taskId: string, comment: string) => void;
}

const TaskCard = ({ task, onStatusChange, onAddComment }: TaskCardProps) => {
  const { id, title, description, status, dueDate, deposit, comments = [] } = task;
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const { toast } = useToast();
  
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

  const handleAddComment = () => {
    if (newComment.trim() && onAddComment) {
      onAddComment(id, newComment);
      setNewComment("");
      toast({
        title: "Comment added",
        description: "Your comment has been added to this task",
      });
    } else if (!newComment.trim()) {
      toast({
        title: "Empty comment",
        description: "Please enter some text for your comment",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className={`
      ${status === "completed" ? "border-green-400 bg-green-50" : 
        status === "missed" ? "border-red-400 bg-red-50" : 
        "border-yellow-400 bg-yellow-50"}
      mb-3 transition-all hover:shadow-md
    `}>
      <CardContent className="p-3">
        <div className="flex items-start justify-between">
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
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-0 h-auto text-xs flex items-center gap-1 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowComments(!showComments)}
                >
                  <MessageSquare size={12} />
                  {comments.length > 0 ? comments.length : "Add comment"}
                </Button>
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
        </div>
        
        {showComments && (
          <div className="mt-3 pl-8">
            {comments.length > 0 && (
              <div className="space-y-2 mb-3">
                {comments.map((comment) => (
                  <div 
                    key={comment.id} 
                    className="bg-background p-2 rounded-md border text-sm"
                  >
                    <p className="m-0">{comment.text}</p>
                    <div className="text-xs text-muted-foreground mt-1">
                      {formatDate(comment.createdAt)}
                      {comment.author && ` - ${comment.author}`}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="space-y-2">
              <Textarea 
                placeholder="Add a comment..." 
                className="min-h-[60px] text-sm"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <div className="flex justify-end">
                <Button 
                  size="sm" 
                  onClick={handleAddComment}
                >
                  Add Comment
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskCard;
