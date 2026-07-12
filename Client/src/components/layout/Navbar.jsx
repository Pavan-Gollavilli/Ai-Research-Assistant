import { useState, useRef, useEffect } from "react";
import { Bell, Menu, User, LogOut, ChevronDown, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = ({ onMenuClick }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");

  const firstName = currentUser?.name?.split(" ")[0] || "User";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      // Ignored in prod
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/research/history?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/80 px-4 sm:px-8 backdrop-blur-md">

      <div className="flex items-center gap-4 flex-1">
        {/* Mobile Hamburger Menu */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden rounded-xl p-2 text-slate-500 hover:bg-slate-100 transition"
          aria-label="Open sidebar"
        >
          <Menu size={24} />
        </button>

        {/* Global Search */}
        <form onSubmit={handleSearch} className="hidden sm:flex items-center w-full max-w-md relative group">
          <Search size={18} className="absolute left-3 text-slate-400 group-focus-within:text-blue-500 transition-colors pointer-events-none" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search reports, insights..." 
            className="w-full bg-slate-50 hover:bg-slate-100 focus:bg-white border border-transparent focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-full py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 transition-all outline-none"
          />
        </form>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">

        {/* Notifications */}
        <button className="relative rounded-full p-2.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600">
          <Bell size={20} />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full border-2 border-white bg-red-500" />
        </button>

        <div className="h-8 w-px bg-slate-200 hidden sm:block" />

        {/* User Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1 pr-3 shadow-sm transition hover:bg-slate-50 hover:shadow"
          >
            <img
              src={currentUser?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(firstName)}&background=eff6ff&color=2563eb`}
              alt={firstName}
              className="h-8 w-8 rounded-full object-cover"
            />
            <span className="hidden text-sm font-medium text-slate-700 sm:block">
              {firstName}
            </span>
            <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-slate-100 bg-white p-1.5 shadow-modal animate-scale-in">
              <div className="border-b border-slate-100 px-3 py-2.5 mb-1">
                <p className="text-sm font-semibold text-slate-800 truncate">{currentUser?.name}</p>
                <p className="text-xs text-slate-500 truncate">{currentUser?.email}</p>
              </div>
              
              <Link 
                to="/profile"
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition"
              >
                <User size={16} />
                My Profile
              </Link>
              
              <button 
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition mt-1"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          )}
        </div>

      </div>

    </header>
  );
};

export default Navbar;