'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import DashboardNav from '@/components/dashboard/nav'
import { Star, MapPin, Clock, Users, CheckCircle, Calendar, MessageSquare, Award } from 'lucide-react'

interface Review {
  id: string
  student: string
  rating: number
  comment: string
  date: string
}

const coachData = {
  id: '1',
  name: 'Priya Sharma',
  expertise: ['Quantitative Aptitude', 'English Language', 'Mock Test Strategy'],
  rating: 4.9,
  reviews: 156,
  students: 340,
  hourlyRate: 500,
  image: '👩‍🏫',
  bio: 'Former SSC CGL rank 245. Expert in shortcut techniques and time management. Helped 1000+ students crack government exams.',
  verified: true,
  available: true,
  experience: 7,
  location: 'Delhi, India',
  languages: ['English', 'Hindi', 'Punjabi'],
  about: 'I am Priya Sharma, an experienced government exam coach with 7 years of dedicated teaching experience. I have helped over 1000 students achieve their dreams of cracking SSC CGL and other government exams. My expertise lies in Quantitative Aptitude and English Language, where I focus on teaching time-efficient shortcuts and conceptual clarity.',
  schedule: [
    { day: 'Monday', slots: ['7:00 PM', '8:00 PM', '9:00 PM'] },
    { day: 'Tuesday', slots: ['6:00 PM', '7:00 PM'] },
    { day: 'Wednesday', slots: ['7:00 PM', '8:00 PM', '9:00 PM'] },
    { day: 'Thursday', slots: ['6:00 PM', '8:00 PM'] },
    { day: 'Friday', slots: ['7:00 PM', '9:00 PM'] },
    { day: 'Saturday', slots: ['10:00 AM', '2:00 PM', '5:00 PM'] },
    { day: 'Sunday', slots: ['6:00 PM', '8:00 PM'] }
  ],
  reviews: [
    {
      id: '1',
      student: 'Rahul K.',
      rating: 5,
      comment: 'Priya is an excellent coach. Her shortcut techniques helped me solve QA questions in half the time. Highly recommended!',
      date: '2 weeks ago'
    },
    {
      id: '2',
      student: 'Neha S.',
      rating: 5,
      comment: 'The way she explains concepts is amazing. Her mock test analysis sessions are extremely helpful for identifying weak areas.',
      date: '1 month ago'
    },
    {
      id: '3',
      student: 'Arjun M.',
      rating: 4,
      comment: 'Great coach overall. Very patient and willing to clarify doubts multiple times. Helped me improve my English score significantly.',
      date: '1 month ago'
    }
  ]
}

export default function CoachingDetailPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const user = { name: 'Rahul Kumar', email: 'rahul@example.com', exam: 'SSC CGL', joinedDate: 'Jan 15, 2024' }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav user={user} />

      <main className="p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Coach Header */}
          <Card className="p-8 mb-8">
            <div className="flex items-start gap-6 mb-6">
              <div className="text-6xl">{coachData.image}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-3xl font-bold">{coachData.name}</h1>
                  {coachData.verified && <CheckCircle className="w-6 h-6 text-blue-600" />}
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold">{coachData.rating}</span>
                    <span className="text-muted-foreground">({coachData.reviews} reviews)</span>
                  </div>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{coachData.experience} years experience</span>
                </div>

                <p className="text-muted-foreground mb-4">{coachData.bio}</p>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-sm">{coachData.students}+ students taught</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-sm">{coachData.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm">₹{coachData.hourlyRate}/hour</span>
                  </div>
                </div>
              </div>

              <Button size="lg" onClick={() => setShowBookingForm(!showBookingForm)}>
                {showBookingForm ? 'Close' : 'Book a Session'}
              </Button>
            </div>
          </Card>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">About</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">{coachData.about}</p>
                
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-sm mb-2">Languages</p>
                    <div className="flex gap-2">
                      {coachData.languages.map(lang => (
                        <span key={lang} className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Expertise */}
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Expertise</h2>
                <div className="space-y-3">
                  {coachData.expertise.map((exp, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-primary" />
                      <span>{exp}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Reviews */}
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-6">Student Reviews</h2>
                
                <div className="space-y-4">
                  {coachData.reviews.map(review => (
                    <div key={review.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-semibold">{review.student}</p>
                          <p className="text-xs text-muted-foreground">{review.date}</p>
                        </div>
                        <div className="flex gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-border'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Booking Sidebar */}
            <div>
              {showBookingForm && (
                <Card className="p-6 sticky top-8">
                  <h3 className="text-lg font-bold mb-4">Book a Session</h3>
                  
                  <div className="space-y-4 mb-6">
                    <p className="text-sm font-semibold">Select a Date</p>
                    <div className="space-y-2">
                      {coachData.schedule.map((item) => (
                        <button
                          key={item.day}
                          onClick={() => setSelectedDate(item.day)}
                          className={`w-full text-left p-3 rounded-lg border transition-colors ${
                            selectedDate === item.day
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <p className="font-semibold text-sm">{item.day}</p>
                          <p className="text-xs text-muted-foreground">{item.slots.length} slots available</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {selectedDate && (
                    <div className="space-y-4 mb-6">
                      <p className="text-sm font-semibold">Select a Time Slot</p>
                      <div className="grid grid-cols-2 gap-2">
                        {coachData.schedule
                          .find(s => s.day === selectedDate)
                          ?.slots.map(slot => (
                            <button
                              key={slot}
                              onClick={() => setSelectedSlot(slot)}
                              className={`p-2 rounded-lg border text-sm transition-colors ${
                                selectedSlot === slot
                                  ? 'border-primary bg-primary text-primary-foreground'
                                  : 'border-border hover:border-primary/50'
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                      </div>
                    </div>
                  )}

                  {selectedDate && selectedSlot && (
                    <div className="space-y-4 p-4 bg-muted rounded-lg mb-6">
                      <div>
                        <p className="text-xs text-muted-foreground">Date & Time</p>
                        <p className="font-semibold">{selectedDate}, {selectedSlot}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Duration</p>
                        <p className="font-semibold">60 minutes</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Price</p>
                        <p className="font-semibold">₹{coachData.hourlyRate}</p>
                      </div>
                    </div>
                  )}

                  <Button 
                    className="w-full"
                    disabled={!selectedDate || !selectedSlot}
                  >
                    Confirm Booking
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    You can message the coach before the session
                  </p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
