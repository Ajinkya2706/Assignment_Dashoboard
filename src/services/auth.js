const API_URL = 'http://localhost:3000/api'; // Mock URL

export const authService = {
  login: async (email, password) => {
    // Mock users map (passwords are 12345 for demo users)
    const users = {
      'prof@uni.edu': { id: 'p1', role: 'professor', name: 'Prof. Ram' },
      'rohan@student.com': { id: 's1', role: 'student', name: 'Rohan Patil' },
      'diya@student.com': { id: 's2', role: 'student', name: 'Diya Jain' },
      'kapur@student.com': { id: 's3', role: 'student', name: 'Om Kapur' },
    };

    const userFromMap = users[email] || { id: 's1', role: 'student', name: 'Rohan Patil' };
    const mockUser = { email, ...userFromMap };
    
    const token = btoa(JSON.stringify({ ...mockUser, exp: Date.now() + 86400000 }));
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(mockUser));
    return { token, user: mockUser };
  },

  register: async (name, email, password, role) => {
    const user = { id: Date.now().toString(), name, email, role };
    const token = btoa(JSON.stringify({ ...user, exp: Date.now() + 86400000 }));
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return { token, user };
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken: () => localStorage.getItem('token'),

  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    try {
      const decoded = JSON.parse(atob(token));
      return decoded.exp > Date.now();
    } catch {
      return false;
    }
  }
};