"use client";

import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16">
          <Link href="/" className="flex-shrink-0">
            <span className="text-xl font-bold text-white">Spartans</span>
          </Link>
          
          <div className="hidden sm:flex sm:ml-8 sm:space-x-4">
            <Link 
              href="/profile" 
              className="text-gray-200 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Profile
            </Link>
            <Link 
              href="/actions" 
              className="text-gray-200 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Actions
            </Link>
            <Link 
              href="/tournaments" 
              className="text-gray-200 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Tournaments
            </Link>
            <Link 
              href="/milestones" 
              className="text-gray-200 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Milestones
            </Link>
          </div>
          
          <div className="flex-1 flex justify-end">
            {/* Add user menu/profile dropdown here */}
          </div>
        </div>
      </div>
    </nav>
  );
}
