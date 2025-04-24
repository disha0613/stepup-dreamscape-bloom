
import { TaskStatus } from "@/components/TaskCard";

// This is a simple implementation - in a real app, this would use AI
export const generateSubtasks = (mainTask: string, mood: string = "neutral"): string[] => {
  mainTask = mainTask.toLowerCase();
  
  // Study-related tasks
  if (mainTask.includes('study') || mainTask.includes('exam') || mainTask.includes('test')) {
    if (mainTask.includes('gate') || mainTask.includes('exam')) {
      return [
        'Collect study resources and materials',
        'Create a study schedule',
        'Review basic concepts',
        'Solve 5 practice problems',
        'Take a mock test',
        'Review weak areas'
      ];
    } else {
      return [
        'Gather reference materials',
        'Create a study outline',
        'Complete 1 hour of focused study',
        'Take structured notes',
        'Review and summarize materials'
      ];
    }
  }
  
  // Project-related tasks
  if (mainTask.includes('project') || mainTask.includes('build') || mainTask.includes('create')) {
    return [
      'Define project scope and objectives',
      'Research similar projects for inspiration',
      'Create project timeline',
      'Gather necessary resources',
      'Complete first milestone',
      'Review progress and adjust plan'
    ];
  }
  
  // Fitness-related tasks
  if (mainTask.includes('workout') || mainTask.includes('exercise') || mainTask.includes('gym')) {
    return [
      'Plan workout routine',
      'Complete 30-minute cardio session',
      'Do strength training for 20 minutes',
      'Track progress in fitness journal',
      'Research proper nutrition'
    ];
  }
  
  // Generic tasks with mood adjustment
  const baseSubtasks = [
    'Define clear objectives',
    'Break task into smaller steps',
    'Set specific deadlines',
    'Create a checklist',
    'Track progress regularly'
  ];
  
  // Adjust based on mood
  if (mood === 'tired' || mood === 'bad' || mood === 'meh') {
    return [
      'Start with a 5-minute easy task',
      'Take small, manageable steps',
      'Schedule short breaks between work sessions',
      ...baseSubtasks.slice(0, 2)
    ];
  } else if (mood === 'focused' || mood === 'great' || mood === 'good') {
    return [
      'Set ambitious goals for today',
      'Schedule dedicated focus time',
      ...baseSubtasks
    ];
  }
  
  return baseSubtasks;
};

// Calculate a suggested deposit amount based on task difficulty
export const getTaskDifficulty = (task: string): number => {
  const taskLower = task.toLowerCase();
  let baseAmount = 5;
  
  // Factors that might increase difficulty
  if (taskLower.includes('create') || taskLower.includes('build')) baseAmount += 3;
  if (taskLower.includes('research') || taskLower.includes('study')) baseAmount += 2;
  if (taskLower.includes('complete') || taskLower.includes('finish')) baseAmount += 1;
  if (taskLower.includes('review') || taskLower.includes('check')) baseAmount -= 1;
  
  // Estimate by length/complexity of task
  if (task.length > 30) baseAmount += 2;
  if (taskLower.includes('and') || taskLower.includes(',')) baseAmount += 1;
  
  // Random variation to make it more natural
  const variation = Math.floor(Math.random() * 3) - 1;
  
  // Ensure minimum of $2 and maximum of $15
  return Math.max(2, Math.min(15, baseAmount + variation));
};

// Generate an actionable roadmap from a vague goal
export const generateRoadmap = (goal: string) => {
  goal = goal.toLowerCase();
  
  // Basic structure
  const roadmap = {
    title: goal,
    description: `Your journey to ${goal}`,
    milestones: [] as Array<{
      title: string,
      tasks: string[],
      timeframe: string,
      deposit: number
    }>
  };
  
  // Learning a skill
  if (goal.includes('learn') || goal.includes('master') || goal.includes('study')) {
    roadmap.milestones = [
      {
        title: 'Research & Preparation',
        tasks: ['Identify learning resources', 'Set specific learning objectives', 'Create a learning schedule', 'Join relevant communities'],
        timeframe: '1-2 weeks',
        deposit: 20
      },
      {
        title: 'Fundamentals',
        tasks: ['Complete beginner tutorials', 'Practice basic exercises', 'Build simple projects', 'Get feedback on progress'],
        timeframe: '2-4 weeks',
        deposit: 30
      },
      {
        title: 'Advanced Skills',
        tasks: ['Tackle complex concepts', 'Work on challenging projects', 'Seek mentorship', 'Join group activities'],
        timeframe: '1-2 months',
        deposit: 50
      },
      {
        title: 'Mastery & Application',
        tasks: ['Create a portfolio piece', 'Share knowledge with others', 'Apply skills in real scenarios', 'Get professional assessment'],
        timeframe: '2-3 months',
        deposit: 100
      }
    ];
  }
  // Career advancement
  else if (goal.includes('job') || goal.includes('career') || goal.includes('profession')) {
    roadmap.milestones = [
      {
        title: 'Self-Assessment & Market Research',
        tasks: ['Identify strengths and interests', 'Research industry trends', 'Network with professionals', 'Set specific career goals'],
        timeframe: '2-3 weeks',
        deposit: 25
      },
      {
        title: 'Skill Development',
        tasks: ['Identify skill gaps', 'Complete relevant courses', 'Obtain certifications', 'Work on portfolio projects'],
        timeframe: '1-3 months',
        deposit: 40
      },
      {
        title: 'Application & Interview Preparation',
        tasks: ['Update resume and online profiles', 'Apply to target positions', 'Prepare for interviews', 'Follow up on applications'],
        timeframe: '2-4 weeks',
        deposit: 35
      },
      {
        title: 'Growth & Advancement',
        tasks: ['Set 90-day goals in new role', 'Seek feedback and mentorship', 'Identify advancement opportunities', 'Continue professional development'],
        timeframe: '3-6 months',
        deposit: 50
      }
    ];
  }
  // Generic goal structure
  else {
    roadmap.milestones = [
      {
        title: 'Vision & Research',
        tasks: ['Define clear end goal', 'Research requirements and path', 'Create success metrics', 'Identify key resources needed'],
        timeframe: '1-2 weeks',
        deposit: 20
      },
      {
        title: 'Planning & Preparation',
        tasks: ['Break down major steps', 'Create detailed timeline', 'Gather necessary resources', 'Build support system'],
        timeframe: '2-3 weeks',
        deposit: 30
      },
      {
        title: 'Initial Implementation',
        tasks: ['Complete first major step', 'Overcome initial obstacles', 'Track early progress', 'Adjust plan as needed'],
        timeframe: '1 month',
        deposit: 40
      },
      {
        title: 'Sustained Progress',
        tasks: ['Maintain consistent action', 'Overcome plateaus', 'Celebrate milestones', 'Continue refining approach'],
        timeframe: '1-3 months',
        deposit: 60
      }
    ];
  }
  
  return roadmap;
};
