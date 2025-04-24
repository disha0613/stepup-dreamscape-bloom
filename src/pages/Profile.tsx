
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import VirtualCompanion from "@/components/VirtualCompanion";

const Profile = () => {
  const { toast } = useToast();
  
  // User profile state
  const [name, setName] = useState("Sarah Johnson");
  const [email, setEmail] = useState("sarah.j@example.com");
  
  // Companion settings state
  const [companionType, setCompanionType] = useState<"cat" | "dog" | "plant" | "robot">("cat");
  
  // Notification settings state
  const [notifications, setNotifications] = useState({
    email: true,
    taskReminders: true,
    streakAlerts: true,
    achievements: true,
  });

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile changes have been saved.",
    });
  };
  
  const handleCompanionChange = (type: "cat" | "dog" | "plant" | "robot") => {
    setCompanionType(type);
    toast({
      title: "Companion Changed",
      description: `Your companion is now a ${type}!`,
    });
  };
  
  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="animate-fade-in">
      <h1 className="mb-6">Profile & Settings</h1>
      
      <Tabs defaultValue="profile">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="companion">Companion</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your account details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input 
                          id="name" 
                          value={name} 
                          onChange={e => setName(e.target.value)} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={email} 
                          onChange={e => setEmail(e.target.value)} 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <select 
                        id="timezone" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="America/New_York">Eastern Time (ET)</option>
                        <option value="America/Chicago">Central Time (CT)</option>
                        <option value="America/Denver">Mountain Time (MT)</option>
                        <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      </select>
                    </div>
                    
                    <Button onClick={handleSaveProfile}>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Account Security</CardTitle>
                  <CardDescription>Manage your password and security settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                    
                    <Button>Update Password</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Profile Summary</CardTitle>
                  <CardDescription>Your StepUp stats</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center mb-4">
                    <div className="w-20 h-20 rounded-full bg-primary-purple mb-3 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">
                        {name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold">{name}</h3>
                    <p className="text-sm text-muted-foreground">{email}</p>
                  </div>
                  
                  <div className="space-y-3 border-t pt-4">
                    <div className="flex justify-between">
                      <span className="text-sm">Member Since</span>
                      <span>April 2023</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Current Streak</span>
                      <span>7 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Longest Streak</span>
                      <span>14 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Total Tasks Completed</span>
                      <span>28</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Goals Achieved</span>
                      <span>2</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="companion">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Virtual Companion</CardTitle>
                  <CardDescription>Choose and customize your virtual companion</CardDescription>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-semibold mb-4">Choose Your Companion</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <Button
                      variant={companionType === "cat" ? "default" : "outline"}
                      className="h-auto flex flex-col py-6"
                      onClick={() => handleCompanionChange("cat")}
                    >
                      <span className="text-3xl mb-2">🐱</span>
                      <span>Cat</span>
                    </Button>
                    <Button
                      variant={companionType === "dog" ? "default" : "outline"}
                      className="h-auto flex flex-col py-6"
                      onClick={() => handleCompanionChange("dog")}
                    >
                      <span className="text-3xl mb-2">🐶</span>
                      <span>Dog</span>
                    </Button>
                    <Button
                      variant={companionType === "plant" ? "default" : "outline"}
                      className="h-auto flex flex-col py-6"
                      onClick={() => handleCompanionChange("plant")}
                    >
                      <span className="text-3xl mb-2">🌱</span>
                      <span>Plant</span>
                    </Button>
                    <Button
                      variant={companionType === "robot" ? "default" : "outline"}
                      className="h-auto flex flex-col py-6"
                      onClick={() => handleCompanionChange("robot")}
                    >
                      <span className="text-3xl mb-2">🤖</span>
                      <span>Robot</span>
                    </Button>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-4">Companion Behavior</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="companion-chat">Chatty Companion</Label>
                      <Switch id="companion-chat" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="companion-encouragement">Extra Encouragement</Label>
                      <Switch id="companion-encouragement" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="companion-personality">Sassy Personality</Label>
                      <Switch id="companion-personality" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Companion Preview</CardTitle>
                  <CardDescription>See how your companion looks</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center py-6">
                  <VirtualCompanion 
                    streak={7}
                    tasksCompleted={23}
                    mood="happy"
                    type={companionType}
                  />
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Companion Levels</CardTitle>
                  <CardDescription>How your companion grows with you</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <div className="bg-pastel-blue h-8 w-8 rounded-full flex items-center justify-center mr-3">
                        <span className="font-semibold">1</span>
                      </div>
                      <span>Just starting out</span>
                    </li>
                    <li className="flex items-center">
                      <div className="bg-pastel-green h-8 w-8 rounded-full flex items-center justify-center mr-3">
                        <span className="font-semibold">2</span>
                      </div>
                      <span>3+ day streak</span>
                    </li>
                    <li className="flex items-center">
                      <div className="bg-pastel-yellow h-8 w-8 rounded-full flex items-center justify-center mr-3">
                        <span className="font-semibold">3</span>
                      </div>
                      <span>7+ day streak</span>
                    </li>
                    <li className="flex items-center">
                      <div className="bg-pastel-orange h-8 w-8 rounded-full flex items-center justify-center mr-3">
                        <span className="font-semibold">4</span>
                      </div>
                      <span>14+ day streak</span>
                    </li>
                    <li className="flex items-center">
                      <div className="bg-pastel-purple h-8 w-8 rounded-full flex items-center justify-center mr-3">
                        <span className="font-semibold">5</span>
                      </div>
                      <span>30+ day streak</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how StepUp communicates with you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Email Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-notifs" className="text-base">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive important updates via email</p>
                      </div>
                      <Switch 
                        id="email-notifs" 
                        checked={notifications.email}
                        onCheckedChange={() => handleNotificationChange('email')}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Task & Goal Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="task-reminders" className="text-base">Task Reminders</Label>
                        <p className="text-sm text-muted-foreground">Get reminded about upcoming tasks</p>
                      </div>
                      <Switch 
                        id="task-reminders" 
                        checked={notifications.taskReminders}
                        onCheckedChange={() => handleNotificationChange('taskReminders')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="streak-alerts" className="text-base">Streak Alerts</Label>
                        <p className="text-sm text-muted-foreground">Be notified about your streak status</p>
                      </div>
                      <Switch 
                        id="streak-alerts" 
                        checked={notifications.streakAlerts}
                        onCheckedChange={() => handleNotificationChange('streakAlerts')}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Other Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="achievements" className="text-base">Achievement Notifications</Label>
                        <p className="text-sm text-muted-foreground">Get notified when you earn achievements</p>
                      </div>
                      <Switch 
                        id="achievements" 
                        checked={notifications.achievements}
                        onCheckedChange={() => handleNotificationChange('achievements')}
                      />
                    </div>
                  </div>
                </div>
                
                <Button>Save Notification Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
