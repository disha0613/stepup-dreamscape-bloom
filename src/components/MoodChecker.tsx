
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export type Mood = "great" | "good" | "okay" | "meh" | "bad";

interface MoodCheckerProps {
  onMoodChange?: (mood: Mood) => void;
}

const MoodChecker = ({ onMoodChange }: MoodCheckerProps) => {
  const { toast } = useToast();

  const handleMoodSelect = (mood: Mood) => {
    if (onMoodChange) {
      onMoodChange(mood);
    }
    
    toast({
      title: "Mood tracked!",
      description: `You're feeling ${mood} today. Keep going!`,
    });
  };

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-3">How are you feeling today?</h3>
        <div className="flex flex-wrap justify-between gap-2">
          <Button
            variant="outline"
            className="flex-1 py-6 flex flex-col items-center hover:bg-green-50"
            onClick={() => handleMoodSelect("great")}
          >
            <span className="text-2xl mb-1">😁</span>
            <span className="text-xs">Great</span>
          </Button>
          <Button
            variant="outline"
            className="flex-1 py-6 flex flex-col items-center hover:bg-blue-50"
            onClick={() => handleMoodSelect("good")}
          >
            <span className="text-2xl mb-1">🙂</span>
            <span className="text-xs">Good</span>
          </Button>
          <Button
            variant="outline"
            className="flex-1 py-6 flex flex-col items-center hover:bg-yellow-50"
            onClick={() => handleMoodSelect("okay")}
          >
            <span className="text-2xl mb-1">😐</span>
            <span className="text-xs">Okay</span>
          </Button>
          <Button
            variant="outline"
            className="flex-1 py-6 flex flex-col items-center hover:bg-orange-50"
            onClick={() => handleMoodSelect("meh")}
          >
            <span className="text-2xl mb-1">😕</span>
            <span className="text-xs">Meh</span>
          </Button>
          <Button
            variant="outline"
            className="flex-1 py-6 flex flex-col items-center hover:bg-pink-50"
            onClick={() => handleMoodSelect("bad")}
          >
            <span className="text-2xl mb-1">😔</span>
            <span className="text-xs">Bad</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodChecker;
