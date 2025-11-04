import { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Navigation } from '../../components/shared/Navigation'
import { CourseGrid } from '../../components/courses/CourseGrid'
import { AssignmentCard } from '../../components/assignments/AssignmentCard'
import { ConfirmDialog } from '../../components/shared/ConfirmDialog'
import { useToast } from '../../hooks/useToast'
import { storage } from '../../utils/storage'
import { MOCK_COURSES } from '../../utils/mockData'
import { api } from '../../services/api'
import { GroupCard } from '../../components/groups/GroupCard'
import { GroupMemberList } from '../../components/groups/GroupMemberList'
import { GroupFormModal } from '../../components/groups/GroupFormModal'

export const StudentDashboard = () => {
  const { user } = useAuth()
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null)

  useEffect(() => {
    const storedCourses = storage.get('courses') || MOCK_COURSES
    setCourses(storedCourses.filter(c => c.students?.includes(user?.id)))
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
          <p className="text-gray-600">Select a course to view assignments</p>
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
  const [submissions, setSubmissions] = useState({})
  const [userGroup, setUserGroup] = useState(null)
  const [groups, setGroups] = useState([])
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [confirmDialog, setConfirmDialog] = useState({ open: false, assignmentId: null })

  useEffect(() => {
    loadData()
  }, [course, user])

  const loadData = async () => {
    const courseAssignments = await api.getAssignments(course.id)
    setAssignments(courseAssignments)
    
    const allSubmissions = storage.get('submissions') || {}
    setSubmissions(allSubmissions)

    const groupsResp = await api.getGroups(course.id)
    setGroups(groupsResp)
    const group = groupsResp.find(g => 
      g.members?.some(m => m.id === user.id)
    )
    setUserGroup(group)
  }

  const handleAcknowledgeClick = (assignmentId) => {
    setConfirmDialog({ open: true, assignmentId })
  }

  const handleAcknowledgeConfirm = async () => {
    const assignmentId = confirmDialog.assignmentId
    const assignment = assignments.find(a => a.id === assignmentId)
    if (!assignment) return

    try {
      if (assignment.type === 'group') {
        if (!userGroup || userGroup.leaderId !== user.id) {
          showToast('Only group leader can acknowledge group assignments', 'error')
          return
        }
        const groupMembers = userGroup.members || []
        const updated = { ...submissions }
        groupMembers.forEach(member => {
          const key = `${member.id}_${assignmentId}`
          updated[key] = {
            studentId: member.id,
            assignmentId,
            timestamp: Date.now(),
            groupId: userGroup.id
          }
        })
        setSubmissions(updated)
        storage.set('submissions', updated)
        showToast(`Submission acknowledged for ${groupMembers.length} group member(s)`, 'success')
      } else {
        const key = `${user.id}_${assignmentId}`
        const updated = { ...submissions }
        updated[key] = {
          studentId: user.id,
          assignmentId,
          timestamp: Date.now()
        }
        setSubmissions(updated)
        storage.set('submissions', updated)
        showToast('Assignment submission acknowledged successfully!', 'success')
      }
      setConfirmDialog({ open: false, assignmentId: null })
      await loadData()
    } catch (error) {
      showToast('Failed to acknowledge submission', 'error')
    }
  }

  const isAcknowledged = (assignmentId) => {
    const key = `${user.id}_${assignmentId}`
    return !!submissions[key]
  }

  const getSubmissionData = (assignmentId) => {
    const key = `${user.id}_${assignmentId}`
    return submissions[key] || null
  }

  const isGroupLeader = () => {
    return userGroup && userGroup.leaderId === user.id
  }

  const handleJoinGroup = async (groupId) => {
    try {
      await api.joinGroup(groupId, user.id)
      showToast('Joined group successfully', 'success')
      await loadData()
    } catch (e) {
      showToast('Failed to join group', 'error')
    }
  }

  const handleCreateGroup = async (groupName) => {
    try {
      await api.createGroup({
        name: groupName,
        courseId: course.id,
        leaderId: user.id,
        members: [{ id: user.id, name: user.name }]
      })
      showToast('Group created', 'success')
      setShowCreateGroup(false)
      await loadData()
    } catch (e) {
      showToast('Failed to create group', 'error')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-black mb-4 flex items-center gap-2 font-medium"
          >
            ← Back to Courses
          </button>
          <h2 className="text-3xl font-bold text-black">{course.name}</h2>
          <p className="text-gray-600">{course.code} • {course.semester}</p>
        </div>

        {/* Groups Section */}
        <div className="mb-10 space-y-4">
          <h3 className="text-xl font-semibold text-black">Groups</h3>
          {userGroup ? (
            <div className="space-y-4">
              <GroupCard group={userGroup} isLeader={isGroupLeader()} onClick={() => {}} />
              <GroupMemberList members={userGroup.members || []} leaderId={userGroup.leaderId} />
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600">You are not part of any group.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {groups.map(g => (
                  <div key={g.id} className="flex items-center justify-between border border-gray-200 rounded-lg p-4 bg-white">
                    <div className="flex-1 mr-4">
                      <p className="font-medium text-black">{g.name}</p>
                      <p className="text-sm text-gray-600">Members: {g.members?.length || 0}</p>
                    </div>
                    <button
                      onClick={() => handleJoinGroup(g.id)}
                      className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900"
                    >
                      Join
                    </button>
                  </div>
                ))}
                {groups.length === 0 && (
                  <div className="text-gray-600">No groups yet. Create one!</div>
                )}
              </div>
              <button
                onClick={() => setShowCreateGroup(true)}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900"
              >
                Create Group
              </button>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {assignments.map(assignment => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              acknowledged={isAcknowledged(assignment.id)}
              isGroup={assignment.type === 'group'}
              isLeader={isGroupLeader()}
              userGroup={userGroup}
              submissionData={getSubmissionData(assignment.id)}
              onAcknowledge={() => handleAcknowledgeClick(assignment.id)}
            />
          ))}
          {assignments.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No assignments found</p>
            </div>
          )}
        </div>
      </main>

      <GroupFormModal
        open={showCreateGroup}
        onClose={() => setShowCreateGroup(false)}
        onSubmit={handleCreateGroup}
      />

      <ConfirmDialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ open: false, assignmentId: null })}
        onConfirm={handleAcknowledgeConfirm}
        title="Confirm Submission"
        message="Yes, I have submitted this assignment. Are you sure you want to acknowledge?"
        confirmText="Yes, I Submitted"
      />
    </div>
  )
}
