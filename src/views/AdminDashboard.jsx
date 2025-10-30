import React from 'react';
import { Plus, BookOpen, Users, CheckCircle } from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { StatsCard } from '../components/StatsCard';
import { AssignmentCardAdmin } from '../components/AssignmentCardAdmin';
import { CreateAssignmentModal } from '../components/CreateAssignmentModal';
import { getSubmissionStats } from '../utils/helpers';

export const AdminDashboard = ({ 
  user, 
  assignments, 
  students,
  showCreate,
  newAssignment,
  onLogout,
  onCreateClick,
  onAssignmentChange,
  onCreate,
  onModalClose,
  onDelete
}) => {
  const totalAssignments = assignments.length;
  const totalSubmissions = assignments.reduce((acc, a) => 
    acc + getSubmissionStats(a.id, students).submitted, 0
  );
  const maxSubmissions = totalAssignments * students.length;
  const avgCompletion = maxSubmissions ? Math.round((totalSubmissions / maxSubmissions) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation user={user} onLogout={onLogout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-black mb-2">Dashboard</h2>
            <p className="text-gray-600">Monitor assignment submissions</p>
          </div>
          <button
            onClick={onCreateClick}
            className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all duration-200 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            New Assignment
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard 
            icon={BookOpen}
            label="Total Assignments"
            value={totalAssignments}
          />
          <StatsCard 
            icon={Users}
            label="Total Students"
            value={students.length}
          />
          <StatsCard 
            icon={CheckCircle}
            label="Avg Completion"
            value={`${avgCompletion}%`}
            trend={avgCompletion > 50 ? '+12%' : null}
          />
        </div>

        {/* Assignments */}
        <div className="space-y-6">
          {assignments.map(a => (
            <AssignmentCardAdmin
              key={a.id}
              assignment={a}
              students={students}
              stats={getSubmissionStats(a.id, students)}
              onDelete={() => onDelete(a.id)}
            />
          ))}
        </div>
      </main>

      <CreateAssignmentModal
        show={showCreate}
        newAssignment={newAssignment}
        onAssignmentChange={onAssignmentChange}
        onCreate={onCreate}
        onClose={onModalClose}
      />
    </div>
  );
};