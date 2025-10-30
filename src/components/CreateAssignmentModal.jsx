import React from 'react';
import { Modal } from '../components/Model';

export const CreateAssignmentModal = ({ 
  show, 
  newAssignment, 
  onAssignmentChange, 
  onCreate, 
  onClose 
}) => {
  if (!show) return null;

  return (
    <Modal title="Create New Assignment" onClose={onClose}>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Assignment Title"
          value={newAssignment.title}
          onChange={e => onAssignmentChange({...newAssignment, title: e.target.value})}
          className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-black placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
        />
        <textarea
          placeholder="Description"
          value={newAssignment.description}
          onChange={e => onAssignmentChange({...newAssignment, description: e.target.value})}
          className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-black placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-black outline-none h-28 resize-none transition-all"
        />
        <input
          type="date"
          value={newAssignment.dueDate}
          onChange={e => onAssignmentChange({...newAssignment, dueDate: e.target.value})}
          className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-black focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
        />
        <input
          type="url"
          placeholder="Drive Link for Submission"
          value={newAssignment.driveLink}
          onChange={e => onAssignmentChange({...newAssignment, driveLink: e.target.value})}
          className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-black placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
        />
        <div className="flex gap-3 pt-2">
          <button
            onClick={onCreate}
            disabled={!newAssignment.title || !newAssignment.dueDate}
            className="flex-1 bg-black hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-xl font-medium transition-all duration-200"
          >
            Create Assignment
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-black py-3 rounded-xl font-medium transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};