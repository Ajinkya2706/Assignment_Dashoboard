import React from 'react';
import { Navigation } from '../components/Navigation';
import { ProgressCard } from '../components/ProgressCard';
import { AssignmentCardStudent } from '../components/AssignmentCardStudent';
import { ConfirmSubmissionModal } from '../components/ConfirmSubmissionModal';

export const StudentDashboard = ({ 
  user, 
  assignments, 
  showConfirm,
  onLogout, 
  onSubmitClick,
  onSubmitConfirm,
  onModalClose
}) => {
  const userAssignments = assignments.map(a => ({
    ...a,
    submitted: user.submissions?.[a.id] || false
  }));
  
  const completedCount = userAssignments.filter(a => a.submitted).length;
  const completionRate = userAssignments.length 
    ? (completedCount / userAssignments.length) * 100 
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation user={user} onLogout={onLogout} />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <ProgressCard 
          completedCount={completedCount}
          totalCount={userAssignments.length}
          percentage={completionRate}
        />

        <div className="space-y-5">
          {userAssignments.map(a => (
            <AssignmentCardStudent
              key={a.id}
              assignment={a}
              onSubmit={() => onSubmitClick(a.id)}
            />
          ))}
        </div>
      </main>

      <ConfirmSubmissionModal
        show={showConfirm !== null}
        onConfirm={() => onSubmitConfirm(showConfirm)}
        onClose={onModalClose}
      />
    </div>
  );
};
