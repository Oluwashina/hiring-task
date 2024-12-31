import * as React from 'react';


const Header = () => {
    return (
        <>
      <header className="w-full bg-white">
        <div className="md:max-w-7xl max-w-full md:mx-auto px-4 sm:px-6 lg:px-4 flex justify-between items-center py-3">
          {/* Logo */}
          <div className="text-purple-600 font-bold text-lg flex items-center">
            <span className="text-2xl mr-2">⚡</span> TaskPlanner
          </div>

          {/* Right Buttons */}
          <div className="hidden md:flex space-x-4">
            <button className="text-gray-600 px-4 py-2 text-sm bg-gray-200 rounded-md hover:text-gray-800 font-medium">
              Explore Features
            </button>
            <button className="bg-black text-sm text-white px-4 py-2 rounded-md hover:bg-gray-800">
              Get Started
            </button>
          </div>
        </div>
      </header>
        </>
      );
}
 
export default Header;