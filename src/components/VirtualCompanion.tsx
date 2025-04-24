
import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

interface VirtualCompanionProps {
  streak: number;
  tasksCompleted: number;
  mood?: "happy" | "neutral" | "sad";
  type?: "cat" | "dog" | "plant" | "robot";
}

const VirtualCompanion = ({
  streak = 0,
  tasksCompleted = 0,
  mood = "neutral",
  type = "cat",
}: VirtualCompanionProps) => {
  const { toast } = useToast();
  const [animation, setAnimation] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // Determine companion level based on streak
  const level = streak < 3 ? 1 : streak < 7 ? 2 : streak < 14 ? 3 : 4;

  // Messages based on mood and streak
  const messages = {
    happy: [
      "You're doing amazing! Keep it up!",
      "I'm so proud of you! 🌟",
      "You're on fire today!",
      "We make such a great team!",
    ],
    neutral: [
      "Ready for today's tasks?",
      "Let's make today count!",
      "Remember your why!",
      "Small steps lead to big changes.",
    ],
    sad: [
      "It's okay to have off days.",
      "Let's get back on track together.",
      "You can do this, I believe in you!",
      "Tomorrow is a new opportunity.",
    ],
  };

  useEffect(() => {
    // Set random encouraging message
    const moodMessages = messages[mood] || messages.neutral;
    setMessage(moodMessages[Math.floor(Math.random() * moodMessages.length)]);

    // Set animation
    setAnimation(mood === "happy" ? "animate-float" : "");
  }, [mood, streak]);

  const handlePet = () => {
    setAnimation("animate-scale-in");
    toast({
      title: "Companion loves you!",
      description: "Your companion feels appreciated.",
    });
    setTimeout(() => setAnimation("animate-float"), 1000);
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        className={`relative cursor-pointer mb-2 ${animation}`} 
        onClick={handlePet}
      >
        {/* Companion image based on type and level */}
        <div className="w-20 h-20 bg-pastel-purple rounded-full flex items-center justify-center">
          {type === "cat" && (
            <span className="text-3xl">🐱</span>
          )}
          {type === "dog" && (
            <span className="text-3xl">🐶</span>
          )}
          {type === "plant" && (
            <span className="text-3xl">🌱</span>
          )}
          {type === "robot" && (
            <span className="text-3xl">🤖</span>
          )}
        </div>
        
        {/* Level indicator */}
        <div className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {level}
        </div>
      </div>

      {/* Companion speech bubble */}
      <div className="bg-white p-3 rounded-lg shadow-sm max-w-[200px] text-center relative">
        <div className="absolute top-[-8px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-white"></div>
        <p className="text-xs">{message}</p>
      </div>
    </div>
  );
};

export default VirtualCompanion;
