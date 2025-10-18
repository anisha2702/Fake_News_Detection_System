import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut, Menu } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleSidebar = () => {
    console.log("Hamburger clicked!"); // Debug log
    window.dispatchEvent(new CustomEvent('toggleSidebar'));
  };

  const publicRoutes = ['/', '/login', '/register'];
  const isPublicRoute = publicRoutes.includes(location.pathname);
  const showHamburger = user && !isPublicRoute;

  console.log("Navbar render:", { user: !!user, path: location.pathname, showHamburger }); // Debug

  return (
    <nav className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50 fixed top-0 left-0 right-0 z-50 h-16">
      <div className="h-full px-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          {/* Hamburger Menu */}
          {showHamburger && (
            <button
              onClick={toggleSidebar}
              className="text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors p-2 rounded-lg"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}

          {/* Logo */}
          <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg"></div>
            <span className="text-white font-bold text-xl">DetectIQ</span>
          </Link>
        </div>

        {/* Center Navigation */}
        {!user && (
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-slate-300 hover:text-white transition-colors">
              Home
            </Link>
            <a href="/#features" className="text-slate-300 hover:text-white transition-colors">
              Features
            </a>
            <Link to="/forum" className="text-slate-300 hover:text-white transition-colors">
              About
            </Link>
            <Link to="/forum" className="text-slate-300 hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        )}

        {/* Auth Section */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden sm:inline text-slate-300 text-sm">
                {user.username}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-2 rounded-lg transition-colors text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-slate-300 hover:text-white transition-colors px-3 py-2"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};