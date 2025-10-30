import React, { useState, useEffect } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { StudentDashboard } from './views/StudentDashboard';
import { AdminDashboard } from './views/AdminDashboard';
import { storage } from './utils/storage';
import { MOCK_DATA } from './constants';

const App = () => {
  // State
  const [user, setUser] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [students, setStudents] = useState([]);
  const [showConfirm, setShowConfirm] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [newAssignment, setNewAssignment] = useState({ 
    title: '', 
    description: '', 
    dueDate: '', 
    driveLink: '' 
  });

  // Initialize data
  useEffect(() => {
    const storedUser = storage.get('user');
    const storedAssignments = storage.get('assignments');
    const storedStudents = storage.get('students');

    if (storedUser) setUser(storedUser);
    
    if (storedAssignments) {
      setAssignments(storedAssignments);
    } else {
      setAssignments(MOCK_DATA.assignments);
      storage.set('assignments', MOCK_DATA.assignments);
    }

    if (storedStudents) {
      setStudents(storedStudents);
    } else {
      setStudents(MOCK_DATA.students);
      storage.set('students', MOCK_DATA.students);
    }
  }, []);

  // Auth handlers
  const login = (role, userId = null) => {
    const userData = role === 'admin' 
      ? { role: 'admin', name: 'Prof. Ram', email: 'Ram@university.edu' }
      : students.find(s => s.id === userId);
    setUser(userData);
    storage.set('user', userData);
  };

  const logout = () => {
    setUser(null);
    storage.remove('user');
  };

  // Student handlers
  const handleSubmitClick = (assignmentId) => {
    setShowConfirm(assignmentId);
  };

  const handleSubmitConfirm = (assignmentId) => {
    // find student position
    const idx = students.findIndex(s => s.id === user.id);
    if (idx === -1) return;

    // clone array and student object to avoid mutating state
    const updated = [...students];
    const student = { ...updated[idx] };

    // ensure submissions object exists and mark this assignment submitted
    student.submissions = { ...(student.submissions || {}), [assignmentId]: true };

    // put the updated student back into the array
    updated[idx] = student;
    setStudents(updated);
    storage.set('students', updated);
    
    const updatedUser = updated.find(s => s.id === user.id);
    setUser(updatedUser);
    storage.set('user', updatedUser);
    setShowConfirm(null);
  };

  // Admin handlers
  const handleCreateClick = () => setShowCreate(true);

  const handleCreate = () => {
    const assignment = { 
      ...newAssignment, 
      id: Date.now(), 
      createdBy: user.email 
    };
    const updated = [...assignments, assignment];
    setAssignments(updated);
    storage.set('assignments', updated);
    setNewAssignment({ title: '', description: '', dueDate: '', driveLink: '' });
    setShowCreate(false);
  };

  const handleDelete = (id) => {
    const updated = assignments.filter(a => a.id !== id);
    setAssignments(updated);
    storage.set('assignments', updated);
  };

  const handleModalClose = () => {
    setShowConfirm(null);
    setShowCreate(false);
  };

  // Render
  if (!user) {
    return <LoginScreen students={students} onLogin={login} />;
  }

  if (user.role === 'admin') {
    return (
      <AdminDashboard
        user={user}
        assignments={assignments}
        students={students}
        showCreate={showCreate}
        newAssignment={newAssignment}
        onLogout={logout}
        onCreateClick={handleCreateClick}
        onAssignmentChange={setNewAssignment}
        onCreate={handleCreate}
        onModalClose={handleModalClose}
        onDelete={handleDelete}
      />
    );
  }

  return (
    <StudentDashboard
      user={user}
      assignments={assignments}
      showConfirm={showConfirm}
      onLogout={logout}
      onSubmitClick={handleSubmitClick}
      onSubmitConfirm={handleSubmitConfirm}
      onModalClose={handleModalClose}
    />
  );
};

export default App;