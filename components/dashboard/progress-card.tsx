interface ProgressCardProps {
  title: string
  progress: number
  description: string
  topicsCompleted: number
  topicsTotal: number
}

export default function ProgressCard({
  title,
  progress,
  description,
  topicsCompleted,
  topicsTotal
}: ProgressCardProps) {
  return (
    <div className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-semibold">{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <span className="text-sm font-bold text-primary">{progress}%</span>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-muted rounded-full h-2 mb-3">
        <div 
          className="bg-primary rounded-full h-2 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Topics */}
      <p className="text-xs text-muted-foreground">
        {topicsCompleted} of {topicsTotal} topics completed
      </p>
    </div>
  )
}
