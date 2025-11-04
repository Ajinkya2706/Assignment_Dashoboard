import { AssignmentCard } from './AssignmentCard'

export const AssignmentList = ({ assignments, user, userGroup, onAcknowledge }) => {
  if (assignments.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No assignments found</p>
      </div>
    )
  }

  const isGroupLeader = () => {
    return userGroup && userGroup.leaderId === user.id
  }

  const isAcknowledged = (assignmentId) => {
    // This should come from props or context
    return false
  }

  return (
    <div className="space-y-6">
      {assignments.map(assignment => (
        <AssignmentCard
          key={assignment.id}
          assignment={assignment}
          acknowledged={isAcknowledged(assignment.id)}
          isGroup={assignment.type === 'group'}
          isLeader={isGroupLeader()}
          userGroup={userGroup}
          onAcknowledge={() => onAcknowledge(assignment.id)}
        />
      ))}
    </div>
  )
}


