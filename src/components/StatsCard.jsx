import React from 'react';
import { TrendingUp } from 'lucide-react';

export const StatsCard = ({ icon: Icon, label, value, trend }) => (
  <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-black transition-all duration-200">
    <div className="flex items-start justify-between mb-4">
      <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
        <Icon className="w-6 h-6 text-white" />
      </div>
      {trend && (
        <div className="flex items-center gap-1 text-black text-sm font-medium">
          <TrendingUp className="w-4 h-4" />
          {trend}
        </div>
      )}
    </div>
    <p className="text-gray-600 text-sm mb-1">{label}</p>
    <p className="text-3xl font-bold text-black">{value}</p>
  </div>
);