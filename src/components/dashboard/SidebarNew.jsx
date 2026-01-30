import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Home, Search, Users, HelpCircle, Settings, LogOut, Code, Briefcase, FileText, Headset } from "lucide-react";

const SidebarNew = ({ isOpen, onClose, isExpanded, onToggleExpand, onLogout }) => {
  const location = useLocation();

  const isActive = (paths) => {
    if (Array.isArray(paths)) {
      return paths.some(path => {
        if (path === "/dashboard") {
          return location.pathname === "/dashboard" || location.pathname === "/";
        }
        return location.pathname === path || location.pathname.startsWith(path + "/");
      });
    }
    const path = paths;
    if (path === "/dashboard") {
      return location.pathname === "/dashboard" || location.pathname === "/";
    }
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const menuItems = [
    { path: "/dashboard", icon: Home, label: "Home" },
    { path: "/practice", icon: Code, label: "Practice" },
    { path: "/jobs", icon: Briefcase, label: "Jobs" },
    { path: "/notes", icon: FileText, label: "Notes" },
    { path: "/profile", icon: Users, label: "Profile" },
    { path: "/support", icon: Headset, label: "Support" },
  ];

  const isMobile = window.innerWidth < 768;

  const filteredMenuItems = menuItems.filter(item => {
    if (item.label === "Profile") return isMobile;
    return true;
  });

  const showLabels = isExpanded || (isMobile && isOpen);
  const sidebarWidth = showLabels ? "w-60" : "w-[64px]";

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-screen bg-[#3631A4] z-[60] transition-all duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          } ${sidebarWidth} flex flex-col py-4 shadow-2xl md:rounded-none rounded-r-[30px]`}
      >
        {/* Top Menu Icon */}
        <div className={`mb-10 w-full flex ${showLabels ? "px-6 justify-start" : "justify-center"}`}>
          <button
            onClick={() => {
              if (isMobile) {
                onClose();
              } else {
                onToggleExpand();
              }
            }}
            className="p-2 text-white/80 hover:text-white transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-2 w-full flex-1">
          {filteredMenuItems.map((item, index) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={index}
                to={item.path}
                onClick={() => {
                  if (isMobile) {
                    onClose();
                  }
                }}
                className={`relative w-full h-[52px] flex items-center transition-all duration-300 group ${showLabels ? "px-6 gap-4" : "justify-center"
                  } ${active
                    ? "bg-white text-[#3631A4] shadow-lg shadow-black/10"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
              >
                <Icon className={`${showLabels ? 'h-5 w-5' : 'h-4 w-4'} flex-shrink-0 transition-transform duration-300 ${active ? 'scale-100' : 'group-hover:scale-110'}`} />

                {showLabels && (
                  <span className="text-sm font-semibold whitespace-nowrap overflow-hidden">
                    {item.label}
                  </span>
                )}

                {/* Tooltip - Only when collapsed */}
                {!showLabels && (
                  <div className="absolute left-full ml-4 px-3 py-1.5 bg-[#1a1a1a] text-white text-[11px] font-medium rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-xl border border-white/10 pointer-events-none">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}

          {/* Logout Button at Bottom - Only on Mobile */}
          {isMobile && (
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className={`mt-auto relative w-full h-[52px] flex items-center transition-all duration-300 group ${showLabels ? "px-6 gap-4" : "justify-center"
                } text-red-400 hover:bg-white/5 mb-4`}
            >
              <LogOut className="h-5 w-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />

              <span className="text-sm font-semibold whitespace-nowrap overflow-hidden">
                Logout
              </span>
            </button>
          )}
        </nav>
      </aside>
    </>
  );
};

export default SidebarNew;
