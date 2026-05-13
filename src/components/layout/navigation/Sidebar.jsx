import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Bell, Moon, Sun, Check, Menu, X, LogOut, User as UserIcon, LogIn, Settings, Mail, ChevronDown } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { useToast } from '../../../context/ToastContext';
import { useAuth } from '../../../context/AuthContext';
import ApiUsageDropdown from '../../ui/ApiUsageDropdown';
import NotificationsDropdown from '../../ui/NotificationsDropdown';
import PreferencesModal from '../../ui/PreferencesModal';

const Sidebar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const rawRole = user?.role || 'Guest';
  // Normalize role for robust conditional rendering (case-insensitive)
  const activeRole = rawRole.toLowerCase().replace(/\s+/g, ''); 
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showApiUsage, setShowApiUsage] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { isDarkMode, toggleTheme } = useTheme();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const userRef = useRef(null);
  const apiRef = useRef(null);
  const notifRef = useRef(null);
  const prefRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userRef.current && !userRef.current.contains(event.target)) setShowUserDropdown(false);
      if (apiRef.current && !apiRef.current.contains(event.target)) setShowApiUsage(false);
      if (notifRef.current && !notifRef.current.contains(event.target)) setShowNotifications(false);
      if (prefRef.current && !prefRef.current.contains(event.target)) setShowPreferences(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const roles = [
    { id: 'superadmin', title: 'Super Admin', desc: 'Platform owner — global system oversight and billing', icon: '👑' },
    { id: 'admin', title: 'Company Admin', desc: 'Brokerage administrator — manages team, quotas, and company settings', icon: '🏢' },
    { id: 'agent', title: 'Listing Agent', desc: 'Active team member managing property listings', icon: '🏡' },
    { id: 'owner', title: 'Listing Owner', desc: 'Brokerage owner viewing company-wide metrics and reports', icon: '🔑' },
  ];

  const mainNav = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Listings', path: '/listings' },
    { name: 'Favs', path: '/favs' },
    { name: 'Collections', path: '/collections' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Ops', path: '/ops' },
    { name: 'Market', path: '/market' },
    { name: 'Dev', path: '/developers' },
    { name: 'Tools', path: '/tools' },
    ...((activeRole === 'admin' || activeRole === 'superadmin') ? [
      { 
        name: 'Admin', 
        path: activeRole === 'superadmin' ? '/admin' : `/my-company/${user?.company?.slug || user?.company_slug || 'dashboard'}` 
      }
    ] : []),
    ...(activeRole === 'superadmin' ? [{ name: 'Tickets', path: '/tickets' }] : []),
  ];

  // Shared active class logic for NavLink
  const navLinkClass = ({ isActive }) =>
    `px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors whitespace-nowrap ${isActive
      ? 'bg-[#ccab59]/10 text-[#a38847] dark:text-[#ccab59]'
      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-[#111424] dark:hover:text-gray-200'
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `flex items-center w-full px-3 py-2.5 rounded-xl text-[14px] font-medium text-left transition-colors mb-1 ${isActive
      ? 'bg-[#ccab59]/10 text-[#a38847] dark:text-[#ccab59]'
      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
    }`;

  // Home link needs exact matching so it doesn't highlight on every route
  const isHomeEnd = (path) => path === '/';

  return (
    <>
      {/* ── MAIN NAVBAR ── */}
      <div className="w-full bg-[#fcfbfa] dark:bg-[#0a0d14] border-b border-[#e5dfce] dark:border-gray-800/80 px-4 py-1.5 flex items-center transition-colors sticky top-0 z-40 gap-4">

        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 cursor-pointer flex-shrink-0"
        >
          <div className="flex items-center justify-center w-7 h-7 rounded bg-[#ccab59] text-white font-serif font-bold text-base">V</div>
          <span className="font-serif font-bold text-[#ccab59] tracking-widest text-base hidden sm:block">VORTEXWEB</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 overflow-x-auto no-scrollbar flex-1 py-1">
          {mainNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={isHomeEnd(item.path)}
              className={navLinkClass}
              onClick={() => {
                if (['Market', 'Tools', 'Tickets'].includes(item.name)) {
                  addToast(`${item.name} is coming soon!`, "info");
                }
              }}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Right Tools */}
        <div className="hidden md:flex items-center gap-3 pl-3 border-l border-[#e5dfce] dark:border-gray-800/80 flex-shrink-0">
          {/* API Usage */}
          <div className="relative" ref={apiRef}>
            <button
              onClick={() => setShowApiUsage(!showApiUsage)}
              className="px-3 py-1 rounded-full bg-[#ebfbf3] dark:bg-emerald-500/10 text-[#10b981] dark:text-emerald-500 text-[11px] font-bold border border-[#d1f5e2] dark:border-emerald-500/20 hover:bg-[#d1f5e2] dark:hover:bg-emerald-500/20 transition-colors whitespace-nowrap"
            >
              0/1800
            </button>
            {showApiUsage && <ApiUsageDropdown />}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-1.5 text-gray-400 hover:text-[#111424] hover:bg-gray-100 rounded-lg transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-[#fcfbfa] flex items-center justify-center text-[8px] font-bold text-white">3</div>
              </button>
              {showNotifications && <NotificationsDropdown />}
            </div>

            {/* Profile Dropdown Styled as Super Admin */}
            <div className="relative" ref={userRef}>
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-2 px-3 py-1.5 bg-[#fff8e6] dark:bg-[#ccab59]/10 border border-[#f0e6d2] dark:border-[#ccab59]/20 rounded-lg text-slate-800 dark:text-[#ccab59] hover:bg-[#f8eed8] dark:hover:bg-[#ccab59]/20 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-[12px]">
                   👑
                </div>
                <span className="text-[12px] font-bold">Super Admin</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${showUserDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showUserDropdown && isAuthenticated && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-[#1a1c29] border border-[#e5dfce] dark:border-gray-800 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] py-2 z-50">
                  <div className="px-4 py-3 border-b border-[#e5dfce] dark:border-gray-800 mb-2">
                    <div className="flex items-center gap-3 mb-2">
                      <img src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} className="w-8 h-8 rounded-full border shadow-sm bg-white" alt="Avatar" />
                      <div>
                        <div className="text-gray-800 dark:text-gray-200 font-bold text-sm">{user.name}</div>
                        <div className="text-[10px] text-[#ccab59] font-bold uppercase tracking-widest leading-none mt-0.5">{user.role}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 opacity-80 mt-2">
                      <Mail className="w-3.5 h-3.5" />
                      <span className="truncate max-w-[180px]">{user.email}</span>
                    </div>
                  </div>
                  <div className="px-3 pb-1">
                    <button
                      onClick={() => { logout(); setShowUserDropdown(false); }}
                      className="w-full flex items-center justify-center gap-2 py-2 bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 text-rose-500 border border-rose-100 dark:border-rose-500/20 rounded-xl text-[12px] font-bold transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={toggleTheme}
              className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <div className="relative" ref={prefRef}>
              <button
                onClick={() => setShowPreferences(!showPreferences)}
                className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
              {showPreferences && <PreferencesModal onClose={() => setShowPreferences(false)} />}
            </div>
          </div>
        </div>

        {/* Mobile: theme + hamburger */}
        <div className="flex md:hidden items-center gap-1 ml-auto">
          <button onClick={toggleTheme} className="p-1.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors">
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── MOBILE DRAWER ── */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-30 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative ml-auto w-72 max-w-[85vw] h-full bg-[#fcfbfa] dark:bg-[#0a0d14] border-l border-[#e5dfce] dark:border-gray-800/80 flex flex-col overflow-y-auto shadow-2xl">

            {/* Role Display */}
            <div className="p-4 border-b border-[#e5dfce] dark:border-gray-800/80">
              <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-3 font-bold uppercase tracking-wider">Current Role</p>
              <div className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-left transition-colors mb-1 bg-white text-gray-700 border border-[#e5dfce] dark:bg-[#141929] dark:text-gray-300 dark:border-gray-800">
                <span className="text-lg">{roles.find((r) => r.id.toLowerCase().replace(/\s+/g, '') === activeRole)?.icon || '👤'}</span>
                <span className="text-[13px] font-semibold capitalize">{rawRole}</span>
              </div>
            </div>

            {/* Nav Links */}
            <div className="p-4 flex-1">
              <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-3 font-bold uppercase tracking-wider">Navigation</p>
              {mainNav.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={isHomeEnd(item.path)}
                  className={mobileNavLinkClass}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (['Market', 'Tools', 'Tickets'].includes(item.name)) {
                      addToast(`${item.name} is coming soon!`, "info");
                    }
                  }}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            {/* Bottom actions */}
            <div className="p-4 border-t border-[#e5dfce] dark:border-gray-800/80 flex items-center gap-2">
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 text-sm transition-colors relative">
                <Bell className="w-4 h-4" />
                <span>Alerts</span>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[8px] font-bold text-white">3</div>
              </button>
              <button
                onClick={() => { setShowPreferences(true); setMobileMenuOpen(false); }}
                className="p-2 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 transition-colors"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>

            <div className="px-4 pb-6 text-[12px] text-gray-400">
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <img src={user.avatar} className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-800" alt="Avatar" />
                  <div>
                    <p className="font-semibold text-gray-600 dark:text-gray-300 leading-none mb-1">{user.name}</p>
                    <p className="text-[10px] opacity-70">{user.email}</p>
                    <button onClick={logout} className="text-rose-500 font-bold mt-1 text-[11px] hover:underline">Logout</button>
                  </div>
                </div>
              ) : (
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold">
                  <LogIn className="w-4 h-4" /> Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Preferences modal outside drawer */}
      {showPreferences && !mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-end pt-16 pr-4">
          <div ref={prefRef}>
            <PreferencesModal onClose={() => setShowPreferences(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
