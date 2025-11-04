import { Badge } from '../ui/badge'
import { Crown } from 'lucide-react'

export const GroupMemberList = ({ members, leaderId }) => {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-black mb-2">Members</h4>
      {members.map(member => (
        <div
          key={member.id}
          className="flex items-center justify-between p-2 bg-gray-50 border border-gray-200 rounded-lg"
        >
          <span className="text-sm text-black">{member.name}</span>
          {member.id === leaderId && (
            <Badge variant="warning" className="text-xs">
              <Crown className="w-3 h-3 mr-1" />
              Leader
            </Badge>
          )}
        </div>
      ))}
    </div>
  )
}


