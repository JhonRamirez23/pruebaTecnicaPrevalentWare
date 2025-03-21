import React from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className='flex flex-row min-h-screen bg-gray-50'>
      <Sidebar />
      <main className='flex-1 p-6 bg-gray-50'>{children}</main>
    </div>
  );
}
