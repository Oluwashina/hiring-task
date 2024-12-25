import React from "react";
import google_icon from '../../assets/google.png'
import facebook_icon from '../../assets/Facebook.png'
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col ">

      {/* Header Section */}
      <header className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 flex justify-between items-center py-3">
          {/* Logo */}
          <div className="text-purple-600 font-bold text-lg flex items-center">
            <span className="text-2xl mr-2">⚡</span> TaskPlanner
          </div>

          {/* Right Buttons */}
          <div className="flex space-x-4">
            <button className="text-gray-600 px-4 py-2 text-sm bg-gray-200 rounded-md hover:text-gray-800 font-medium">
              Explore Features
            </button>
            <button className="bg-black text-sm text-white px-4 py-2 rounded-md hover:bg-gray-800">
              Get Started
            </button>
          </div>
        </div>
      </header>

            {/* Main Content */}
       <main className="mt-6 flex flex-col justify-center items-center">
         <div className="max-w-md w-full border border-gray-300 rounded-lg p-6">
        {/* Header */}
        <div className="text-center">
          <img
            className="mx-auto mb-4 w-16 h-16 rounded-full bg-purple-100"
            alt="Profile"
            src="https://via.placeholder.com/64" // image URL
          />
          <h1 className="text-xl font-bold mb-1">Sign in to TaskPlanner</h1>
          <p className="text-gray-500 text-sm">
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              className="text-purple-600 hover:underline font-medium"
            >
              Sign Up
            </Link>
          </p>
        </div>

        {/* Social Login */}
        <div className="mt-6 space-y-3">
          <button className="flex items-center justify-center text-sm w-full py-3 px-4 border border-gray-300 rounded-md text-gray-700">
            <img
              src={google_icon}
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Sign in with Google
          </button>
          <button className="flex items-center text-sm justify-center w-full py-3 px-4 border border-gray-300 rounded-md text-gray-700">
            <img
              src={facebook_icon}
              alt="Facebook"
              className="w-4 h-4 mr-2"
            />
            Sign in with Facebook
          </button>
        </div>

        {/* Separator */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Registration Form */}
        <form>
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="text"
                id="email"
                className="mt-2 block text-sm w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter your email address"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-xs font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-2 block w-full px-4 text-sm py-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter your password"
              />
            </div>
    
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="mt-6 w-full bg-black text-sm text-white py-4 px-4 rounded-lg hover:bg-gray-800"
          >
            Login 
          </button>
        </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-3 text-center text-xs text-gray-500">
        © TaskPlanner team
      </footer>
    </div>
  );
};

export default LoginPage;
