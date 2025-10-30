import React from 'react';

export const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
    <div className="bg-white border-2 border-gray-200 rounded-2xl max-w-lg w-full shadow-2xl">
      <div className="p-6 space-y-6">
        <h3 className="text-2xl font-bold text-black">{title}</h3>
        {children}
      </div>
    </div>
  </div>
);