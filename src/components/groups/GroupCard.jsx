import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import { Users, Crown } from 'lucide-react'

export const GroupCard = ({ group, isLeader, onClick }) => {
  return (
    <Card 
      className="cursor-pointer hover:border-black transition-all duration-200"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{group.name}</CardTitle>
          {isLeader && (
            <Badge variant="warning">
              <Crown className="w-3 h-3 mr-1" />
              Leader
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>{group.members?.length || 0} members</span>
        </div>
      </CardContent>
    </Card>
  )
}


