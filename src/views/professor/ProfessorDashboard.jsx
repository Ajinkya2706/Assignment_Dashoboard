import { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Navigation } from '../../components/shared/Navigation'
import { CourseGrid } from '../../components/courses/CourseGrid'
import { api } from '../../services/api'
import { MOCK_COURSES } from '../../utils/mockData'
import { storage } from '../../utils/storage'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { Select } from '../../components/ui/select'
import { SubmissionProgress } from '../../components/assignments/SubmissionProgress'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '../../components/ui/dialog'
import { AssignmentForm } from '../../components/assignments/AssignmentForm'
import { Search, Filter, Trash2 } from 'lucide-react'
import { useToast } from '../../hooks/useToast'

export const ProfessorDashboard = () => {
  const { user } = useAuth()
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null)

  useEffect(() => {
    const storedCourses = storage.get('courses') || MOCK_COURSES
    setCourses(storedCourses.filter(c => c.professorId === user?.id))
  }, [user])

  if (selectedCourse) {
    return <CourseAssignments course={selectedCourse} onBack={() => setSelectedCourse(null)} />
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">My Courses</h2>
          <p className="text-gray-600">Select a course to manage assignments</p>
        </div>
        <CourseGrid 
          courses={courses} 
          onCourseClick={setSelectedCourse}
        />
      </main>
    </div>
  )
}

export const CourseAssignments = ({ course, onBack }) => {
  const { user } = useAuth()
  const { showToast } = useToast()
  const [assignments, setAssignments] = useState([])
  const [filteredAssignments, setFilteredAssignments] = useState([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [submissions, setSubmissions] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    loadData()
  }, [course])

  const loadData = async () => {
    const courseAssignments = await api.getAssignments(course.id)
    setAssignments(courseAssignments)
    
    const allSubmissions = storage.get('submissions') || {}
    setSubmissions(allSubmissions)
  }

  const handleCreateAssignment = async (formData) => {
    try {
      const newAssignment = {
        ...formData,
        courseId: course.id,
        createdBy: user.id
      }
      await api.createAssignment(newAssignment)
      await loadData()
      setShowCreateModal(false)
      showToast('Assignment created successfully!', 'success')
    } catch (error) {
      showToast('Failed to create assignment', 'error')
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      try {
        await api.deleteAssignment(id)
        await loadData()
        showToast('Assignment deleted successfully', 'success')
      } catch (error) {
        showToast('Failed to delete assignment', 'error')
      }
    }
  }

  const getSubmissionStats = (assignmentId) => {
    const assignmentSubmissions = Object.values(submissions).filter(
      s => s.assignmentId === assignmentId
    )
    return {
      submitted: assignmentSubmissions.length,
      total: course.students?.length || 0
    }
  }

  const filterAssignments = () => {
    let filtered = [...assignments]
    
    if (searchTerm) {
      filtered = filtered.filter(a => 
        a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(assignment => {
        const stats = getSubmissionStats(assignment.id)
        const percentage = stats.total > 0 ? (stats.submitted / stats.total) * 100 : 0
        
        if (filterStatus === 'completed') return percentage === 100
        if (filterStatus === 'pending') return percentage < 100 && percentage > 0
        if (filterStatus === 'no-submissions') return percentage === 0
        return true
      })
    }
    
    setFilteredAssignments(filtered)
  }

  useEffect(() => {
    filterAssignments()
  }, [assignments, searchTerm, filterStatus, submissions])

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-black mb-4 flex items-center gap-2 font-medium"
          >
            ← Back to Courses
          </button>
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-black">{course.name}</h2>
              <p className="text-gray-600">{course.code} • {course.semester}</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-all shadow-md hover:scale-105 active:scale-95"
            >
              + New Assignment
            </button>
          </div>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              placeholder="Search assignments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="min-w-[150px]"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="no-submissions">No Submissions</option>
            </Select>
          </div>
        </div>

        <div className="space-y-6">
          {filteredAssignments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No assignments found</p>
            </div>
          ) : (
            filteredAssignments.map(assignment => {
              const stats = getSubmissionStats(assignment.id)
              return (
                <AssignmentCardProfessor
                  key={assignment.id}
                  assignment={assignment}
                  stats={stats}
                  onDelete={() => handleDelete(assignment.id)}
                />
              )
            })
          )}
        </div>
      </main>

      {showCreateModal && (
        <AssignmentCreateModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateAssignment}
        />
      )}
    </div>
  )
}

const AssignmentCardProfessor = ({ assignment, stats, onDelete }) => {
  const deadline = new Date(assignment.deadline)

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{assignment.title}</CardTitle>
            <p className="text-sm text-gray-600 mt-1">{assignment.description}</p>
          </div>
          <div className="flex gap-2">
            <Badge className="capitalize">{assignment.type}</Badge>
            <button
              onClick={onDelete}
              className="text-red-600 hover:text-red-700 text-sm flex items-center gap-1 transition-colors hover:bg-red-50 p-2 rounded"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Due: {deadline.toLocaleString()}
          </p>
          <SubmissionProgress
            submitted={stats.submitted}
            total={stats.total}
            assignmentType={assignment.type}
          />
        </div>
      </CardContent>
    </Card>
  )
}

const AssignmentCreateModal = ({ onClose, onSubmit }) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Assignment</DialogTitle>
          <DialogClose onClose={onClose} />
        </DialogHeader>
        <AssignmentForm onSubmit={onSubmit} onCancel={onClose} />
      </DialogContent>
    </Dialog>
  )
}

