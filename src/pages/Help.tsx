
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toast";

const Help = () => {
  const { toast } = useToast();
  const [isDoNothingMode, setIsDoNothingMode] = useState(false);
  const [journalEntry, setJournalEntry] = useState("");
  
  const handleDoNothingModeToggle = () => {
    setIsDoNothingMode(!isDoNothingMode);
    toast({
      title: !isDoNothingMode ? "Do Nothing Mode Activated" : "Do Nothing Mode Deactivated",
      description: !isDoNothingMode 
        ? "Take all the time you need. No pressure, no reminders."
        : "Welcome back! Ready when you are."
    });
  };
  
  const handleJournalSubmit = () => {
    if (journalEntry.trim()) {
      toast({
        title: "Journal Entry Saved",
        description: "Your thoughts have been safely stored.",
      });
      setJournalEntry("");
    } else {
      toast({
        variant: "destructive",
        title: "Empty Entry",
        description: "Please write something before saving.",
      });
    }
  };
  
  return (
    <div className="animate-fade-in">
      <h1 className="mb-6">Burnout & Help</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className={`transition-all duration-500 ${isDoNothingMode ? "bg-pastel-blue" : ""}`}>
            <CardHeader>
              <CardTitle>Do Nothing Mode</CardTitle>
              <CardDescription>A safe space when you're feeling overwhelmed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-semibold">Activate Do Nothing Mode</h3>
                  <p className="text-sm text-muted-foreground">
                    Pause all notifications, reminders, and penalties
                  </p>
                </div>
                <Switch 
                  checked={isDoNothingMode}
                  onCheckedChange={handleDoNothingModeToggle}
                />
              </div>
              
              {isDoNothingMode && (
                <div className="animate-fade-in bg-white/50 p-6 rounded-lg text-center">
                  <div className="text-5xl mb-4">🌿</div>
                  <h3 className="text-xl font-semibold mb-2">Take a deep breath</h3>
                  <p className="mb-4">
                    It's okay to pause. Your goals will be here when you're ready to return.
                    No penalties, no pressure.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                    <Button variant="outline" className="bg-white/70">
                      Breathing Exercise
                    </Button>
                    <Button variant="outline" className="bg-white/70">
                      5-Minute Meditation
                    </Button>
                    <Button variant="outline" className="bg-white/70">
                      Calming Sounds
                    </Button>
                  </div>
                </div>
              )}
              
              {!isDoNothingMode && (
                <p>
                  Feeling overwhelmed? It's okay to take a break. Activate Do Nothing Mode when you need 
                  some space without losing your progress or incurring penalties.
                </p>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Anonymous Journal Space</CardTitle>
              <CardDescription>Express your thoughts, frustrations, or celebrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  This private space is just for you. No one else can see what you write here.
                </p>
                <Textarea 
                  placeholder="How are you feeling today? What's on your mind?" 
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                  rows={6}
                />
                <div className="flex justify-end">
                  <Button onClick={handleJournalSubmit}>Save Entry</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="bg-pastel-purple/20">
            <CardHeader>
              <CardTitle>Quick Support</CardTitle>
              <CardDescription>Ways to help yourself right now</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="bg-pastel-green h-8 w-8 rounded-full flex items-center justify-center shrink-0">
                    <span>1</span>
                  </div>
                  <p className="text-sm">
                    <span className="font-semibold block">Take five deep breaths</span>
                    Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds.
                  </p>
                </li>
                <li className="flex gap-3">
                  <div className="bg-pastel-yellow h-8 w-8 rounded-full flex items-center justify-center shrink-0">
                    <span>2</span>
                  </div>
                  <p className="text-sm">
                    <span className="font-semibold block">Do something simple and rewarding</span>
                    Make your bed, wash a dish, or tidy one small area.
                  </p>
                </li>
                <li className="flex gap-3">
                  <div className="bg-pastel-blue h-8 w-8 rounded-full flex items-center justify-center shrink-0">
                    <span>3</span>
                  </div>
                  <p className="text-sm">
                    <span className="font-semibold block">Hydrate and nourish</span>
                    Drink a glass of water and eat something, even if it's small.
                  </p>
                </li>
                <li className="flex gap-3">
                  <div className="bg-pastel-pink h-8 w-8 rounded-full flex items-center justify-center shrink-0">
                    <span>4</span>
                  </div>
                  <p className="text-sm">
                    <span className="font-semibold block">Change your environment</span>
                    Step outside for a few minutes or move to a different room.
                  </p>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Burnout Toolkit</CardTitle>
              <CardDescription>Resources for managing stress and overwhelm</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <span className="mr-2">📝</span> Burnout Assessment
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <span className="mr-2">🧠</span> Stress Management Guide
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <span className="mr-2">🌙</span> Sleep Improvement Tips
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <span className="mr-2">⏱️</span> Time Management Strategies
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-pastel-blue to-pastel-purple">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Remember</h3>
              <p className="italic">
                "Rest is not a waste of time. It's an investment in well-being."
              </p>
              <Button variant="outline" className="mt-4 bg-white/50 hover:bg-white/80">
                Get Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Help;
