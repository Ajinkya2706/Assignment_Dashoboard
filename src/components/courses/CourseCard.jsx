import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import { Users, BookOpen } from 'lucide-react'

export const CourseCard = ({ course, onClick }) => {
  return (
    <Card 
      className="cursor-pointer hover:border-black transition-all duration-300 hover:shadow-lg hover:-translate-y-1 active:translate-y-0"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-gray-600" />
              <CardTitle className="text-xl">{course.name}</CardTitle>
            </div>
            <p className="text-sm text-gray-600">{course.code}</p>
          </div>
          <Badge variant="secondary">{course.semester}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{course.students?.length || 0} students</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


