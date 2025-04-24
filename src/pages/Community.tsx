
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";

// Mock user data
const mockUsers = [
  { id: "1", name: "Alex Johnson", streak: 24, avatar: "", achievements: 12 },
  { id: "2", name: "Maria Garcia", streak: 18, avatar: "", achievements: 8 },
  { id: "3", name: "Jayden Smith", streak: 15, avatar: "", achievements: 7 },
  { id: "4", name: "Taylor Lee", streak: 14, avatar: "", achievements: 6 },
  { id: "5", name: "Chris Wong", streak: 12, avatar: "", achievements: 10 },
  { id: "6", name: "Jordan Park", streak: 9, avatar: "", achievements: 5 },
  { id: "7", name: "Riley Cooper", streak: 7, avatar: "", achievements: 4 },
  { id: "8", name: "Sam Martinez", streak: 5, avatar: "", achievements: 3 },
];

// Mock story data
const mockStories = [
  { 
    id: "1", 
    user: "Alex Johnson", 
    title: "How I built a 30-day writing habit", 
    preview: "After failing to write consistently for years, I finally found a system that worked for me...",
    likes: 42
  },
  { 
    id: "2", 
    user: "Taylor Lee", 
    title: "From procrastinator to productivity master", 
    preview: "I used to put everything off until the last minute. Here's how I transformed my habits...",
    likes: 38
  },
  { 
    id: "3", 
    user: "Maria Garcia", 
    title: "My journey to daily meditation", 
    preview: "I never thought I'd be able to meditate daily, but with small steps and consistency...",
    likes: 24
  },
];

// Mock group data
const mockGroups = [
  { 
    id: "1", 
    name: "Study Buddies", 
    description: "Support group for students and lifelong learners",
    members: 524,
    category: "Study"
  },
  { 
    id: "2", 
    name: "Fitness First", 
    description: "Building healthy habits together through daily exercise",
    members: 367,
    category: "Fitness"
  },
  { 
    id: "3", 
    name: "Creative Daily", 
    description: "Daily creative challenges for artists, writers, and makers",
    members: 289,
    category: "Creative"
  },
  { 
    id: "4", 
    name: "Mindfulness Masters", 
    description: "Supporting each other in daily meditation and mindfulness",
    members: 193,
    category: "Wellness"
  },
];

const Community = () => {
  const { toast } = useToast();
  const [leaderboardUsers, setLeaderboardUsers] = useState(mockUsers);
  const [stories, setStories] = useState(mockStories);
  const [groups, setGroups] = useState(mockGroups);
  const [shareText, setShareText] = useState("");
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('');
  };
  
  const handleFollow = (userId: string) => {
    toast({
      title: "User Followed",
      description: "You are now following this user.",
    });
  };
  
  const handleLike = (storyId: string) => {
    setStories(prev => 
      prev.map(story => 
        story.id === storyId 
          ? { ...story, likes: story.likes + 1 } 
          : story
      )
    );
  };
  
  const handleJoinGroup = (groupId: string) => {
    toast({
      title: "Group Joined",
      description: "You have successfully joined this group.",
    });
  };
  
  const handleShareWin = () => {
    if (shareText.trim()) {
      toast({
        title: "Win Shared!",
        description: "Your victory has been shared with the community.",
      });
      setShareText("");
    } else {
      toast({
        variant: "destructive",
        title: "Empty Post",
        description: "Please write something to share.",
      });
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="mb-6">Community</h1>
      
      <Tabs defaultValue="leaderboard">
        <TabsList className="mb-6">
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="stories">Success Stories</TabsTrigger>
          <TabsTrigger value="groups">Support Groups</TabsTrigger>
        </TabsList>
        
        <TabsContent value="leaderboard">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Consistency Champions</CardTitle>
                  <CardDescription>See who's on the longest streaks right now</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {leaderboardUsers.map((user, index) => (
                      <div key={user.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 flex items-center justify-center font-semibold">
                            {index + 1}
                          </div>
                          <Avatar>
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback className="bg-pastel-purple">
                              {getInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs font-normal">
                                {user.streak} day streak
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {user.achievements} achievements
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleFollow(user.id)}
                        >
                          Follow
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Share Your Win</CardTitle>
                  <CardDescription>Let the community celebrate with you</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          ME
                        </AvatarFallback>
                      </Avatar>
                      <p className="font-medium">You</p>
                    </div>
                    <Textarea 
                      placeholder="Share your latest achievement, streak milestone, or goal completion..."
                      value={shareText}
                      onChange={e => setShareText(e.target.value)}
                      rows={4}
                    />
                    <Button onClick={handleShareWin} className="w-full">
                      Share Your Win
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6 bg-pastel-blue/30">
                <CardHeader>
                  <CardTitle>Your Stats</CardTitle>
                  <CardDescription>How you compare to the community</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Your Streak</span>
                      <span className="font-semibold">7 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Community Rank</span>
                      <span className="font-semibold">#43 of 324</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Top 15%</span>
                      <span className="font-semibold">🏆</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="stories">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {stories.map(story => (
                <Card key={story.id}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-pastel-purple">
                          {getInitials(story.user)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{story.title}</CardTitle>
                        <CardDescription>By {story.user}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{story.preview}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Read Full Story</Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleLike(story.id)}
                      className="flex items-center gap-1"
                    >
                      <span>❤️</span> {story.likes}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Submit Your Story</CardTitle>
                  <CardDescription>Share your journey to inspire others</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    Write Your Success Story
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-pastel-purple/20">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Story Guidelines</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Be authentic and honest about your journey</li>
                    <li>• Include challenges you faced and how you overcame them</li>
                    <li>• Share specific strategies that worked for you</li>
                    <li>• Respect privacy and don't share others' stories</li>
                    <li>• Keep it encouraging and supportive</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Story Categories</CardTitle>
                  <CardDescription>Find inspiration for your goals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-pastel-blue/50 text-foreground hover:bg-pastel-blue/80 cursor-pointer">
                      Study Habits
                    </Badge>
                    <Badge className="bg-pastel-green/50 text-foreground hover:bg-pastel-green/80 cursor-pointer">
                      Fitness
                    </Badge>
                    <Badge className="bg-pastel-yellow/50 text-foreground hover:bg-pastel-yellow/80 cursor-pointer">
                      Creative Goals
                    </Badge>
                    <Badge className="bg-pastel-pink/50 text-foreground hover:bg-pastel-pink/80 cursor-pointer">
                      Career Growth
                    </Badge>
                    <Badge className="bg-pastel-orange/50 text-foreground hover:bg-pastel-orange/80 cursor-pointer">
                      Health & Wellness
                    </Badge>
                    <Badge className="bg-pastel-purple/50 text-foreground hover:bg-pastel-purple/80 cursor-pointer">
                      Financial Goals
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="groups">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Find Your Support Group</h2>
                <Input placeholder="Search groups by name or interest..." />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {groups.map(group => (
                  <Card key={group.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{group.name}</CardTitle>
                          <CardDescription>{group.description}</CardDescription>
                        </div>
                        <Badge variant="outline">{group.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm">{group.members} members</p>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        onClick={() => handleJoinGroup(group.id)}
                        className="w-full"
                      >
                        Join Group
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Create a Group</CardTitle>
                  <CardDescription>Start your own support community</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Start New Group</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Your Groups</CardTitle>
                  <CardDescription>Communities you're part of</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Study Buddies</p>
                        <p className="text-sm text-muted-foreground">Member since Apr 15</p>
                      </div>
                      <Badge variant="outline">Study</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Groups
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-gradient-to-br from-pastel-blue to-pastel-purple/50">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold mb-2">Group Benefits</h3>
                  <ul className="text-sm text-left space-y-2">
                    <li>• 80% higher chance of reaching goals</li>
                    <li>• Accountability partners</li>
                    <li>• Learn from others' experiences</li>
                    <li>• Celebrate wins together</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Community;
