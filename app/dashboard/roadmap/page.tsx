'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import DashboardNav from '@/components/dashboard/nav'
import { CheckCircle2, Circle, Lock, BookOpen, Play } from 'lucide-react'
import ProgressCard from '@/components/dashboard/progress-card'

interface Topic {
  id: string
  name: string
  status: 'completed' | 'in-progress' | 'pending'
  progress: number
  estimatedHours: number
  lessonCount: number
}

interface Subject {
  name: string
  progress: number
  completedTopics: number
  totalTopics: number
  estimatedDaysRemaining: number
  topics: Topic[]
}

const roadmapData: Subject[] = [
  {
    name: 'Quantitative Aptitude',
    progress: 55,
    completedTopics: 8,
    totalTopics: 15,
    estimatedDaysRemaining: 18,
    topics: [
      { id: '1', name: 'Simplification & Approximation', status: 'completed', progress: 100, estimatedHours: 4, lessonCount: 3 },
      { id: '2', name: 'Percentage & Ratio', status: 'completed', progress: 100, estimatedHours: 5, lessonCount: 4 },
      { id: '3', name: 'Time & Work', status: 'in-progress', progress: 65, estimatedHours: 6, lessonCount: 4 },
      { id: '4', name: 'Speed, Time & Distance', status: 'pending', progress: 0, estimatedHours: 5, lessonCount: 3 },
      { id: '5', name: 'Average & Partnership', status: 'pending', progress: 0, estimatedHours: 4, lessonCount: 2 },
      { id: '6', name: 'Profit & Loss', status: 'pending', progress: 0, estimatedHours: 5, lessonCount: 3 },
    ]
  },
  {
    name: 'English Language',
    progress: 72,
    completedTopics: 11,
    totalTopics: 15,
    estimatedDaysRemaining: 12,
    topics: [
      { id: '7', name: 'Error Detection', status: 'completed', progress: 100, estimatedHours: 6, lessonCount: 5 },
      { id: '8', name: 'Synonyms & Antonyms', status: 'completed', progress: 100, estimatedHours: 4, lessonCount: 3 },
      { id: '9', name: 'Sentence Improvement', status: 'in-progress', progress: 80, estimatedHours: 5, lessonCount: 4 },
      { id: '10', name: 'Reading Comprehension', status: 'pending', progress: 0, estimatedHours: 8, lessonCount: 6 },
    ]
  },
  {
    name: 'Reasoning & Logic',
    progress: 38,
    completedTopics: 4,
    totalTopics: 10,
    estimatedDaysRemaining: 22,
    topics: [
      { id: '11', name: 'Analogy & Classification', status: 'completed', progress: 100, estimatedHours: 5, lessonCount: 4 },
      { id: '12', name: 'Coding-Decoding', status: 'in-progress', progress: 50, estimatedHours: 6, lessonCount: 4 },
      { id: '13', name: 'Syllogism', status: 'pending', progress: 0, estimatedHours: 7, lessonCount: 5 },
      { id: '14', name: 'Series & Sequence', status: 'pending', progress: 0, estimatedHours: 5, lessonCount: 3 },
    ]
  },
  {
    name: 'General Awareness',
    progress: 65,
    completedTopics: 8,
    totalTopics: 12,
    estimatedDaysRemaining: 15,
    topics: [
      { id: '15', name: 'History & Culture', status: 'completed', progress: 100, estimatedHours: 10, lessonCount: 8 },
      { id: '16', name: 'Geography & Physical Features', status: 'in-progress', progress: 75, estimatedHours: 8, lessonCount: 6 },
      { id: '17', name: 'Current Affairs 2024', status: 'pending', progress: 0, estimatedHours: 12, lessonCount: 10 },
      { id: '18', name: 'Science & Technology', status: 'pending', progress: 0, estimatedHours: 8, lessonCount: 6 },
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
          <div className="space-y-4">
            {roadmapData.map((subject) => (
              <Card key={subject.name} className="overflow-hidden">
                <button
                  onClick={() => setExpandedSubject(expandedSubject === subject.name ? null : subject.name)}
                  className="w-full p-6 hover:bg-muted/50 transition-colors text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2">{subject.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{subject.completedTopics}/{subject.totalTopics} topics completed</span>
                        <span>•</span>
                        <span>{subject.estimatedDaysRemaining} days to complete</span>
                      </div>
                    </div>
                    <div className="text-right mr-4">
                      <p className="text-2xl font-bold text-primary">{subject.progress}%</p>
                    </div>
                  </div>
                  
                  <div className="w-full bg-muted rounded-full h-2 mt-4">
                    <div 
                      className="bg-primary rounded-full h-2 transition-all duration-300"
                      style={{ width: `${subject.progress}%` }}
                    />
                  </div>
                </button>

                {/* Topics List */}
                {expandedSubject === subject.name && (
                  <div className="border-t border-border p-6 space-y-4">
                    {subject.topics.map((topic) => (
                      <div key={topic.id} className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
                        <div className="flex items-start gap-4">
                          <div className="pt-1">
                            {topic.status === 'completed' && (
                              <CheckCircle2 className="w-6 h-6 text-green-600" />
                            )}
                            {topic.status === 'in-progress' && (
                              <Circle className="w-6 h-6 text-yellow-600 fill-yellow-100" />
                            )}
                            {topic.status === 'pending' && (
                              <Circle className="w-6 h-6 text-muted-foreground" />
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold">{topic.name}</h4>
                              {topic.status === 'completed' && (
                                <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded">
                                  Completed
                                </span>
                              )}
                              {topic.status === 'in-progress' && (
                                <span className="text-xs bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200 px-2 py-1 rounded">
                                  In Progress
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                              <span>{topic.lessonCount} lessons</span>
                              <span>•</span>
                              <span>{topic.estimatedHours} estimated hours</span>
                            </div>

                            {topic.status !== 'completed' && (
                              <>
                                <div className="w-full bg-muted rounded-full h-2 mb-3">
                                  <div 
                                    className="bg-primary rounded-full h-2"
                                    style={{ width: `${topic.progress}%` }}
                                  />
                                </div>
                              </>
                            )}

                            <div className="flex gap-2">
                              <Button size="sm" variant={topic.status === 'pending' ? 'outline' : 'default'}>
                                <Play className="w-4 h-4 mr-2" />
                                {topic.status === 'completed' ? 'Review' : 'Continue'}
                              </Button>
                              {topic.status !== 'completed' && (
                                <Button size="sm" variant="outline">
                                  Practice
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
