import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoginPage from './pages/Login';
import HomePage from './pages/HomePage'; 
import RequestFeedback from './pages/RequestFeedback';
import FeedbackList from './pages/FeedbackList';
import FeedbackSummary from './pages/FeedbackSummary';
import AdminPage from './pages/AdminPage'; 
import SubmitForm from './pages/SubmitForm'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPageLayout />} />
        <Route path="/homepage" element={<HomePage />} /> 
        <Route path="/request-feedback" element={<RequestFeedback />} /> 
        <Route path="/feedback-list" element={<FeedbackList />} /> 
        <Route path="/feedback-summary" element={<FeedbackSummary />} /> 
        <Route path="/admin-page" element={<AdminPage />} /> 
        <Route path="/submitform" element={<SubmitForm />} />
      </Routes>
    </BrowserRouter>
  );
}

// LoginPageLayout component to wrap login page elements
function LoginPageLayout() {
  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <LoginPage />
      </div>
    </div>
  );
}

export default App;
