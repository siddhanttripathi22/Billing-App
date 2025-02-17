// src/components/layout/Layout.jsx
import React from 'react';
import Header from './Header';

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-white border-t mt-auto">
        <div className="container mx-auto px-4 py-4 text-center text-gray-600">
          © 2024 Billing System
        </div>
      </footer>
    </div>
  );
}

export default Layout;