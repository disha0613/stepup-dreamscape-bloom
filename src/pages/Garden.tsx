
import React, { useState, useEffect } from "react";
import GardenTree from "@/components/GardenTree";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { Badge } from "@/components/ui/badge";

type Season = "spring" | "summer" | "fall" | "winter";

const Garden = () => {
  const { toast } = useToast();
  const [streak, setStreak] = useState(7);
  const [tasksCompleted, setTasksCompleted] = useState(23);
  const [season, setSeason] = useState<Season>("spring");
  
  // Initialize garden achievements
  const [achievements, setAchievements] = useState({
    oneWeek: streak >= 7,
    twoWeeks: streak >= 14,
    oneMonth: streak >= 30,
    twentyTasks: tasksCompleted >= 20,
    fiftyTasks: tasksCompleted >= 50
  });

  // Change season
  const handleChangeSeason = (newSeason: Season) => {
    setSeason(newSeason);
    toast({
      title: "Season changed",
      description: `Your garden is now in ${newSeason} mode!`
    });
  };
  
  return (
    <div className="animate-fade-in">
      <h1 className="mb-6">Growth Garden</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <GardenTree 
            streak={streak}
            tasksCompleted={tasksCompleted}
            season={season}
          />
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Garden Options</CardTitle>
              <CardDescription>Customize your consistency garden</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-3">Change Season</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={season === "spring" ? "default" : "outline"}
                    onClick={() => handleChangeSeason("spring")}
                    className="flex flex-col h-auto py-3"
                  >
                    <span className="text-lg">🌱</span>
                    <span className="text-xs mt-1">Spring</span>
                  </Button>
                  <Button
                    variant={season === "summer" ? "default" : "outline"}
                    onClick={() => handleChangeSeason("summer")}
                    className="flex flex-col h-auto py-3"
                  >
                    <span className="text-lg">🌳</span>
                    <span className="text-xs mt-1">Summer</span>
                  </Button>
                  <Button
                    variant={season === "fall" ? "default" : "outline"}
                    onClick={() => handleChangeSeason("fall")}
                    className="flex flex-col h-auto py-3"
                  >
                    <span className="text-lg">🍁</span>
                    <span className="text-xs mt-1">Fall</span>
                  </Button>
                  <Button
                    variant={season === "winter" ? "default" : "outline"}
                    onClick={() => handleChangeSeason("winter")}
                    className="flex flex-col h-auto py-3"
                  >
                    <span className="text-lg">❄️</span>
                    <span className="text-xs mt-1">Winter</span>
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-3">Tree Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-pastel-green p-3 rounded-lg text-center">
                    <p className="text-xs text-muted-foreground">Streak</p>
                    <p className="text-2xl font-bold">{streak} days</p>
                  </div>
                  <div className="bg-pastel-blue p-3 rounded-lg text-center">
                    <p className="text-xs text-muted-foreground">Tasks</p>
                    <p className="text-2xl font-bold">{tasksCompleted}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Milestones on your consistency journey</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex justify-between items-center">
                  <span>🌱 One Week Streak</span>
                  {achievements.oneWeek ? 
                    <Badge className="bg-green-500">Unlocked</Badge> : 
                    <Badge variant="outline">{streak}/7 days</Badge>
                  }
                </li>
                <li className="flex justify-between items-center">
                  <span>🪴 Two Week Consistency</span>
                  {achievements.twoWeeks ? 
                    <Badge className="bg-green-500">Unlocked</Badge> : 
                    <Badge variant="outline">{streak}/14 days</Badge>
                  }
                </li>
                <li className="flex justify-between items-center">
                  <span>🌳 Month-long Dedication</span>
                  {achievements.oneMonth ? 
                    <Badge className="bg-green-500">Unlocked</Badge> : 
                    <Badge variant="outline">{streak}/30 days</Badge>
                  }
                </li>
                <li className="flex justify-between items-center">
                  <span>✓ Task Master (20 tasks)</span>
                  {achievements.twentyTasks ? 
                    <Badge className="bg-green-500">Unlocked</Badge> : 
                    <Badge variant="outline">{tasksCompleted}/20 tasks</Badge>
                  }
                </li>
                <li className="flex justify-between items-center">
                  <span>🏆 Productivity Pro (50 tasks)</span>
                  {achievements.fiftyTasks ? 
                    <Badge className="bg-green-500">Unlocked</Badge> : 
                    <Badge variant="outline">{tasksCompleted}/50 tasks</Badge>
                  }
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Garden;
