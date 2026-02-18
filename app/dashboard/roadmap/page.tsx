'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import DashboardNav from '@/components/dashboard/nav'
import { CheckCircle2, Circle, Lock, BookOpen, Play } from 'lucide-react'
import ProgressCard from '@/components/dashboard/progress-card'
import { InteractiveRoadmap } from '@/components/roadmap/interactive-roadmap'

interface Topic {
  id: string
  name: string
  status: 'completed' | 'in-progress' | 'pending'
  progress: number
  estimatedHours: number
  lessonCount: number
  description?: string
  subtopics?: string[]
  prerequisites?: string[]
  resources?: { title: string; type: string }[]
}

interface Subject {
  name: string
  progress: number
  completedTopics: number
  totalTopics: number
  estimatedDaysRemaining: number
  topics: Topic[]
  topicOrder?: string[]
}

const roadmapData: Subject[] = [
  {
    name: 'Quantitative Aptitude',
    progress: 55,
    completedTopics: 8,
    totalTopics: 15,
    estimatedDaysRemaining: 18,
    topicOrder: ['1', '2', '3', '4', '5', '6'],
    topics: [
      {
        id: '1',
        name: 'Simplification & Approximation',
        status: 'completed',
        progress: 100,
        estimatedHours: 4,
        lessonCount: 3,
        description: 'Master the fundamentals of mathematical simplification and approximation techniques.',
        subtopics: ['BODMAS Rule', 'Fractions & Decimals', 'Surds & Indices', 'Square Roots'],
        prerequisites: [],
        resources: [
          { title: 'Simplification Basics', type: 'Video Tutorial' },
          { title: 'Practice Problems', type: 'Worksheet' }
        ]
      },
      {
        id: '2',
        name: 'Percentage & Ratio',
        status: 'completed',
        progress: 100,
        estimatedHours: 5,
        lessonCount: 4,
        description: 'Learn percentage calculations and ratio comparisons with real-world applications.',
        subtopics: ['Percentage Formula', 'Profit & Loss', 'Discount & Markup', 'Ratio Comparison'],
        prerequisites: ['Simplification & Approximation'],
        resources: [
          { title: 'Percentage Guide', type: 'Notes' },
          { title: 'Ratio Problems', type: 'Practice Set' }
        ]
      },
      {
        id: '3',
        name: 'Time & Work',
        status: 'in-progress',
        progress: 65,
        estimatedHours: 6,
        lessonCount: 4,
        description: 'Understand work-rate problems and time calculations.',
        subtopics: ['Work Rate', 'Pipe & Cistern', 'Combined Work', 'Negative Work'],
        prerequisites: ['Percentage & Ratio'],
        resources: [
          { title: 'Time & Work Explained', type: 'Video' },
          { title: 'Solved Examples', type: 'Notes' }
        ]
      },
      {
        id: '4',
        name: 'Speed, Time & Distance',
        status: 'pending',
        progress: 0,
        estimatedHours: 5,
        lessonCount: 3,
        description: 'Calculate speed, distance, and time with various motion scenarios.',
        subtopics: ['Average Speed', 'Relative Motion', 'Trains', 'Boats & Streams'],
        prerequisites: ['Time & Work'],
        resources: []
      },
      {
        id: '5',
        name: 'Average & Partnership',
        status: 'pending',
        progress: 0,
        estimatedHours: 4,
        lessonCount: 2,
        description: 'Learn average calculations and partnership profit sharing.',
        subtopics: ['Average Formula', 'Weighted Average', 'Partnership Rules', 'Capital & Time'],
        prerequisites: ['Speed, Time & Distance'],
        resources: []
      },
      {
        id: '6',
        name: 'Profit & Loss',
        status: 'pending',
        progress: 0,
        estimatedHours: 5,
        lessonCount: 3,
        description: 'Master profit, loss, and business calculations.',
        subtopics: ['Cost Price & Selling Price', 'Discount', 'Commission', 'Mark-up'],
        prerequisites: ['Percentage & Ratio'],
        resources: []
      },
    ]
  },
  {
    name: 'English Language',
    progress: 72,
    completedTopics: 11,
    totalTopics: 15,
    estimatedDaysRemaining: 12,
    topicOrder: ['7', '8', '9', '10'],
    topics: [
      {
        id: '7',
        name: 'Error Detection',
        status: 'completed',
        progress: 100,
        estimatedHours: 6,
        lessonCount: 5,
        description: 'Identify and correct grammatical errors in sentences.',
        subtopics: ['Subject-Verb Agreement', 'Tense Usage', 'Pronoun Errors', 'Preposition Misuse'],
        prerequisites: [],
        resources: []
      },
      {
        id: '8',
        name: 'Synonyms & Antonyms',
        status: 'completed',
        progress: 100,
        estimatedHours: 4,
        lessonCount: 3,
        description: 'Build vocabulary through similar and opposite words.',
        subtopics: ['Word Meanings', 'Context Usage', 'Synonyms', 'Antonyms'],
        prerequisites: [],
        resources: []
      },
      {
        id: '9',
        name: 'Sentence Improvement',
        status: 'in-progress',
        progress: 80,
        estimatedHours: 5,
        lessonCount: 4,
        description: 'Improve sentence structure and clarity.',
        subtopics: ['Active-Passive Voice', 'Sentence Rearrangement', 'Coherence', 'Consistency'],
        prerequisites: ['Error Detection'],
        resources: []
      },
      {
        id: '10',
        name: 'Reading Comprehension',
        status: 'pending',
        progress: 0,
        estimatedHours: 8,
        lessonCount: 6,
        description: 'Develop skills to understand and analyze passages.',
        subtopics: ['Main Idea', 'Inference', 'Vocabulary in Context', 'Detail Questions'],
        prerequisites: ['Sentence Improvement'],
        resources: []
      },
    ]
  },
  {
    name: 'Reasoning & Logic',
    progress: 38,
    completedTopics: 4,
    totalTopics: 10,
    estimatedDaysRemaining: 22,
    topicOrder: ['11', '12', '13', '14'],
    topics: [
      {
        id: '11',
        name: 'Analogy & Classification',
        status: 'completed',
        progress: 100,
        estimatedHours: 5,
        lessonCount: 4,
        description: 'Understand relationships and categorize items.',
        subtopics: ['Analogical Reasoning', 'Classification Types', 'Logical Relationships'],
        prerequisites: [],
        resources: []
      },
      {
        id: '12',
        name: 'Coding-Decoding',
        status: 'in-progress',
        progress: 50,
        estimatedHours: 6,
        lessonCount: 4,
        description: 'Crack patterns in coded messages.',
        subtopics: ['Letter Coding', 'Number Coding', 'Symbol Coding', 'Mixed Coding'],
        prerequisites: ['Analogy & Classification'],
        resources: []
      },
      {
        id: '13',
        name: 'Syllogism',
        status: 'pending',
        progress: 0,
        estimatedHours: 7,
        lessonCount: 5,
        description: 'Understand logical deduction and statement analysis.',
        subtopics: ['Statement Analysis', 'Venn Diagrams', 'Conclusions', 'Assumptions'],
        prerequisites: ['Coding-Decoding'],
        resources: []
      },
      {
        id: '14',
        name: 'Series & Sequence',
        status: 'pending',
        progress: 0,
        estimatedHours: 5,
        lessonCount: 3,
        description: 'Identify patterns and complete sequences.',
        subtopics: ['Number Series', 'Letter Series', 'Alphanumeric Series', 'Missing Terms'],
        prerequisites: ['Syllogism'],
        resources: []
      },
    ]
  },
  {
    name: 'General Awareness',
    progress: 65,
    completedTopics: 8,
    totalTopics: 12,
    estimatedDaysRemaining: 15,
    topicOrder: ['15', '16', '17', '18'],
    topics: [
      {
        id: '15',
        name: 'History & Culture',
        status: 'completed',
        progress: 100,
        estimatedHours: 10,
        lessonCount: 8,
        description: 'Study Indian history, culture, and heritage.',
        subtopics: ['Ancient India', 'Medieval Period', 'Modern History', 'Cultural Heritage'],
        prerequisites: [],
        resources: []
      },
      {
        id: '16',
        name: 'Geography & Physical Features',
        status: 'in-progress',
        progress: 75,
        estimatedHours: 8,
        lessonCount: 6,
        description: 'Learn about Indian geography and natural features.',
        subtopics: ['Landforms', 'Rivers & Lakes', 'Climate Zones', 'Vegetation'],
        prerequisites: ['History & Culture'],
        resources: []
      },
      {
        id: '17',
        name: 'Current Affairs 2024',
        status: 'pending',
        progress: 0,
        estimatedHours: 12,
        lessonCount: 10,
        description: 'Stay updated with current events and news.',
        subtopics: ['National News', 'International News', 'Sports', 'Science & Tech'],
        prerequisites: ['Geography & Physical Features'],
        resources: []
      },
      {
        id: '18',
        name: 'Science & Technology',
        status: 'pending',
        progress: 0,
        estimatedHours: 8,
        lessonCount: 6,
        description: 'Understand scientific concepts and technological advancements.',
        subtopics: ['Physics Basics', 'Chemistry Concepts', 'Biology', 'Tech Trends'],
        prerequisites: ['Current Affairs 2024'],
        resources: []
      },
    ]
  }
]

export default function RoadmapPage() {
  const [expandedSubject, setExpandedSubject] = useState<string | null>(roadmapData[0].name)
  const user = { name: 'Rahul Kumar', email: 'rahul@example.com', exam: 'SSC CGL', joinedDate: 'Jan 15, 2024' }

  // Calculate overall progress
  const totalProgress = Math.round(
    roadmapData.reduce((sum, subject) => sum + subject.progress, 0) / roadmapData.length
  )
  const completedTopics = roadmapData.reduce((sum, subject) => sum + subject.completedTopics, 0)
  const totalTopics = roadmapData.reduce((sum, subject) => sum + subject.totalTopics, 0)
  const totalDaysRemaining = Math.max(...roadmapData.map(s => s.estimatedDaysRemaining))

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav user={user} />

      <main className="p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Study Roadmap - SSC CGL</h1>
            <p className="text-muted-foreground">Your personalized preparation plan with milestones and progress tracking</p>
          </div>

          {/* Overall Progress */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Overall Progress</h2>
            
            <div className="grid sm:grid-cols-4 gap-6 mb-8">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Completion</p>
                <div className="relative h-32 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-3xl font-bold">{totalProgress}%</p>
                      <p className="text-xs text-muted-foreground">Complete</p>
                    </div>
                  </div>
                  <div className="w-24 h-24 rounded-full border-4 border-border" style={{
                    background: `conic-gradient(var(--color-primary) ${totalProgress * 3.6}deg, var(--color-border) 0deg)`
                  }} />
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <p className="text-sm text-muted-foreground mb-1">Topics Completed</p>
                <p className="text-3xl font-bold">{completedTopics}/{totalTopics}</p>
                <p className="text-xs text-muted-foreground mt-1">subjects in progress</p>
              </div>

              <div className="flex flex-col justify-center">
                <p className="text-sm text-muted-foreground mb-1">Estimated Time</p>
                <p className="text-3xl font-bold">{totalDaysRemaining}</p>
                <p className="text-xs text-muted-foreground mt-1">days remaining</p>
              </div>

              <div className="flex flex-col justify-center">
                <p className="text-sm text-muted-foreground mb-1">Daily Goal</p>
                <p className="text-3xl font-bold">3h</p>
                <p className="text-xs text-muted-foreground mt-1">study hours</p>
              </div>
            </div>

            {/* Overall Progress Bar */}
            <div className="w-full bg-muted rounded-full h-3">
              <div 
                className="bg-primary rounded-full h-3 transition-all duration-300"
                style={{ width: `${totalProgress}%` }}
              />
            </div>
          </Card>

          {/* Subject Roadmaps */}
          <div className="space-y-8">
            {roadmapData.map((subject) => (
              <Card key={subject.name} className="overflow-hidden">
                <div className="p-6 border-b border-border">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{subject.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{subject.completedTopics}/{subject.totalTopics} topics completed</span>
                        <span>•</span>
                        <span>{subject.estimatedDaysRemaining} days to complete</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-primary">{subject.progress}%</p>
                    </div>
                  </div>
                  
                  <div className="w-full bg-muted rounded-full h-3">
                    <div 
                      className="bg-primary rounded-full h-3 transition-all duration-300"
                      style={{ width: `${subject.progress}%` }}
                    />
                  </div>
                </div>

                {/* Interactive Roadmap */}
                <div className="p-6">
                  <InteractiveRoadmap 
                    roadmapData={{
                      subject: subject.name,
                      topics: subject.topics,
                      topicOrder: subject.topicOrder || subject.topics.map(t => t.id)
                    }}
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
