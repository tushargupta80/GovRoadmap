'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  BarChart3, 
  BookOpen, 
  Target, 
  Users, 
  Settings, 
  LogOut,
  ArrowRight,
  Clock,
  TrendingUp
} from 'lucide-react'
import DashboardNav from '@/components/dashboard/nav'
import ProgressCard from '@/components/dashboard/progress-card'
import UpcomingTests from '@/components/dashboard/upcoming-tests'
import StudyStats from '@/components/dashboard/study-stats'

export default function DashboardPage() {
  const [currentUser] = useState({
    name: 'Rahul Kumar',
    email: 'rahul@example.com',
    exam: 'SSC CGL',
    joinedDate: 'Jan 15, 2024'
  })

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav user={currentUser} />

      <main className="p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Welcome back, {currentUser.name.split(' ')[0]}! 👋</h1>
            <p className="text-muted-foreground">Your {currentUser.exam} preparation dashboard</p>
          </div>

          {/* Quick Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Study Hours This Week</p>
                  <p className="text-2xl font-bold">12.5</p>
                </div>
                <Clock className="w-8 h-8 text-primary opacity-50" />
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Tests Completed</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <BarChart3 className="w-8 h-8 text-primary opacity-50" />
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Average Score</p>
                  <p className="text-2xl font-bold">72%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary opacity-50" />
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Roadmap Progress</p>
                  <p className="text-2xl font-bold">42%</p>
                </div>
                <Target className="w-8 h-8 text-primary opacity-50" />
              </div>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Study Roadmap */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">Study Roadmap</h2>
                    <p className="text-sm text-muted-foreground mt-1">Your personalized {currentUser.exam} preparation plan</p>
                  </div>
                  <Target className="w-8 h-8 text-primary opacity-50" />
                </div>

                <div className="space-y-4">
                  <ProgressCard 
                    title="Quantitative Aptitude"
                    progress={55}
                    description="Elementary arithmetic, geometry, algebra"
                    topicsCompleted={8}
                    topicsTotal={15}
                  />
                  <ProgressCard 
                    title="English Language"
                    progress={72}
                    description="Grammar, vocabulary, comprehension"
                    topicsCompleted={11}
                    topicsTotal={15}
                  />
                  <ProgressCard 
                    title="Reasoning & Logic"
                    progress={38}
                    description="Verbal and non-verbal reasoning"
                    topicsCompleted={4}
                    topicsTotal={10}
                  />
                  <ProgressCard 
                    title="General Awareness"
                    progress={65}
                    description="Current affairs, history, geography"
                    topicsCompleted={8}
                    topicsTotal={12}
                  />
                </div>

                <Link href="/dashboard/roadmap">
                  <Button variant="outline" className="w-full mt-6">
                    View Full Roadmap <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </Card>

              {/* Performance Chart */}
              <StudyStats />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Upcoming Tests */}
              <UpcomingTests />

              {/* Quick Actions */}
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link href="/dashboard/tests">
                    <Button variant="outline" className="w-full justify-start">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Take a Mock Test
                    </Button>
                  </Link>
                  <Link href="/dashboard/coaching">
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="w-4 h-4 mr-2" />
                      Find a Coach
                    </Button>
                  </Link>
                  <Link href="/dashboard/settings">
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  </Link>
                </div>
              </Card>

              {/* Upgrade Card */}
              <Card className="p-6 bg-primary/5 border-primary/20">
                <h3 className="text-lg font-bold mb-2">Upgrade to Pro</h3>
                <p className="text-sm text-muted-foreground mb-4">Get unlimited tests, 1-on-1 coaching, and personalized study plans.</p>
                <Button className="w-full">Upgrade Now</Button>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
