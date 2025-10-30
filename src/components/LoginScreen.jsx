import React from 'react';
import { Users, BookOpen } from 'lucide-react';

export const LoginScreen = ({ students, onLogin }) => (
  <div className="min-h-screen bg-white flex items-center justify-center p-4">
    <div className="max-w-md w-full">
      <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-200 p-8 space-y-8">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center mx-auto">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-black">AssignHub</h1>
          <p className="text-gray-600">Select your role to access dashboard</p>
        </div>
        
        <div className="space-y-3">
          <button 
            onClick={() => onLogin('admin')}
            className="group w-full bg-black hover:bg-gray-800 text-white py-3.5 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
          >
            <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Continue as Professor
          </button>
          
          <div className="relative py-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white text-sm text-gray-500">or select student</span>
            </div>
          </div>

          {students.map(s => (
            <button 
              key={s.id}
              onClick={() => onLogin('student', s.id)}
              className="w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-black text-black py-3 px-4 rounded-xl font-medium transition-all duration-200"
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
);