import React from 'react';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';

const FeedbackSummary = () => {
  // Accessing feedbackEntry from the Redux state
  const feedbackEntry = useSelector(state => state.feedback.feedbackEntry);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Feedback Summary</h1>

        {/* Displaying topic and date */}
        <div className="mt-4 md:mt-0 text-right mb-4">
          <p className="text-lg font-semibold">{feedbackEntry?.topic}</p>
          {/* Displaying date, ensuring we handle undefined or null values gracefully */}
          <p className="text-sm text-gray-500">Date: {feedbackEntry?.date ? new Date(feedbackEntry.date).toISOString().split("T")[0] : 'Unknown date'}</p>
        </div>

        <div className="border border-gray-300 rounded p-4">
          {/* Conditional rendering to check if feedbackEntry exists */}
          {feedbackEntry ? (
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              {/* Displaying course name */}
              <div>
                <p className="text-lg font-semibold">Course Name: {feedbackEntry.courseName}</p>
                {/* Displaying summary or a default message if summary is not available */}
                <div className="mt-2 bg-gray-100 rounded p-2 max-h-32 overflow-y-auto">
                  <p className="text-gray-700">{feedbackEntry.summary || 'No summary available'}</p>
                </div>
              </div>
            </div>
          ) : (
            // Displayed if there is no feedback entry available
            <p className="text-red-500">No feedback data available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default FeedbackSummary;
