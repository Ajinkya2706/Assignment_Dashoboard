import { Progress } from '../ui/progress'
import { Badge } from '../ui/badge'

export const SubmissionProgress = ({ submitted, total, assignmentType }) => {
  const percentage = total > 0 ? Math.round((submitted / total) * 100) : 0
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600">
          {assignmentType === 'group' ? 'Groups' : 'Students'} Submitted
        </span>
        <Badge variant="secondary">
          {submitted}/{total}
        </Badge>
      </div>
      <Progress value={percentage} />
      <p className="text-xs text-gray-600 text-right">{percentage}% complete</p>
    </div>
  )
}


