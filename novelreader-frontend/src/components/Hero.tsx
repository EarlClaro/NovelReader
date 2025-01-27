"use client";

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const SidebarWithDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Sidebar button */}
      <button
        onClick={openDialog}
        className="p-4 text-gray-600 focus:outline-none lg:hidden"
      >
        <Bars3Icon className="w-6 h-6" />
      </button>

      {/* Mobile Sidebar Dialog */}
      <Dialog open={isOpen} onClose={closeDialog}>
        <Dialog.Panel className="fixed inset-0 z-10 bg-gray-800 bg-opacity-75">
          <div className="flex justify-between items-center p-4 bg-gray-800">
            <h2 className="text-white text-xl">Menu</h2>
            <button onClick={closeDialog} className="text-white">
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="p-4 text-white">
            <ul>
              <li className="py-2">
                <a href="#" className="hover:text-blue-500">Home</a>
              </li>
              <li className="py-2">
                <a href="#" className="hover:text-blue-500">About</a>
              </li>
              <li className="py-2">
                <a href="#" className="hover:text-blue-500">Services</a>
              </li>
              <li className="py-2">
                <a href="#" className="hover:text-blue-500">Contact</a>
              </li>
            </ul>
          </div>
        </Dialog.Panel>
      </Dialog>

      {/* Main Content */}
      <div className="lg:px-10 lg:py-6">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to Our Website</h1>
        <p className="mt-4 text-gray-600">Responsive Sidebar with Dialog</p>
      </div>
    </div>
  );
};

export default SidebarWithDialog;
