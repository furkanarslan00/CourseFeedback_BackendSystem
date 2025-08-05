import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const FeedbackRequestForm = () => {
  const [courseName, setCourseName] = useState('');
  const [courseDate, setCourseDate] = useState(new Date('2024-03-17'));
  const [courseTopic, setCourseTopic] = useState('');
  const [formStatus, setFormStatus] = useState(null);
  const [courseNames, setCourseNames] = useState([]);

  useEffect(() => {
    fetchCourseNames();
  }, []);

  const fetchCourseNames = () => {
    const endpoint = "http://localhost:8080/get-courses";

    fetch(endpoint, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("site"),
      }
    })
      .then((response) => {
        console.log(response)
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch course names');
        }
      })
      .then((data) => {
        setCourseNames(data);
        if(data.length > 0) {
          setCourseName(data[0]); // Set default course name if data is not empty
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const endpoint = "http://localhost:8080/request-feedback";

    const feedbackData = {
      courseName: courseName,
      courseDate: courseDate.toISOString(),
      courseTopic: courseTopic
    };

    console.log('Sending feedback data:', feedbackData);

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("site"),
      },
      body: JSON.stringify(feedbackData)
    })
      .then((response) => {
        if (response.ok) {
          setFormStatus('success');
        } else {
          setFormStatus('error');
          throw new Error('Failed to submit feedback request');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setFormStatus('error');
      });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-2500">
        <div className="max-w-md mx-auto p-6 bg-yellow-300 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">Feedback Request Form</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1 font-bold" htmlFor="courseName">Course Name</label>
              <select
                id="courseName"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
              >
                {courseNames.map((name, index) => (
                  <option key={index} value={name}>{name}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-bold" htmlFor="courseDate">Course Date</label>
              <input
                type="date"
                id="courseDate"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                value={courseDate.toISOString().split("T")[0]}
                onChange={(e) => setCourseDate(new Date(e.target.value))}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-bold" htmlFor="courseTopic">Course Topic</label>
              <input
                type="text"
                id="courseTopic"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                value={courseTopic}
                onChange={(e) => setCourseTopic(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md font-bold hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-300"
            >
              Submit
            </button>
          </form>
          {formStatus && (
            <div className={`mt-4 text-center ${formStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {formStatus === 'success' ? 'Form Submitted successfully' : 'Something Went Wrong. Try Again'}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FeedbackRequestForm;
