// Login.jsx
import { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Login attempt:', { email, password });
      setIsLoading(false);
      // Add your real authentication logic here
    }, 1500);
  };

  return (
    <div className="min-h-screen flex overflow-hidden bg-gray-900">
      {/* LEFT SIDE - Dark Login Section */}
      <div className="w-1/2 bg-gray-900 flex flex-col justify-between p-12">
        {/* Top Section */}
        <div>
          {/* Logo/Title */}
          <div className="mb-16">
            <h1 className="text-4xl font-bold text-white mb-2">Login</h1>
            <p className="text-gray-400 text-sm">Enter your account details</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wide mb-2">
                Username
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-0 py-3 bg-transparent border-b border-gray-600 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wide mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-0 py-3 bg-transparent border-b border-gray-600 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-3 text-gray-500 hover:text-gray-400 transition"
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
            <div className="text-right">
              <a href="#" className="text-gray-500 hover:text-gray-400 text-xs">
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 mt-8 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </span>
              ) : (
                'Login'
              )}
            </button>
          </form>
        </div>

        {/* Bottom Section */}
        <div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Don't have an account?</span>
            <a href="#" className="text-white hover:text-gray-300 font-medium">
              Sign up
            </a>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Purple Gradient Section */}
      <div className="w-1/2 bg-gradient-to-br from-purple-600 via-purple-500 to-purple-700 flex flex-col justify-center items-center p-12 relative overflow-hidden">
        {/* Decorative circles background */}
        <div className="absolute top-20 right-20 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 left-20 w-56 h-56 bg-purple-400/10 rounded-full blur-3xl"></div>

        {/* Content */}
        <div className="relative z-10 text-center mb-8">
          <h2 className="text-5xl font-bold text-white mb-2">
            Welcome to<br />Job portal
          </h2>
          <p className="text-purple-100 text-sm">Login to access your account</p>
        </div>

        {/* Illustration Area */}
        <div className="relative z-10 w-full h-80 flex items-center justify-center">
          <svg viewBox="0 0 400 300" className="w-full h-full max-w-lg">
            {/* Left Person - Standing with clipboard/document */}
            <g>
              {/* Head */}
              <circle cx="80" cy="50" r="12" fill="white" />
              {/* Hair */}
              <path d="M 70 45 Q 75 35 85 38" fill="black" />
              {/* Body */}
              <rect x="75" y="65" width="10" height="35" fill="white" />
              {/* Left Arm - holding clipboard */}
              <line x1="75" y1="75" x2="55" y2="70" stroke="white" strokeWidth="4" strokeLinecap="round" />
              {/* Right Arm */}
              <line x1="85" y1="75" x2="105" y2="85" stroke="white" strokeWidth="4" strokeLinecap="round" />
              {/* Left Leg */}
              <line x1="78" y1="100" x2="70" y2="130" stroke="white" strokeWidth="4" strokeLinecap="round" />
              {/* Right Leg */}
              <line x1="82" y1="100" x2="90" y2="130" stroke="white" strokeWidth="4" strokeLinecap="round" />
              {/* Left Shoe */}
              <rect x="65" y="128" width="10" height="6" fill="black" rx="1" />
              {/* Right Shoe */}
              <rect x="85" y="128" width="10" height="6" fill="black" rx="1" />

              {/* Clipboard */}
              <rect x="40" y="55" width="25" height="35" fill="none" stroke="white" strokeWidth="2" />
              <line x1="45" y1="60" x2="60" y2="60" stroke="white" strokeWidth="1.5" />
              <line x1="45" y1="65" x2="60" y2="65" stroke="white" strokeWidth="1.5" />
              <line x1="45" y1="70" x2="60" y2="70" stroke="white" strokeWidth="1.5" />
            </g>

            {/* Central Circle with Settings/Document Icon */}
            <circle cx="200" cy="120" r="50" fill="none" stroke="white" strokeWidth="3" opacity="0.6" />
            <circle cx="200" cy="120" r="35" fill="none" stroke="white" strokeWidth="2" opacity="0.4" />
            
            {/* Settings/Gear Icon in circle */}
            <g transform="translate(200, 120)">
              <circle cx="0" cy="0" r="8" fill="white" />
              <circle cx="0" cy="0" r="15" fill="none" stroke="white" strokeWidth="2" />
              {/* Gear teeth */}
              <line x1="0" y1="-20" x2="0" y2="-25" stroke="white" strokeWidth="1.5" />
              <line x1="14" y1="-14" x2="18" y2="-18" stroke="white" strokeWidth="1.5" />
              <line x1="20" y1="0" x2="25" y2="0" stroke="white" strokeWidth="1.5" />
              <line x1="14" y1="14" x2="18" y2="18" stroke="white" strokeWidth="1.5" />
              <line x1="0" y1="20" x2="0" y2="25" stroke="white" strokeWidth="1.5" />
              <line x1="-14" y1="14" x2="-18" y2="18" stroke="white" strokeWidth="1.5" />
              <line x1="-20" y1="0" x2="-25" y2="0" stroke="white" strokeWidth="1.5" />
              <line x1="-14" y1="-14" x2="-18" y2="-18" stroke="white" strokeWidth="1.5" />
            </g>

            {/* Document/List lines */}
            <g>
              <line x1="130" y1="100" x2="180" y2="100" stroke="white" strokeWidth="2" opacity="0.5" />
              <line x1="130" y1="110" x2="180" y2="110" stroke="white" strokeWidth="2" opacity="0.5" />
              <line x1="130" y1="120" x2="180" y2="120" stroke="white" strokeWidth="2" opacity="0.5" />
              <line x1="130" y1="130" x2="180" y2="130" stroke="white" strokeWidth="2" opacity="0.5" />
              <line x1="220" y1="100" x2="270" y2="100" stroke="white" strokeWidth="2" opacity="0.5" />
              <line x1="220" y1="110" x2="270" y2="110" stroke="white" strokeWidth="2" opacity="0.5" />
              <line x1="220" y1="120" x2="270" y2="120" stroke="white" strokeWidth="2" opacity="0.5" />
              <line x1="220" y1="130" x2="270" y2="130" stroke="white" strokeWidth="2" opacity="0.5" />
            </g>

            {/* Right Person - Sitting with Laptop */}
            <g>
              {/* Head */}
              <circle cx="320" cy="45" r="12" fill="white" />
              {/* Hair */}
              <path d="M 310 40 Q 320 30 330 38" fill="black" />
              {/* Body */}
              <rect x="315" y="60" width="10" height="30" fill="white" />
              {/* Left Arm - on laptop */}
              <line x1="315" y1="70" x2="295" y2="75" stroke="white" strokeWidth="4" strokeLinecap="round" />
              {/* Right Arm - on laptop */}
              <line x1="325" y1="70" x2="345" y2="75" stroke="white" strokeWidth="4" strokeLinecap="round" />
              {/* Legs extended */}
              <line x1="318" y1="90" x2="310" y2="125" stroke="white" strokeWidth="4" strokeLinecap="round" />
              <line x1="322" y1="90" x2="335" y2="128" stroke="white" strokeWidth="4" strokeLinecap="round" />
              {/* Shoes */}
              <rect x="305" y="123" width="10" height="6" fill="black" rx="1" />
              <rect x="330" y="126" width="10" height="6" fill="black" rx="1" />

              {/* Laptop */}
              <rect x="280" y="80" width="40" height="25" fill="white" />
              <rect x="282" y="82" width="36" height="18" fill="purple" opacity="0.3" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}