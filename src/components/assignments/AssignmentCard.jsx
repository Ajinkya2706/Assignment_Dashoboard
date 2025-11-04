import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Calendar, FileText, CheckCircle, Clock, ExternalLink, CheckCircle2 } from 'lucide-react'

export const AssignmentCard = ({ assignment, acknowledged, isGroup, isLeader, onAcknowledge, userGroup, submissionData }) => {
  const deadline = new Date(assignment.deadline)
  const isOverdue = deadline < new Date()
  const isPending = !acknowledged
  
  const getAcknowledgedTime = () => {
    if (!submissionData?.timestamp) return null
    return new Date(submissionData.timestamp).toLocaleString()
  }

  return (
    <Card className={`transition-all duration-300 hover:shadow-lg ${acknowledged ? 'border-green-500 border-2' : isOverdue ? 'border-yellow-500 border-2' : 'hover:border-black'}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2">{assignment.title}</CardTitle>
            <p className="text-sm text-gray-600 mt-1">{assignment.description}</p>
          </div>
          {acknowledged ? (
            <Badge variant="success" className="animate-pulse">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Submitted
            </Badge>
          ) : (
            <Badge variant={isOverdue ? 'warning' : 'secondary'}>
              <Clock className="w-3 h-3 mr-1" />
              {isOverdue ? 'Overdue' : 'Pending'}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 pt-2 border-t border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Due: {deadline.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FileText className="w-4 h-4" />
            <span className="capitalize">{assignment.type} Submission</span>
          </div>
          <a 
            href={assignment.driveLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sm text-black hover:text-gray-700 flex items-center gap-1 transition-all font-medium underline hover:gap-2"
          >
            <ExternalLink className="w-3 h-3" />
            OneDrive Submission Link
          </a>
          {acknowledged && getAcknowledgedTime() && (
            <div className="flex items-center gap-2 text-xs text-green-700 mt-2">
              <CheckCircle2 className="w-3 h-3" />
              <span>Acknowledged on {getAcknowledgedTime()}</span>
            </div>
          )}
        </div>

        {isGroup && !userGroup && (
          <div className="p-3 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
            <p className="text-sm text-yellow-800">
              You are not part of any group. Form or join one to submit this assignment.
            </p>
          </div>
        )}

        {isPending && (
          <div className="pt-2">
            {isGroup && !isLeader ? (
              <p className="text-sm text-gray-600 italic">
                Only group leader can acknowledge submission
              </p>
            ) : (
              <Button 
                onClick={onAcknowledge} 
                className="w-full font-semibold hover:scale-[1.02] active:scale-[0.98] transition-transform"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Yes, I Have Acknowledged
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}


