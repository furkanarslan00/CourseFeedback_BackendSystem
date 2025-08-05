import React from 'react';
import Navbar from '../components/Navbar';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to Enhanced Feedback System</h1>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <a href="/feedback-list" className="block">
              <div className="bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-20 px-8 rounded-lg shadow-lg transition duration-300 flex items-center justify-center text-center">
                <span className="text-xl">Feedback List</span>
              </div>
            </a>
            <a href="/request-feedback" className="block">
              <div className="bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-20 px-8 rounded-lg shadow-lg transition duration-300 flex items-center justify-center text-center">
                <span className="text-xl">Request Feedback</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
