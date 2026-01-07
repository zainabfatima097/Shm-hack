// services/authService.js
// Mock authentication service for hackathon demo

const users = [
  { id: '1', email: 'demo@harmoniclab.com', password: 'demo123', name: 'Demo User' }
];

export const authService = {
  login: async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          // Remove password from returned object
          const { password: _, ...userWithoutPassword } = user;
          resolve(userWithoutPassword);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000); // Simulate network delay
    });
  },

  signup: async (email, password, name) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (users.some(u => u.email === email)) {
          reject(new Error('Email already exists'));
        } else {
          const newUser = {
            id: Date.now().toString(),
            email,
            password,
            name
          };
          users.push(newUser);
          const { password: _, ...userWithoutPassword } = newUser;
          resolve(userWithoutPassword);
        }
      }, 1000);
    });
  },

  logout: async () => {
    return new Promise(resolve => {
      setTimeout(resolve, 500);
    });
  }
};