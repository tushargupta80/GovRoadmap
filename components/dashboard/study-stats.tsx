'use client'

import { Card } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

const scoreData = [
  { name: 'Test 1', score: 65 },
  { name: 'Test 2', score: 68 },
  { name: 'Test 3', score: 72 },
  { name: 'Test 4', score: 70 },
  { name: 'Test 5', score: 75 },
  { name: 'Test 6', score: 78 },
  { name: 'Test 7', score: 72 },
  { name: 'Test 8', score: 80 },
]

const studyHoursData = [
  { name: 'Mon', hours: 2 },
  { name: 'Tue', hours: 3 },
  { name: 'Wed', hours: 2.5 },
  { name: 'Thu', hours: 4 },
  { name: 'Fri', hours: 3.5 },
  { name: 'Sat', hours: 4.5 },
  { name: 'Sun', hours: 2 },
]

export default function StudyStats() {
  return (
    <div className="space-y-6">
      {/* Score Trend */}
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-6">Score Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={scoreData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--color-background)',
                border: '1px solid var(--color-border)',
                borderRadius: '0.625rem'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="score" 
              stroke="var(--color-primary)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-primary)', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Weekly Study Hours */}
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-6">Study Hours This Week</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={studyHoursData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--color-background)',
                border: '1px solid var(--color-border)',
                borderRadius: '0.625rem'
              }}
            />
            <Bar 
              dataKey="hours" 
              fill="var(--color-primary)"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
