import React from 'react';

export const ProgressCard = ({ completedCount, totalCount, percentage }) => (
  <div className="relative overflow-hidden bg-black rounded-3xl p-8 shadow-2xl">
    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
    
    <div className="relative z-10">
      <h2 className="text-2xl font-bold text-white mb-2">Your Progress</h2>
      <p className="text-gray-400 mb-6">
        {completedCount} of {totalCount} assignments completed
      </p>
      <div className="bg-gray-800 rounded-full h-4 overflow-hidden">
        <div 
          className="bg-white h-full rounded-full transition-all duration-700 ease-out shadow-lg"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-right text-white font-bold mt-2">{Math.round(percentage)}%</p>
    </div>
  </div>
);