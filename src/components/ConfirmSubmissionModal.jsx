import React from 'react';
import { Modal } from '../components/Model';

export const ConfirmSubmissionModal = ({ show, onConfirm, onClose }) => {
  if (!show) return null;

  return (
    <Modal title="Confirm Submission" onClose={onClose}>
      <div className="space-y-6">
        <p className="text-gray-600 leading-relaxed">
          Please confirm that you have successfully uploaded your assignment through the provided Drive link.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 hover:bg-gray-800 text-white py-3 rounded-xl font-medium transition-all duration-200"
          >
            Yes, I've Submitted
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