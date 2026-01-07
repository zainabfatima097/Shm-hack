// components/common/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import ParticleBackground from '../ui/ParticleBackground';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950/50 relative overflow-hidden">
      <ParticleBackground />
      
      {/* Background effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-full blur-3xl" />
      </div>

      <Sidebar />
      <main className="lg:pl-0">
          <Outlet />
      </main>
    </div>
  );
};

export default Layout;