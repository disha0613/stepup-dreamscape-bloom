
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Mock user data
const mockUsers = [
  {
    id: 1,
    name: "Alex Chen",
    avatar: "https://i.pravatar.cc/150?img=1",
    streak: 42,
    points: 1250,
    goals: ["Fitness", "Coding", "Language"]
  },
  {
    id: 2,
    name: "Jamie Singh",
    avatar: "https://i.pravatar.cc/150?img=2",
    streak: 21,
    points: 890,
    goals: ["Reading", "Meditation"]
  },
  {
    id: 3,
    name: "Taylor Kim",
    avatar: "https://i.pravatar.cc/150?img=3",
    streak: 65,
    points: 1820,
    goals: ["Fitness", "Art", "Study"]
  },
  {
    id: 4,
    name: "Jordan Lee",
    avatar: "https://i.pravatar.cc/150?img=4",
    streak: 14,
    points: 650,
    goals: ["Music", "Study"]
  },
  {
    id: 5,
    name: "Casey Morgan",
    avatar: "https://i.pravatar.cc/150?img=5",
    streak: 30,
    points: 1100,
    goals: ["Coding", "Language"]
  }
];

// Mock posts
const mockPosts = [
  {
    id: 1,
    author: "Alex Chen",
    avatar: "https://i.pravatar.cc/150?img=1",
    content: "Just completed a 30-day coding challenge! Remember consistency is more important than intensity. Small steps every day add up to big results!",
    likes: 24,
    comments: 5,
    time: "2 hours ago",
    category: "wins"
  },
  {
    id: 2,
    author: "Jamie Singh",
    avatar: "https://i.pravatar.cc/150?img=2",
    content: "Anyone else struggling with staying motivated for language learning? I keep missing my daily practice sessions. Any tips?",
    likes: 18,
    comments: 12,
    time: "5 hours ago",
    category: "help"
  },
  {
    id: 3,
    author: "Taylor Kim",
    avatar: "https://i.pravatar.cc/150?img=3",
    content: "Found a great technique for beating procrastination! The 5-minute rule: just commit to doing something for 5 minutes, and often you'll find yourself continuing beyond that time. Works especially well for my art practice!",
    likes: 45,
    comments: 8,
    time: "1 day ago",
    category: "tips"
  }
];

// Mock groups
const mockGroups = [
  {
    id: 1,
    name: "Coding Consistency Club",
    members: 128,
    description: "Daily coding challenges and support for programmers of all levels."
  },
  {
    id: 2,
    name: "Fitness Fundamentals",
    members: 95,
    description: "Building healthy exercise habits together, one day at a time."
  },
  {
    id: 3,
    name: "Creative Consistency",
    members: 76,
    description: "For artists, writers, and creators looking to practice consistently."
  },
  {
    id: 4,
    name: "Study Squad",
    members: 112,
    description: "Students supporting each other through academic goals."
  }
];

const Community = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("leaderboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [newPost, setNewPost] = useState("");
  
  const handleJoinGroup = (groupName: string) => {
    toast({
      title: "Group joined!",
      description: `You've joined ${groupName}. Connect with like-minded people!`,
    });
  };
  
  const handleFollow = (userName: string) => {
    toast({
      title: `Following ${userName}`,
      description: "You'll see their updates in your feed.",
    });
  };
  
  const handleLike = (postId: number) => {
    toast({
      title: "Post liked!",
      description: "The author has been notified.",
    });
  };
  
  const handlePostSubmit = () => {
    if (!newPost.trim()) {
      toast({
        title: "Empty post",
        description: "Please write something before posting.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Post published!",
      description: "Your post has been shared with the community.",
    });
    
    setNewPost("");
  };

  return (
    <div className="animate-fade-in">
      <h1 className="mb-6">Community</h1>
      
      <Tabs defaultValue="leaderboard" onValueChange={setActiveTab}>
        <TabsList className="mb-6 grid grid-cols-4 bg-muted">
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="feed">Community Feed</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
          <TabsTrigger value="stories">Success Stories</TabsTrigger>
        </TabsList>
        
        <TabsContent value="leaderboard">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Consistency Leaderboard</CardTitle>
                  <CardDescription>Top users based on streaks and points</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockUsers.sort((a, b) => b.streak - a.streak).map((user, index) => (
                      <div key={user.id} className="flex items-center justify-between border-b last:border-0 pb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-lg w-6">{index + 1}</span>
                          <Avatar>
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <div className="flex gap-2 flex-wrap">
                              {user.goals.map((goal) => (
                                <Badge key={goal} variant="outline" className="text-xs">
                                  {goal}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Streak</p>
                            <p className="font-bold">{user.streak} days</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Points</p>
                            <p className="font-bold">{user.points}</p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleFollow(user.name)}
                          >
                            Follow
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t">
                  <p className="text-center text-xs text-muted-foreground w-full py-2">
                    Leaderboard updates daily • Last updated 2 hours ago
                  </p>
                </CardFooter>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Your Stats</CardTitle>
                  <CardDescription>How you rank in the community</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div className="bg-pastel-green p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Current Rank</p>
                    <p className="text-2xl font-bold">#18</p>
                  </div>
                  <div className="bg-pastel-blue p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Points</p>
                    <p className="text-2xl font-bold">540</p>
                  </div>
                  <div className="bg-pastel-yellow p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Current Streak</p>
                    <p className="text-2xl font-bold">7 days</p>
                  </div>
                  <Button className="w-full">
                    View Your Profile
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="feed">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Share with the Community</CardTitle>
                  <CardDescription>
                    Post a win, ask for advice, or share a helpful tip
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea 
                    placeholder="What's on your mind?" 
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="mb-4"
                  />
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <Badge variant="outline" className="cursor-pointer">Win</Badge>
                      <Badge variant="outline" className="cursor-pointer">Help</Badge>
                      <Badge variant="outline" className="cursor-pointer">Tip</Badge>
                    </div>
                    <Button onClick={handlePostSubmit}>
                      Post to Community
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {mockPosts.map((post) => (
                <Card key={post.id} className="mb-6">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={post.avatar} alt={post.author} />
                          <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{post.author}</p>
                          <p className="text-xs text-muted-foreground">{post.time}</p>
                        </div>
                      </div>
                      <Badge>{post.category === "wins" ? "Success Story" : post.category === "help" ? "Needs Help" : "Helpful Tip"}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{post.content}</p>
                  </CardContent>
                  <CardFooter className="border-t flex justify-between">
                    <Button variant="ghost" size="sm" onClick={() => handleLike(post.id)}>
                      ❤️ {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm">
                      💬 {post.comments} Comments
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Community Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>💪 Be supportive and kind to each other</li>
                    <li>🔍 Share specific challenges and wins</li>
                    <li>🌱 Focus on growth and consistency</li>
                    <li>🤝 Offer help when you can</li>
                    <li>👋 Introduce yourself when joining groups</li>
                  </ul>
                </CardContent>
                <CardFooter className="border-t">
                  <Button variant="outline" className="w-full">
                    Report Content
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="groups">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockGroups.map((group) => (
              <Card key={group.id}>
                <CardHeader>
                  <CardTitle>{group.name}</CardTitle>
                  <CardDescription>{group.members} members</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{group.description}</p>
                </CardContent>
                <CardFooter className="border-t">
                  <Button 
                    className="w-full" 
                    onClick={() => handleJoinGroup(group.name)}
                  >
                    Join Group
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Community;
