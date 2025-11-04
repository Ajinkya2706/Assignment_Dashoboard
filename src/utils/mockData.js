export const MOCK_COURSES = [
  { 
    id: 'c1', 
    name: 'Advanced React', 
    code: 'CS401', 
    semester: 'Fall 2025', 
    professorId: 'p1', 
    students: ['s1', 's2', 's3'] 
  },
  { 
    id: 'c2', 
    name: 'Database Systems', 
    code: 'CS302', 
    semester: 'Fall 2025', 
    professorId: 'p1', 
    students: ['s1', 's2', 's3'] 
  },
]

export const MOCK_ASSIGNMENTS = [
  { 
    id: 'a1', 
    courseId: 'c1', 
    title: 'React Hooks Project', 
    description: 'Build a comprehensive app using React hooks', 
    deadline: '2025-11-15T23:59', 
    driveLink: 'https://onedrive.live.com/example1', 
    type: 'individual' 
  },
  { 
    id: 'a2', 
    courseId: 'c1', 
    title: 'Group Presentation', 
    description: 'Team presentation on modern web development', 
    deadline: '2025-11-20T23:59', 
    driveLink: 'https://onedrive.live.com/example2', 
    type: 'group' 
  },
]

export const MOCK_GROUPS = [
  {
    id: 'g1',
    courseId: 'c1',
    name: 'Team Alpha',
    leaderId: 's1',
    members: [
      { id: 's1', name: 'Rohan Patil' },
      { id: 's2', name: 'Diya Jain' }
    ]
  },
  {
    id: 'g2',
    courseId: 'c2',
    name: 'DB Masters',
    leaderId: 's1',
    members: [
      { id: 's1', name: 'Rohan Patil' },
      { id: 's2', name: 'Diya Jain' },
      { id: 's3', name: 'Om Kapur' }
    ]
  },
  {
    id: 'g3',
    courseId: 'c2',
    name: 'Query Ninjas',
    leaderId: 's2',
    members: [
      { id: 's2', name: 'Diya Jain' },
      { id: 's3', name: 'Om Kapur' }
    ]
  }
]



