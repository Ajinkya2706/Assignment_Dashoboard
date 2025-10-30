import React from 'react';
import { CheckCircle, Calendar, ExternalLink } from 'lucide-react';

export const AssignmentCardStudent = ({ assignment, onSubmit }) => {
  const isOverdue = new Date(assignment.dueDate) < new Date();
  
  return (
    <div className="group bg-white rounded-2xl border-2 border-gray-200 hover:border-black transition-all duration-300 overflow-hidden hover:shadow-2xl">
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 space-y-2">
            <h3 className="text-xl font-bold text-black group-hover:text-gray-800 transition-colors">
              {assignment.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {assignment.description}
            </p>
          </div>
          
          {assignment.submitted ? (
            <div className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full whitespace-nowrap">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium text-sm">Submitted</span>
            </div>
          ) : (
            <button
              onClick={onSubmit}
              className="bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              Submit
            </button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-4 pt-4 border-t-2 border-gray-100">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className={`${isOverdue && !assignment.submitted ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
              Due: {new Date(assignment.dueDate).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </span>
          </div>
          <a 
            href={assignment.driveLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-black hover:text-gray-600 text-sm font-medium transition-colors underline"
          >
            <ExternalLink className="w-4 h-4" />
            Submission Portal
          </a>
        </div>
      </div>
    </div>
  );
};
