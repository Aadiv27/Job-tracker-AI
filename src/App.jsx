import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import JobFeed from './pages/JobFeed';
import Profile from './pages/Profile';
import Applications from './pages/Applications';
import ProtectedLayout from './components/layout/ProtectedLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route element={<ProtectedLayout />}>
          <Route path="/feed" element={<JobFeed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/applications" element={<Applications />} />
        </Route>
        
        <Route path="*" element={<div className="min-h-screen flex items-center justify-center">404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;