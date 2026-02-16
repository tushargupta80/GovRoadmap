'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import DashboardNav from '@/components/dashboard/nav'
import { Star, MapPin, Clock, Users, CheckCircle, BookOpen } from 'lucide-react'

interface Coach {
  id: string
  name: string
  expertise: string[]
  rating: number
  reviews: number
  students: number
  hourlyRate: number
  image: string
  bio: string
  verified: boolean
  available: boolean
  experience: number
}

const coaches: Coach[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    expertise: ['Quantitative Aptitude', 'English Language'],
    rating: 4.9,
    reviews: 156,
    students: 340,
    hourlyRate: 500,
    image: '👩‍🏫',
    bio: 'Former SSC CGL rank 245. Expert in shortcut techniques.',
    verified: true,
    available: true,
    experience: 7
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    expertise: ['Reasoning & Logic', 'General Awareness'],
    rating: 4.8,
    reviews: 203,
    students: 512,
    hourlyRate: 450,
    image: '👨‍🏫',
    bio: 'IIT Delhi graduate. Specialized in analytical reasoning.',
    verified: true,
    available: true,
    experience: 9
  },
  {
    id: '3',
    name: 'Anita Verma',
    expertise: ['All Subjects', 'Full Mock Analysis'],
    rating: 4.7,
    reviews: 98,
    students: 210,
    hourlyRate: 600,
    image: '👩‍💼',
    bio: 'Government exam coach with 12 years experience.',
    verified: true,
    available: false,
    experience: 12
  },
  {
    id: '4',
    name: 'Vikram Singh',
    expertise: ['Quantitative Aptitude', 'Mock Test Strategy'],
    rating: 4.6,
    reviews: 142,
    students: 298,
    hourlyRate: 400,
    image: '👨‍💻',
    bio: 'IIT-B alumnus. Focus on problem-solving techniques.',
    verified: true,
    available: true,
    experience: 6
  },
  {
    id: '5',
    name: 'Deepika Patel',
    expertise: ['English Language', 'Comprehension'],
    rating: 4.5,
    reviews: 87,
    students: 165,
    hourlyRate: 380,
    image: '👩‍🎓',
    bio: 'English literature expert with practical approach.',
    verified: false,
    available: true,
    experience: 5
  },
  {
    id: '6',
    name: 'Arjun Mishra',
    expertise: ['General Awareness', 'Current Affairs'],
    rating: 4.4,
    reviews: 62,
    students: 128,
    hourlyRate: 350,
    image: '👨‍📚',
    bio: 'Journalist turned exam coach. Current affairs specialist.',
    verified: true,
    available: true,
    experience: 4
  }
]

export default function CoachingPage() {
  const [selectedExpertise, setSelectedExpertise] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'rating' | 'price' | 'experience'>('rating')

  const allExpertise = Array.from(new Set(coaches.flatMap(c => c.expertise)))

  let filtered = coaches
  if (selectedExpertise) {
    filtered = coaches.filter(c => c.expertise.includes(selectedExpertise))
  }

  filtered.sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating
    if (sortBy === 'price') return a.hourlyRate - b.hourlyRate
    return b.experience - a.experience
  })

  const user = { name: 'Rahul Kumar', email: 'rahul@example.com', exam: 'SSC CGL', joinedDate: 'Jan 15, 2024' }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav user={user} />

      <main className="p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Expert Coaching</h1>
            <p className="text-muted-foreground">Connect with experienced coaches for personalized guidance</p>
          </div>

          {/* Filters */}
          <div className="mb-8 space-y-4">
            <div>
              <p className="text-sm font-semibold mb-3">Filter by Expertise</p>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={selectedExpertise === null ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedExpertise(null)}
                >
                  All Coaches
                </Button>
                {allExpertise.map(expertise => (
                  <Button
                    key={expertise}
                    variant={selectedExpertise === expertise ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedExpertise(expertise)}
                  >
                    {expertise}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold mb-3">Sort By</p>
              <div className="flex gap-2">
                {(['rating', 'price', 'experience'] as const).map(sort => (
                  <Button
                    key={sort}
                    variant={sortBy === sort ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSortBy(sort)}
                  >
                    {sort.charAt(0).toUpperCase() + sort.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Coaches Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(coach => (
              <Card key={coach.id} className="p-6 hover:shadow-lg transition-shadow flex flex-col">
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{coach.image}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg">{coach.name}</h3>
                      {coach.verified && <CheckCircle className="w-4 h-4 text-blue-600" />}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-sm">{coach.rating}</span>
                      <span className="text-xs text-muted-foreground">({coach.reviews})</span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-muted-foreground mb-4">{coach.bio}</p>

                {/* Expertise */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-muted-foreground mb-2">EXPERTISE</p>
                  <div className="flex flex-wrap gap-2">
                    {coach.expertise.slice(0, 2).map(exp => (
                      <span key={exp} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-border">
                  <div>
                    <p className="text-xs text-muted-foreground">Students</p>
                    <p className="font-semibold text-lg">{coach.students}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Experience</p>
                    <p className="font-semibold text-lg">{coach.experience}y</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Rate</p>
                    <p className="font-semibold text-lg">₹{coach.hourlyRate}/hr</p>
                  </div>
                </div>

                {/* Button */}
                <Button 
                  className="w-full"
                  disabled={!coach.available}
                  variant={coach.available ? 'default' : 'outline'}
                >
                  {coach.available ? 'Book Session' : 'Currently Unavailable'}
                </Button>
              </Card>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No coaches found with selected filters</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
