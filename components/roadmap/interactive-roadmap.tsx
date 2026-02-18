'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Circle, BookOpen, Play, X } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog'

interface TopicNode {
  id: string
  name: string
  status: 'completed' | 'in-progress' | 'pending'
  progress: number
  estimatedHours: number
  lessonCount: number
  description: string
  subtopics: string[]
  prerequisites: string[]
  resources: { title: string; type: string }[]
}

interface RoadmapData {
  subject: string
  topics: TopicNode[]
  topicOrder: string[] // Order in which topics should be learned
}

interface Props {
  roadmapData: RoadmapData
}

export function InteractiveRoadmap({ roadmapData }: Props) {
  const [selectedTopic, setSelectedTopic] = useState<TopicNode | null>(null)
  const [hoveredTopic, setHoveredTopic] = useState<string | null>(null)

  // Calculate positions for topics in a flowing layout
  const getTopicPosition = (index: number) => {
    const itemsPerRow = 3
    const row = Math.floor(index / itemsPerRow)
    const col = index % itemsPerRow
    return {
      x: col * 280 + 40,
      y: row * 200 + 40,
    }
  }

  // Get dependent topics
  const getDependentTopics = (topicId: string) => {
    const topic = roadmapData.topics.find(t => t.id === topicId)
    return topic?.prerequisites || []
  }

  // Get next topics
  const getNextTopics = (topicId: string) => {
    const currentIndex = roadmapData.topicOrder.indexOf(topicId)
    if (currentIndex === -1) return []
    return roadmapData.topicOrder.slice(currentIndex + 1, currentIndex + 2)
  }

  // Draw connecting lines between topics
  const renderConnections = () => {
    const lines = []
    roadmapData.topicOrder.forEach((topicId, index) => {
      if (index < roadmapData.topicOrder.length - 1) {
        const fromTopic = roadmapData.topicOrder[index]
        const toTopic = roadmapData.topicOrder[index + 1]
        const fromPos = getTopicPosition(index)
        const toPos = getTopicPosition(index + 1)

        lines.push(
          <line
            key={`line-${fromTopic}-${toTopic}`}
            x1={fromPos.x + 120}
            y1={fromPos.y + 80}
            x2={toPos.x + 120}
            y2={toPos.y}
            stroke="url(#lineGradient)"
            strokeWidth="2"
            strokeDasharray={hoveredTopic === fromTopic || hoveredTopic === toTopic ? '0' : '5,5'}
            className="transition-all duration-300"
          />
        )
      }
    })
    return lines
  }

  return (
    <div className="w-full">
      {/* Visual Roadmap */}
      <Card className="p-6 mb-8 bg-muted/30 border-2 border-border/50">
        <h3 className="text-lg font-bold mb-4">Interactive Learning Path</h3>
        
        <div className="overflow-x-auto pb-4">
          <svg
            width="100%"
            height="400"
            viewBox={`0 0 1200 400`}
            className="min-w-max"
          >
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Connection Lines */}
            {renderConnections()}

            {/* Topic Nodes */}
            {roadmapData.topicOrder.map((topicId, index) => {
              const topic = roadmapData.topics.find(t => t.id === topicId)
              if (!topic) return null

              const pos = getTopicPosition(index)
              const isCompleted = topic.status === 'completed'
              const isInProgress = topic.status === 'in-progress'

              return (
                <g
                  key={topicId}
                  onMouseEnter={() => setHoveredTopic(topicId)}
                  onMouseLeave={() => setHoveredTopic(null)}
                  className="cursor-pointer"
                  onClick={() => setSelectedTopic(topic)}
                >
                  {/* Node Shadow */}
                  <rect
                    x={pos.x + 2}
                    y={pos.y + 2}
                    width="240"
                    height="80"
                    rx="8"
                    fill="rgba(0, 0, 0, 0.1)"
                  />

                  {/* Node Background */}
                  <rect
                    x={pos.x}
                    y={pos.y}
                    width="240"
                    height="80"
                    rx="8"
                    fill={
                      hoveredTopic === topicId
                        ? 'var(--color-primary)'
                        : isCompleted
                        ? 'rgb(220, 252, 231)'
                        : isInProgress
                        ? 'rgb(254, 243, 199)'
                        : 'rgb(254, 243, 199)'
                    }
                    stroke={
                      isCompleted
                        ? 'rgb(34, 197, 94)'
                        : isInProgress
                        ? 'rgb(234, 179, 8)'
                        : 'rgb(209, 213, 219)'
                    }
                    strokeWidth="2"
                    className="transition-all duration-300"
                  />

                  {/* Status Indicator */}
                  <circle
                    cx={pos.x + 220}
                    cy={pos.y + 10}
                    r="8"
                    fill={
                      isCompleted
                        ? 'rgb(34, 197, 94)'
                        : isInProgress
                        ? 'rgb(234, 179, 8)'
                        : 'rgb(209, 213, 219)'
                    }
                  />

                  {/* Text Content */}
                  <text
                    x={pos.x + 120}
                    y={pos.y + 25}
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="bold"
                    fill={hoveredTopic === topicId ? 'white' : 'black'}
                    className="pointer-events-none transition-all duration-300"
                  >
                    {topic.name}
                  </text>

                  {/* Progress Info */}
                  <text
                    x={pos.x + 120}
                    y={pos.y + 50}
                    textAnchor="middle"
                    fontSize="12"
                    fill={hoveredTopic === topicId ? 'white' : 'rgb(107, 114, 128)'}
                    className="pointer-events-none transition-all duration-300"
                  >
                    {topic.estimatedHours}h • {topic.lessonCount} lessons
                  </text>

                  {/* Progress Bar */}
                  <rect
                    x={pos.x + 10}
                    y={pos.y + 65}
                    width="220"
                    height="4"
                    rx="2"
                    fill={hoveredTopic === topicId ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.1)'}
                  />
                  <rect
                    x={pos.x + 10}
                    y={pos.y + 65}
                    width={Math.max(2, (220 * topic.progress) / 100)}
                    height="4"
                    rx="2"
                    fill={hoveredTopic === topicId ? 'white' : 'var(--color-primary)'}
                    className="transition-all duration-300"
                  />
                </g>
              )
            })}
          </svg>
        </div>

        <p className="text-xs text-muted-foreground mt-4">
          Click on any topic to view details. Topics are ordered by recommended learning sequence.
        </p>
      </Card>

      {/* Topic Detail Modal */}
      <Dialog open={!!selectedTopic} onOpenChange={() => setSelectedTopic(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedTopic && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <DialogTitle className="text-2xl mb-2">{selectedTopic.name}</DialogTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        {selectedTopic.status === 'completed' ? (
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        ) : (
                          <Circle className="w-4 h-4" />
                        )}
                        {selectedTopic.status === 'completed' && 'Completed'}
                        {selectedTopic.status === 'in-progress' && 'In Progress'}
                        {selectedTopic.status === 'pending' && 'Not Started'}
                      </span>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                {/* Progress */}
                <div>
                  <h4 className="font-semibold mb-2">Progress</h4>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className="bg-primary rounded-full h-3 transition-all duration-300"
                      style={{ width: `${selectedTopic.progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{selectedTopic.progress}% Complete</p>
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-semibold mb-2">About This Topic</h4>
                  <p className="text-sm text-muted-foreground">{selectedTopic.description}</p>
                </div>

                {/* Subtopics */}
                {selectedTopic.subtopics.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">What You'll Learn</h4>
                    <ul className="space-y-2">
                      {selectedTopic.subtopics.map((subtopic, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          {subtopic}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Prerequisites */}
                {selectedTopic.prerequisites.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Prerequisites</h4>
                    <p className="text-sm text-muted-foreground">
                      Learn these topics first: {selectedTopic.prerequisites.join(', ')}
                    </p>
                  </div>
                )}

                {/* Resources */}
                {selectedTopic.resources.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Study Materials</h4>
                    <div className="space-y-2">
                      {selectedTopic.resources.map((resource, i) => (
                        <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg">
                          <div>
                            <p className="text-sm font-medium">{resource.title}</p>
                            <p className="text-xs text-muted-foreground">{resource.type}</p>
                          </div>
                          <Button size="sm" variant="outline">
                            <BookOpen className="w-4 h-4 mr-2" />
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Lessons</p>
                    <p className="text-2xl font-bold">{selectedTopic.lessonCount}</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Time</p>
                    <p className="text-2xl font-bold">{selectedTopic.estimatedHours}h</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1">
                    <Play className="w-4 h-4 mr-2" />
                    {selectedTopic.status === 'completed' ? 'Review Topic' : 'Start Learning'}
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <BookOpen className="w-4 h-4 mr-2" />
                    View Notes
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
