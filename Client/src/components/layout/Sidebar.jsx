import {
  LayoutDashboard,
  FilePlus2,
  History,
  User,
  LogOut,
  Brain,
  X
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ onClose }) => {
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth();

  const menu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "New Research",
      icon: FilePlus2,
      path: "/research/create",
    },
    {
      name: "History",
      icon: History,
      path: "/research/history",
    },
    {
      name: "Profile",
      icon: User,
      path: "/profile",
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      // Ignored in prod
    }
  };

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  return (
    <div className="flex h-full w-full flex-col border-r border-slate-100 bg-white shadow-sm">

      {/* Logo */}
      <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
            <Brain size={22} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800 leading-tight">
              AI Research
            </h1>
            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
              Workspace
            </p>
          </div>
        </div>
        
        {/* Mobile Close Button */}
        <button 
          onClick={onClose}
          className="lg:hidden rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-6 flex-1 space-y-1 px-4 overflow-y-auto">
        <p className="px-2 mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Main Menu</p>
        
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 font-medium ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon 
                    size={18} 
                    className={isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600 transition-colors"} 
                  />
                  <span>{item.name}</span>
                  {isActive && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-600" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User Area & Logout */}
      <div className="border-t border-slate-100 p-4">
        {currentUser && (
          <div className="mb-4 flex items-center gap-3 px-2">
            <img 
              src={currentUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name || 'User')}&background=dbeafe&color=1d4ed8`}
              alt={currentUser.name}
              className="h-10 w-10 rounded-full border border-slate-200"
            />
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-semibold text-slate-800">{currentUser.name}</p>
              <p className="truncate text-xs text-slate-500">{currentUser.email}</p>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-700 group"
        >
          <LogOut size={18} className="text-slate-400 group-hover:text-red-500 transition-colors" />
          <span>Sign Out</span>
        </button>
      </div>

    </div>
  );
};

export default Sidebar;