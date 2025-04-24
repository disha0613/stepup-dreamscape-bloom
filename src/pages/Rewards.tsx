import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowUp, ArrowDown, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Rewards = () => {
  const { toast } = useToast();
  const [balance, setBalance] = useState(125.50);
  const [earned, setEarned] = useState(175.50);
  const [deducted, setDeducted] = useState(50);
  const [transactions, setTransactions] = useState([
    { date: "2023-04-23", type: "earn", amount: 15, description: "Completed 'Study for Math Exam'" },
    { date: "2023-04-22", type: "deduct", amount: 5, description: "Missed 'Daily Language Practice'" },
    { date: "2023-04-20", type: "earn", amount: 20, description: "Completed 'Finish Project Proposal'" },
    { date: "2023-04-18", type: "earn", amount: 10, description: "Completed 'Read Chapter 5'" },
    { date: "2023-04-15", type: "deduct", amount: 15, description: "Missed 'Weekly Exercise Goal'" },
  ]);
  
  const completionRate = Math.round((earned / (earned + deducted)) * 100);
  
  const handleCashOut = () => {
    toast({
      title: "Cash Out Successful!",
      description: `$${balance.toFixed(2)} has been sent to your account.`,
    });
    setBalance(0);
    setTransactions([
      { 
        date: new Date().toISOString().split('T')[0], 
        type: "cashout", 
        amount: balance, 
        description: "Cash Out to Personal Account" 
      },
      ...transactions
    ]);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };
  
  return (
    <div className="animate-fade-in">
      <h1 className="mb-6">Rewards & Penalties</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-pastel-green">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-1">Current Balance</h3>
                <p className="text-3xl font-bold">${balance.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Available to cash out
                </p>
              </CardContent>
            </Card>
            <Card className="bg-pastel-blue">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-1">Total Earned</h3>
                <p className="text-3xl font-bold text-green-600">${earned.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  From completed tasks
                </p>
              </CardContent>
            </Card>
            <Card className="bg-pastel-pink">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-1">Total Deducted</h3>
                <p className="text-3xl font-bold text-red-500">${deducted.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  From missed deadlines
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Success Rate</CardTitle>
              <CardDescription>Your completion record</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Completion rate: {completionRate}%</span>
                    <span className="text-sm font-medium">${earned.toFixed(2)} / ${(earned + deducted).toFixed(2)}</span>
                  </div>
                  <Progress value={completionRate} className="h-3" />
                </div>
                
                <div className="bg-pastel-purple/20 rounded-lg p-4">
                  {completionRate >= 80 && (
                    <p className="font-medium text-green-600">Outstanding! Your high completion rate shows incredible discipline!</p>
                  )}
                  {completionRate >= 60 && completionRate < 80 && (
                    <p className="font-medium text-amber-600">Good progress! Keep pushing to meet more of your goals.</p>
                  )}
                  {completionRate < 60 && (
                    <p className="font-medium text-red-500">You're making progress, but try breaking your tasks into smaller steps!</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your recent rewards and penalties</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {transactions.map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                    <div className="flex items-center gap-3">
                      <div className={`
                        h-8 w-8 rounded-full flex items-center justify-center
                        ${transaction.type === 'earn' ? 'bg-green-100' : 
                          transaction.type === 'deduct' ? 'bg-red-100' : 'bg-blue-100'}
                      `}>
                        {transaction.type === 'earn' && <ArrowUp className="h-4 w-4 text-green-600" />}
                        {transaction.type === 'deduct' && <ArrowDown className="h-4 w-4 text-red-600" />}
                        {transaction.type === 'cashout' && <Check className="h-4 w-4 text-blue-600" />}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(transaction.date)}</p>
                      </div>
                    </div>
                    <div className={`font-semibold ${
                      transaction.type === 'earn' ? 'text-green-600' : 
                      transaction.type === 'deduct' ? 'text-red-600' : 'text-blue-600'
                    }`}>
                      {transaction.type === 'earn' && `+$${transaction.amount.toFixed(2)}`}
                      {transaction.type === 'deduct' && `-$${transaction.amount.toFixed(2)}`}
                      {transaction.type === 'cashout' && `-$${transaction.amount.toFixed(2)}`}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cash Out</CardTitle>
              <CardDescription>Withdraw your earned balance</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6">
                <p className="text-3xl font-bold mb-1">${balance.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Available balance</p>
              </div>
              
              <Button 
                onClick={handleCashOut} 
                className="w-full"
                disabled={balance <= 0}
              >
                Cash Out Now
              </Button>
              
              <p className="text-xs text-muted-foreground mt-4">
                Cash out will process within 24-48 hours to your linked account.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Rewards History</CardTitle>
              <CardDescription>Your StepUp statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total Goals</span>
                  <span className="font-semibold">4</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Completed Goals</span>
                  <span className="font-semibold">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total Tasks</span>
                  <span className="font-semibold">34</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Completed Tasks</span>
                  <span className="font-semibold">28</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Missed Tasks</span>
                  <span className="font-semibold">6</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Lifetime Earned</span>
                  <span className="font-semibold text-green-600">${(earned + balance).toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-primary-purple to-light-purple text-white">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Motivational Quote</h3>
              <p className="italic">
                "Success is not final, failure is not fatal: it is the courage to continue that counts."
              </p>
              <p className="mt-2 font-semibold">— Winston Churchill</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
