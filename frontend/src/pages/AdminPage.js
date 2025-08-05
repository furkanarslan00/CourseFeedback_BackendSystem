import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

const AdminPage = () => {
  const [chatGPTConfig, setChatGPTConfig] = useState({
    secretKey: '',
  });

  const [emailServerConfig, setEmailServerConfig] = useState({
    host: '',
    port: '',
    username: '',
    password: '',
  });

  const handleChatGPTConfigChange = (e) => {
    const { name, value } = e.target;
    setChatGPTConfig({ ...chatGPTConfig, [name]: value });
  };

  const handleEmailServerConfigChange = (e) => {
    const { name, value } = e.target;
    setEmailServerConfig({ ...emailServerConfig, [name]: value });
  };

  const handleSaveChatGPTConfig = async () => {
    try {
      const token = localStorage.getItem("site");
      const headers = {
        'Authorization': 'Bearer ' + token
      };
  
      await axios.post('http://localhost:8080/update-chatgpt-api', chatGPTConfig, { headers });
      
      console.log('ChatGPT API configuration saved successfully!');
    } catch (error) {
      console.error('Error saving ChatGPT API configuration:', error);
    }
  };

  const handleSaveEmailServerConfig = async () => {
    try {
      const token = localStorage.getItem("site");
      const headers = {
        'Authorization': 'Bearer ' + token
      };
  
      await axios.post('http://localhost:8080/update-email-server-config', emailServerConfig, { headers });
      
      console.log('Email server configuration saved successfully!');
    } catch (error) {
      console.error('Error saving email server configuration:', error);
    }
  };
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">ADMIN PAGE</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">CHATGPT API CONFIGURATION</h2>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            name="secretKey"
            value={chatGPTConfig.secretKey}
            onChange={handleChatGPTConfigChange}
            placeholder="Enter Secret Key"
            className="p-2 border border-gray-500 rounded"
          />
          <button onClick={handleSaveChatGPTConfig} className="bg-yellow-300 text-black font-bold px-4 py-2 rounded">
            SAVE
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">EMAIL SERVER CONFIGURATION</h2>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            name="host"
            value={emailServerConfig.host}
            onChange={handleEmailServerConfigChange}
            placeholder="Enter Host"
            className="p-2 border border-gray-500 rounded"
          />
          <input
            type="text"
            name="port"
            value={emailServerConfig.port}
            onChange={handleEmailServerConfigChange}
            placeholder="Enter Port"
            className="p-2 border border-gray-500 rounded"
          />
          <input
            type="text"
            name="username"
            value={emailServerConfig.username}
            onChange={handleEmailServerConfigChange}
            placeholder="Enter Username"
            className="p-2 border border-gray-500 rounded"
          />
          <input
            type="password"
            name="password"
            value={emailServerConfig.password}
            onChange={handleEmailServerConfigChange}
            placeholder="Enter Password"
            className="p-2 border border-gray-500 rounded"
          />
          <button onClick={handleSaveEmailServerConfig} className="bg-yellow-300 text-black font-bold px-4 py-2 rounded">
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
