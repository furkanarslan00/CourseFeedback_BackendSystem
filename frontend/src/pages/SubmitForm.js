import React, { useState, useEffect } from 'react';
import StudentNavbar from '../components/StudentNavbar';

function SubmitForm() {
  const [feedback, setFeedback] = useState('');
  const [courseName, setCourseName] = useState('');
  const [feedbackTopic, setFeedbackTopic] = useState('');
  const [date, setDate] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState(null);

  useEffect(() => {
    // Parse URL parameters to extract course name, feedback topic, and date
    const urlParams = new URLSearchParams(window.location.search);
    const courseNameParam = urlParams.get('courseName');
    const feedbackTopicParam = urlParams.get('feedbackTopic');
    const dateParam = urlParams.get('date');
    const uidParam = urlParams.get('uid');

    // Set the states with the extracted parameters
    setCourseName(courseNameParam);
    setFeedbackTopic(feedbackTopicParam);
    setDate(dateParam);

    // Store uid in localStorage to use it later
    localStorage.setItem('uid', uidParam);
  }, []);

  const handleChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = () => {
    // Prepare data for submission
    const comment = feedback;
    const uid = localStorage.getItem('uid');

    // Send HTTP POST request
    fetch('http://localhost:8080/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'url': uid
      },
      body: JSON.stringify(comment)
    })
      .then(response => {
        if (response.ok) {
          console.log('Feedback submitted successfully');
          setSubmissionStatus('success'); // Update submission status
        } else {
          console.error('Failed to submit feedback');
          setSubmissionStatus('error'); // Update submission status
        }
      })
      .catch(error => {
        console.error('Error submitting feedback:', error);
        setSubmissionStatus('error'); // Update submission status
      });
  };

  return (
    <>
      <StudentNavbar />
      <div className="bg-yellow-300 text-black py-4 px-8 h-screen">
        <h1 className="text-xl font-bold mb-4">{courseName} Feedback Form</h1>
        <div className="flex justify-end mb-4">
          <div>
            <p>{date}</p>
            <p>{feedbackTopic}</p>
          </div>
        </div>
        <textarea
          className="w-full h-40 bg-white text-black border border-gray-500 rounded-lg p-4 mb-4"
          placeholder="COMMENTS ABOUT THE COURSE:"
          value={feedback}
          onChange={handleChange}
        />
        <button
          className="text-white bg-black py-2 px-4 rounded-lg"
          onClick={handleSubmit}
        >
          Submit
        </button>
        {/* Conditionally render submission status message */}
        {submissionStatus === 'success' && (
          <p className="text-green-500 mt-4">Form submitted successfully!</p>
        )}
        {submissionStatus === 'error' && (
          <p className="text-red-500 mt-4">Failed to submit feedback. Please try again later.</p>
        )}
      </div>
    </>
  );
}

export default SubmitForm;
