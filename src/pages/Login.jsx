import { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulate API call
      console.log('Login attempt:', { email, password });
      
      // Add small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Validate credentials
      if (email && password) {
        // Store in localStorage
        localStorage.setItem('user', JSON.stringify({ email, password }));
        localStorage.setItem('isLoggedIn', 'true');
        
        // Navigate to feed
        console.log('Redirecting to /feed...');
        navigate('/feed', { replace: true });
      } else {
        setError('Please fill in all fields');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      {/* SPLIT VIEW SECTION */}
      <div className="split-container">
        {/* LEFT SIDE - LOGIN FORM */}
        <div className="left-panel">
          <div className="login-content">
            <div className="form-container">
              <h1 className="main-title">Login</h1>
              <p className="main-subtitle">Enter your account details</p>

              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="login-form">
                {/* Username Field */}
                <div className="form-group">
                  <label htmlFor="email">USERNAME</label>
                  <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your username"
                    className="form-input"
                    required
                    disabled={isLoading}
                  />
                </div>

                {/* Password Field */}
                <div className="form-group">
                  <label htmlFor="password">PASSWORD</label>
                  <div className="password-wrapper">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="form-input"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="password-toggle"
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Forgot Password */}
                <div className="forgot-password">
                  <a href="#">Forgot Password?</a>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="submit-button"
                >
                  {isLoading ? (
                    <span className="button-loading">
                      <Loader2 className="spinner" />
                      Logging in...
                    </span>
                  ) : (
                    'Login'
                  )}
                </button>
              </form>

              {/* Sign Up Link */}
              <div className="signup-section">
                <span>Don't have an account?</span>
                <a href="#">Sign up</a>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - HERO */}
        <div className="right-panel">
          <div className="hero-content">
            <div className="keyboard">
              <span className="key">J</span>
              <span className="key">O</span>
              <span className="key">B</span>
              <br />
              <span className="key">P</span>
              <span className="key">O</span>
              <span className="key">R</span>
              <span className="key">T</span>
              <span className="key">A</span>
              <span className="key">L</span>
            </div>
            <p className="hero-subtitle">Login to access your account</p>
          </div>

          {/* Decorative circles */}
          <div className="decoration decoration-1"></div>
          <div className="decoration decoration-2"></div>
        </div>
      </div>
    </div>
  );
}
