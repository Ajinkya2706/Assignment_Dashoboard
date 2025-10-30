import React from 'react';
import { CheckCircle, Clock, Trash2, Calendar, ExternalLink, BarChart3 } from 'lucide-react';

export const AssignmentCardAdmin = ({ assignment, students, stats, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 space-y-2">
            <h3 className="text-2xl font-bold text-black">{assignment.title}</h3>
            <p className="text-gray-600 leading-relaxed">{assignment.description}</p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">
                  {new Date(assignment.dueDate).toLocaleDateString('en-US', { 
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
                Drive Link
              </a>
            </div>
          </div>
          
          <button
            onClick={onDelete}
            className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 pt-4 border-t-2 border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-black" />
              <span className="font-semibold text-black">Submission Progress</span>
            </div>
            <span className="text-gray-600 text-sm font-medium">
              {stats.submitted}/{stats.total} completed
            </span>
          </div>
          
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-black h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${stats.percentage}%` }}
              ></div>
            </div>
            <span className="absolute right-0 -top-6 text-black font-bold text-sm">
              {Math.round(stats.percentage)}%
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
            {students.map(s => (
              <div 
                key={s.id}
                className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                  s.submissions[assignment.id]
                    ? 'bg-gray-100 border-black'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-black">{s.name}</span>
                  {s.submissions[assignment.id] ? (
                    <CheckCircle className="w-5 h-5 text-black" />
                  ) : (
                    <Clock className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};