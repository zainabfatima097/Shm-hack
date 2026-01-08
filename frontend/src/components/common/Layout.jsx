// components/common/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import ParticleBackground from '../ui/ParticleBackground';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
      <ParticleBackground variant="default" />
      
      <Sidebar />
      <main className="lg:ml-0">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;