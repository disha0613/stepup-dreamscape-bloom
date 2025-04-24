
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface GardenTreeProps {
  streak: number;
  tasksCompleted: number;
  season?: "spring" | "summer" | "fall" | "winter";
}

const GardenTree = ({
  streak = 0,
  tasksCompleted = 0,
  season = "spring"
}: GardenTreeProps) => {
  // Determine growth level based on streak
  const level = streak < 3 ? 1 : streak < 7 ? 2 : streak < 14 ? 3 : streak < 30 ? 4 : 5;
  
  // Get the base emoji for the tree based on season
  const seasonEmojis = {
    spring: "🌱",
    summer: "🌳",
    fall: "🍁",
    winter: "❄️"
  };
  
  // Get growth emojis based on level
  const getGrowthEmoji = () => {
    if (season === "spring") {
      if (level === 1) return "🌱";
      if (level === 2) return "🌿";
      if (level === 3) return "🪴";
      if (level === 4) return "🌲";
      return "🌲🌲";
    }
    
    if (season === "summer") {
      if (level === 1) return "🌱";
      if (level === 2) return "🌿";
      if (level === 3) return "🌳";
      if (level === 4) return "🌳🌳";
      return "🌳🌳🌳";
    }
    
    if (season === "fall") {
      if (level === 1) return "🍂";
      if (level === 2) return "🍂🌿";
      if (level === 3) return "🍁🌳";
      if (level === 4) return "🍁🌳🌳";
      return "🍁🌳🌳🌳";
    }
    
    // Winter
    if (level === 1) return "❄️";
    if (level === 2) return "❄️🌿";
    if (level === 3) return "❄️🌲";
    if (level === 4) return "❄️🌲🌲";
    return "❄️🌲🌲🌲";
  };
  
  return (
    <Card className="h-full">
      <CardContent className="p-8 flex flex-col items-center justify-center">
        <div className={`text-7xl sm:text-8xl md:text-9xl mb-6 animate-${level === 1 ? "grow" : "float"}`}>
          {getGrowthEmoji()}
        </div>
        
        <div className="text-center">
          <h3 className="text-xl font-semibold">Your Consistency Tree</h3>
          <p className="text-muted-foreground">
            {level === 1 && "Just planted! Keep going to help it grow."}
            {level === 2 && "Starting to sprout. You're making progress!"}
            {level === 3 && "Growing steadily! Your consistency is paying off."}
            {level === 4 && "Looking strong and healthy! Amazing work!"}
            {level === 5 && "Your tree is flourishing! You're a consistency master!"}
          </p>
          
          <div className="mt-4 flex gap-4 justify-center text-sm">
            <div>
              <p className="font-semibold">{streak}</p>
              <p className="text-muted-foreground">Day Streak</p>
            </div>
            <div>
              <p className="font-semibold">{tasksCompleted}</p>
              <p className="text-muted-foreground">Tasks Done</p>
            </div>
            <div>
              <p className="font-semibold">{level}/5</p>
              <p className="text-muted-foreground">Tree Level</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GardenTree;
