
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface StreakCounterProps {
  currentStreak: number;
  longestStreak: number;
  todayComplete?: boolean;
}

const StreakCounter = ({ 
  currentStreak, 
  longestStreak, 
  todayComplete = false 
}: StreakCounterProps) => {
  // Calculate streak percentage for progress bar (max at 30 days)
  const streakPercentage = Math.min((currentStreak / 30) * 100, 100);
  
  // Get random motivational quote
  const quotes = [
    "Consistency is the secret to success!",
    "Small steps every day lead to big results.",
    "Your future self is thanking you right now.",
    "Showing up is half the battle, and you're winning!",
    "Every day you complete brings you one step closer to your dreams."
  ];
  
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <Card className="card-gradient">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold m-0">Your Streak</h3>
          <span className="text-sm text-muted-foreground">
            Longest: {longestStreak} days
          </span>
        </div>
        
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-4xl font-bold text-primary">{currentStreak}</span>
          <span className="text-lg">days</span>
          
          {todayComplete && (
            <span className="ml-2 bg-pastel-green px-2 py-1 rounded-md text-xs">
              Today ✓
            </span>
          )}
        </div>
        
        <Progress value={streakPercentage} className="h-2 mb-3" />
        
        <p className="text-sm text-muted-foreground italic">{randomQuote}</p>
      </CardContent>
    </Card>
  );
};

export default StreakCounter;
