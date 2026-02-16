import { Outlet, useNavigate } from 'react-router-dom';
import { LogOut, Home, Briefcase, User, FileText } from 'lucide-react';
import { useEffect } from 'react';

export default function ProtectedLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-900 text-white shadow-lg">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <Briefcase className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Job Tracker</h1>
          </div>

          <nav className="space-y-2">
            <NavLink
              to="/feed"
              icon={<Home className="w-5 h-5" />}
              label="Job Feed"
            />
            <NavLink
              to="/applications"
              icon={<FileText className="w-5 h-5" />}
              label="Applications"
            />
            <NavLink
              to="/profile"
              icon={<User className="w-5 h-5" />}
              label="Profile"
            />
          </nav>
        </div>

        {/* Logout Button */}
        <div className="absolute bottom-0 w-64 p-6 border-t border-indigo-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 bg-red-600 hover:bg-red-700 transition text-white px-4 py-2 rounded-lg font-semibold"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

function NavLink({ to, icon, label }) {
  return (
    <a
      href={to}
      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-800 transition cursor-pointer"
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}
