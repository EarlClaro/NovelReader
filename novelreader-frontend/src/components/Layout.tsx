"use client";

import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md p-4">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-gray-800">Book Library</h1>
        </nav>
      </header>
      <main className="py-8">{children}</main>
    </div>
  );
};

export default Layout;
