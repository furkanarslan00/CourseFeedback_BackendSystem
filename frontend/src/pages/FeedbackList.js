import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useDispatch } from 'react-redux';
import { setFeedbackEntry } from '../actions/FeedbackAction';

const FeedbackList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [feedbackEntries, setFeedbackEntries] = useState([]);
  const [sortBy, setSortBy] = useState('date'); // Default sort by date
  const [filterCourse, setFilterCourse] = useState('');

  useEffect(() => {
    fetchFeedbackData();
  }, []);

  const handleSelectEntry = (entry) => {
    dispatch(setFeedbackEntry(entry));
    navigate('/feedback-summary');
  };

  const fetchFeedbackData = async () => {
    try {
      console.log('Token:', localStorage.getItem("site"));
      const response = await axios.get('http://localhost:8080/get-feedbacks', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("site"),
        }
      });
      setFeedbackEntries(response.data);
    } catch (error) {
      console.error('Error fetching feedback data:', error);
    }
  };

  const sortedFeedback = [...feedbackEntries].sort((a, b) => {
    if (sortBy === 'course') {
      return a.courseName.localeCompare(b.courseName);
    } else {
      return new Date(b.date) - new Date(a.date);
    }
  });

  const filteredFeedback = sortedFeedback.filter(entry =>
    entry.courseName.toLowerCase().includes(filterCourse.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Feedback List</h1>
        <div className="flex justify-end mb-4">
          <div className="flex items-center mr-4">
            <label htmlFor="sortBy" className="mr-2">Sort By:</label>
            <select
              id="sortBy"
              className="border border-gray-300 rounded p-1"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="date">Date</option>
              <option value="course">Course Name</option>
            </select>
          </div>
          <div className="flex items-center">
            <label htmlFor="filterCourse" className="mr-2">Filter By Course:</label>
            <input
              type="text"
              id="filterCourse"
              className="border border-gray-300 rounded p-1"
              value={filterCourse}
              onChange={e => setFilterCourse(e.target.value)}
            />
          </div>
        </div>
        <div className="border border-gray-300 rounded p-4">
          <div className="overflow-y-auto max-h-100">
            {filteredFeedback.map((entry, index) => (
              <div key={index} 
                onClick={() => handleSelectEntry(entry)}
                className="cursor-pointer text-black border-b border-gray-300 bg-gray-200 rounded p-4 mb-4">
                <div>
                  <p className="text-lg font-semibold">{entry.courseName}</p>
                  <p className="text-sm text-gray-500">{entry.date.toString().split("T")[0]}</p>
                </div>
                <p className="mt-2 text-gray-700">{entry.summary || 'No summary available'}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedbackList;