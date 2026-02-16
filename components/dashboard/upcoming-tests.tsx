import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface Test {
  id: string
  name: string
  date: string
  time: string
  duration: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
}

const upcomingTests: Test[] = [
  {
    id: '1',
    name: 'Quantitative Aptitude - Session 1',
    date: 'Feb 25, 2024',
    time: '7:00 PM',
    duration: 120,
    difficulty: 'Medium'
  },
  {
    id: '2',
    name: 'Full Mock Test - SSC CGL',
    date: 'Feb 28, 2024',
    time: '9:00 AM',
    duration: 180,
    difficulty: 'Hard'
  },
  {
    id: '3',
    name: 'English - Reading Comprehension',
    date: 'Mar 2, 2024',
    time: '6:00 PM',
    duration: 60,
    difficulty: 'Medium'
  }
]

export default function UpcomingTests() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold mb-4">Upcoming Tests</h3>
      
      <div className="space-y-4">
        {upcomingTests.map((test) => (
          <div key={test.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
            <h4 className="font-semibold text-sm mb-2">{test.name}</h4>
            
            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="w-4 h-4" />
                {test.date}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="w-4 h-4" />
                {test.time} • {test.duration} mins
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className={`text-xs font-semibold px-2 py-1 rounded ${
                test.difficulty === 'Easy' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' :
                test.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200' :
                'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
              }`}>
                {test.difficulty}
              </span>
              <Link href={`/dashboard/tests/${test.id}`}>
                <Button variant="ghost" size="sm">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <Link href="/dashboard/tests">
        <Button variant="outline" className="w-full mt-4">
          Browse All Tests
        </Button>
      </Link>
    </Card>
  )
}
