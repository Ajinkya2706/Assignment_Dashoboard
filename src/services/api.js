import { storage } from '../utils/storage'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const getToken = () => localStorage.getItem('token')

export const api = {
  async request(endpoint, options = {}) {
    const token = getToken()
    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    }

    try {
      const response = await fetch(`${API_URL}${endpoint}`, config)
      if (!response.ok) throw new Error('Request failed')
      return await response.json()
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },

  // Courses
  getCourses() {
    return Promise.resolve(storage.get('courses') || [])
  },

  createCourse(course) {
    const courses = storage.get('courses') || []
    const newCourse = { ...course, id: Date.now().toString() }
    storage.set('courses', [...courses, newCourse])
    return Promise.resolve(newCourse)
  },

  // Assignments
  getAssignments(courseId) {
    const assignments = storage.get('assignments') || []
    return Promise.resolve(courseId ? assignments.filter(a => a.courseId === courseId) : assignments)
  },

  createAssignment(assignment) {
    const assignments = storage.get('assignments') || []
    const newAssignment = { ...assignment, id: Date.now().toString() }
    storage.set('assignments', [...assignments, newAssignment])
    return Promise.resolve(newAssignment)
  },

  updateAssignment(id, updates) {
    const assignments = storage.get('assignments') || []
    const updated = assignments.map(a => a.id === id ? { ...a, ...updates } : a)
    storage.set('assignments', updated)
    return Promise.resolve(updated.find(a => a.id === id))
  },

  deleteAssignment(id) {
    const assignments = storage.get('assignments') || []
    storage.set('assignments', assignments.filter(a => a.id !== id))
    return Promise.resolve()
  },

  // Submissions
  getSubmissions(assignmentId) {
    const submissions = storage.get('submissions') || {}
    return Promise.resolve(
      Object.values(submissions).filter(s => s.assignmentId === assignmentId)
    )
  },

  createSubmission(submission) {
    const submissions = storage.get('submissions') || {}
    const key = `${submission.studentId}_${submission.assignmentId}`
    const newSubmission = { ...submission, timestamp: Date.now() }
    storage.set('submissions', { ...submissions, [key]: newSubmission })
    return Promise.resolve(newSubmission)
  },

  // Groups
  getGroups(courseId) {
    const groups = storage.get('groups') || []
    return Promise.resolve(groups.filter(g => g.courseId === courseId))
  },

  createGroup(group) {
    const groups = storage.get('groups') || []
    const newGroup = { ...group, id: Date.now().toString() }
    storage.set('groups', [...groups, newGroup])
    return Promise.resolve(newGroup)
  },

  joinGroup(groupId, studentId) {
    const groups = storage.get('groups') || []
    // Try to resolve joining student's name from localStorage user
    let studentName = undefined
    try {
      const currentUser = JSON.parse(localStorage.getItem('user') || 'null')
      if (currentUser && currentUser.id === studentId) studentName = currentUser.name
    } catch {}

    const updated = groups.map(g => {
      if (g.id !== groupId) return g
      const members = Array.isArray(g.members) ? g.members : []
      const alreadyMember = members.some(m => m.id === studentId)
      if (alreadyMember) return g
      const newMember = studentName ? { id: studentId, name: studentName } : { id: studentId }
      return { ...g, members: [...members, newMember] }
    })

    storage.set('groups', updated)
    return Promise.resolve(updated.find(g => g.id === groupId))
  },
}



