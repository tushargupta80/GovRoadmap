'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import DashboardNav from '@/components/dashboard/nav'
import { Clock, Users, BarChart3, Play, Lock } from 'lucide-react'

interface MockTest {
  id: string
  name: string
  category: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  duration: number
  questions: number
  attempts: number
  avgScore?: number
  completed: boolean
  premium: boolean
}

const mockTests: MockTest[] = [
  {
    id: '1',
    name: 'Full Mock Test - SSC CGL 2024',
    category: 'Full Length',
    difficulty: 'Hard',
    duration: 180,
    questions: 200,
    attempts: 2,
    avgScore: 78,
    completed: true,
    premium: false
  },
  {
    id: '2',
    name: 'Quantitative Aptitude - Basics',
    category: 'Topic-wise',
    difficulty: 'Easy',
    duration: 45,
    questions: 30,
    attempts: 0,
    completed: false,
    premium: false
  },
  {
    id: '3',
    name: 'English Language - Advanced',
    category: 'Topic-wise',
    difficulty: 'Hard',
    duration: 60,
    questions: 40,
    attempts: 0,
    completed: false,
    premium: true
  },
  {
    id: '4',
    name: 'Reasoning - Analogy & Classification',
    category: 'Topic-wise',
    difficulty: 'Medium',
    duration: 50,
    questions: 35,
    attempts: 1,
    avgScore: 68,
    completed: true,
    premium: false
  },
  {
    id: '5',
    name: 'General Awareness - Current Affairs',
    category: 'Topic-wise',
    difficulty: 'Medium',
    duration: 40,
    questions: 25,
    attempts: 0,
    completed: false,
    premium: false
  },
  {
    id: '6',
    name: 'Full Mock Test - Advanced Level',
    category: 'Full Length',
    difficulty: 'Hard',
    duration: 180,
    questions: 200,
    attempts: 0,
    completed: false,
    premium: true
  }
]

export default function TestsPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'completed' | 'pending'>('all')
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'full' | 'topic'>('all')

  const filteredTests = mockTests.filter(test => {
    if (activeFilter === 'completed' && !test.completed) return false
    if (activeFilter === 'pending' && test.completed) return false
    if (selectedCategory === 'full' && test.category !== 'Full Length') return false
    if (selectedCategory === 'topic' && test.category !== 'Topic-wise') return false
    return true
  })

  const user = { name: 'Rahul Kumar', email: 'rahul@example.com', exam: 'SSC CGL', joinedDate: 'Jan 15, 2024' }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav user={user} />

      <main className="p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Mock Tests</h1>
            <p className="text-muted-foreground">Practice with realistic exams and track your progress</p>
          </div>

          {/* Filters */}
          <div className="mb-8 space-y-4">
            <div>
              <p className="text-sm font-semibold mb-3">Test Status</p>
              <div className="flex gap-2 flex-wrap">
                {(['all', 'completed', 'pending'] as const).map(filter => (
                  <Button
                    key={filter}
                    variant={activeFilter === filter ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold mb-3">Test Type</p>
              <div className="flex gap-2 flex-wrap">
                {(['all', 'full', 'topic'] as const).map(cat => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat === 'all' ? 'All Tests' : cat === 'full' ? 'Full Length' : 'Topic-wise'}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Tests Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map(test => (
              <Card key={test.id} className="p-6 hover:shadow-lg transition-shadow flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">{test.name}</h3>
                    <p className="text-xs text-muted-foreground">{test.category}</p>
                  </div>
                  {test.premium && <Lock className="w-4 h-4 text-yellow-600 flex-shrink-0" />}
                </div>

                {/* Difficulty Badge */}
                <div className="mb-4">
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${
                    test.difficulty === 'Easy' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' :
                    test.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {test.difficulty}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-2 mb-4 flex-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {test.duration} mins
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BarChart3 className="w-4 h-4" />
                    {test.questions} questions
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    {test.attempts} {test.attempts === 1 ? 'attempt' : 'attempts'}
                  </div>
                </div>

                {/* Score if completed */}
                {test.completed && test.avgScore && (
                  <div className="mb-4 p-3 bg-primary/10 rounded-lg">
                    <p className="text-xs text-muted-foreground">Your Score</p>
                    <p className="text-2xl font-bold text-primary">{test.avgScore}%</p>
                  </div>
                )}

                {/* Action Button */}
                <Button className="w-full" variant={test.completed ? 'outline' : 'default'}>
                  <Play className="w-4 h-4 mr-2" />
                  {test.completed ? 'Retake Test' : 'Start Test'}
                </Button>
              </Card>
            ))}
          </div>

          {filteredTests.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No tests found matching your filters</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
