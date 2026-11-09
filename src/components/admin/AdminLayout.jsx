import { useState, useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Mail,
  FileText,
  Briefcase,
  Users,
  Sliders,
  Palette,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Bell,
  ChevronRight,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { AdminDataAPI } from '../../utils/adminData';
import { SITE_NAME } from '../../utils/constants';

const AdminLayout = () => {
  const { user, logout } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [pendingAppsCount, setPendingAppsCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Load badge counters
  const refreshCounts = () => {
    const inquiries = AdminDataAPI.getInquiries();
    const newInqs = inquiries.filter((i) => i.status === 'new');
    setUnreadCount(newInqs.length);

    const apps = AdminDataAPI.getApplications();
    const pending = apps.filter((a) => a.status === 'Pending' || a.status === 'Reviewing');
    setPendingAppsCount(pending.length);

    // Format top 4 recent notifications
    const recentNotifs = [
      ...newInqs.slice(0, 3).map((item) => ({
        id: item.id,
        type: 'inquiry',
        title: `New Inquiry from ${item.firstName} ${item.lastName}`,
        detail: item.service || item.subject,
        time: item.createdAt,
        path: '/admin/messages',
      })),
      ...pending.slice(0, 2).map((item) => ({
        id: item.id,
        type: 'application',
        title: `New CV: ${item.applicantName}`,
        detail: item.jobTitle,
        time: item.appliedDate,
        path: '/admin/applications',
      })),
    ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 5);

    setNotifications(recentNotifs);
  };

  useEffect(() => {
    refreshCounts();
    // Re-check periodically or on location change
    const interval = setInterval(refreshCounts, 15000);
    return () => clearInterval(interval);
  }, [location.pathname]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setShowNotifications(false);
  }, [location.pathname]);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out of the Admin Portal?')) {
      logout();
      navigate('/admin/login');
    }
  };

  const navItems = [
    {
      to: '/admin',
      label: 'Dashboard',
      icon: LayoutDashboard,
      exact: true,
    },
    {
      to: '/admin/messages',
      label: 'Inquiries & Messages',
      icon: Mail,
      badge: unreadCount > 0 ? unreadCount : null,
      badgeColor: 'bg-gold text-navy-950 font-bold',
    },
    {
      to: '/admin/insights',
      label: 'Insights & Articles',
      icon: FileText,
    },
    {
      to: '/admin/careers',
      label: 'Job Postings',
      icon: Briefcase,
    },
    {
      to: '/admin/applications',
      label: 'Job Applications',
      icon: Users,
      badge: pendingAppsCount > 0 ? pendingAppsCount : null,
      badgeColor: 'bg-blue-500 text-white font-medium',
    },
    {
      to: '/admin/services',
      label: 'Services & Practice',
      icon: Sliders,
    },
    {
      to: '/admin/home',
      label: 'Home Page Design',
      icon: Palette,
    },
    {
      to: '/admin/settings',
      label: 'Firm Settings',
      icon: Settings,
    },
  ];

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/admin') return 'Executive Dashboard';
    if (path === '/admin/messages') return 'Inquiries & Client Messages';
    if (path === '/admin/insights') return 'Insights & Publications';
    if (path === '/admin/careers') return 'Careers & Vacancies';
    if (path === '/admin/applications') return 'Applicant Tracking System';
    if (path === '/admin/services') return 'Firm Practice Areas';
    if (path === '/admin/home') return 'Home Page Content & Visual Customizer';
    if (path === '/admin/settings') return 'Firm Profile & Admin Settings';
    return 'Admin Management';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-800 antialiased selection:bg-gold/30 selection:text-navy-950">
      {/* ── Mobile Header Bar ── */}
      <header className="md:hidden bg-navy-950 text-white px-4 py-3 flex items-center justify-between border-b border-navy-800 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gold flex items-center justify-center font-heading font-bold text-navy-950 text-base shadow-sm">
            N
          </div>
          <div>
            <span className="font-heading font-bold text-sm tracking-wide text-white block">
              {SITE_NAME}
            </span>
            <span className="text-[10px] text-gold tracking-wider uppercase font-semibold">
              Admin Portal
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-300 hover:text-gold relative rounded-md transition-colors"
            title="Notifications"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-gold rounded-full animate-pulse" />
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-200 hover:text-white rounded-md bg-navy-900 border border-navy-800"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* ── Backdrop for Mobile Drawer ── */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-navy-950/70 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* ── Sidebar Navigation ── */}
      <aside
        className={`fixed md:sticky top-0 bottom-0 left-0 z-50 w-72 bg-navy-950 text-white flex flex-col justify-between border-r border-navy-900 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } shadow-2xl md:shadow-none h-screen`}
      >
        {/* Brand Header */}
        <div>
          <div className="p-6 border-b border-navy-900 flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-3.5 group">
              <div className="w-10 h-10 bg-gold flex items-center justify-center text-navy-950 font-heading font-bold text-lg shadow-gold/20 shadow-md group-hover:scale-105 transition-transform">
                N
              </div>
              <div>
                <h1 className="font-heading font-bold text-base tracking-wide text-white leading-tight">
                  {SITE_NAME}
                </h1>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] text-gold-400 font-medium tracking-wider uppercase">
                    Admin Portal
                  </span>
                </div>
              </div>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden text-slate-400 hover:text-white p-1"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-220px)] custom-scrollbar">
            <div className="px-3 py-2 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
              Management
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? location.pathname === item.to
                : location.pathname.startsWith(item.to);

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.exact}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-gold text-navy-950 shadow-sm font-semibold'
                      : 'text-slate-300 hover:bg-navy-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} className={isActive ? 'text-navy-950' : 'text-gold/80'} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-navy-950 text-white' : item.badgeColor
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}

            <div className="pt-4 px-3 py-2 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
              Quick Links
            </div>

            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between px-3.5 py-2 rounded-lg text-sm text-slate-300 hover:bg-navy-900 hover:text-gold transition-colors"
            >
              <div className="flex items-center gap-3">
                <ExternalLink size={16} className="text-gold/70" />
                <span>View Public Website</span>
              </div>
              <ChevronRight size={14} className="text-slate-500" />
            </a>
          </nav>
        </div>

        {/* User Profile & Sign Out at bottom */}
        <div className="p-4 border-t border-navy-900 bg-navy-950/80">
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-navy-900/80 border border-navy-800">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center font-bold text-gold text-xs shrink-0">
                {user?.avatar || 'NC'}
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold text-white truncate">{user?.name || 'Admin'}</p>
                <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-1.5 text-slate-400 hover:text-red-400 rounded-md hover:bg-red-500/10 transition-colors shrink-0"
              title="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Desktop Top Header Bar */}
        <header className="hidden md:flex bg-white border-b border-slate-200 h-16 px-8 items-center justify-between sticky top-0 z-30 shadow-xs">
          {/* Breadcrumb & Title */}
          <div className="flex items-center gap-3">
            <h2 className="font-heading font-bold text-lg text-navy-900">
              {getPageTitle()}
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-emerald-600" /> Verified Admin
            </span>
          </div>

          {/* Action Bar */}
          <div className="flex items-center gap-4">
            <button
              onClick={refreshCounts}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-navy-800 px-2.5 py-1.5 rounded-md hover:bg-slate-100 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw size={14} />
              <span>Sync</span>
            </button>

            {/* Notification Dropdown Trigger */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-slate-500 hover:text-navy-900 hover:bg-slate-100 rounded-full transition-colors"
                title="Notifications"
              >
                <Bell size={19} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-gold rounded-full ring-2 ring-white" />
                )}
              </button>

              {/* Notification Popover */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in">
                  <div className="px-4 py-3 bg-navy-950 text-white flex items-center justify-between">
                    <span className="font-semibold text-xs uppercase tracking-wider text-gold">
                      Recent Activity
                    </span>
                    <span className="text-[11px] text-slate-300">
                      {unreadCount} unread messages
                    </span>
                  </div>

                  <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-xs text-slate-400">
                        No new notifications. Everything is up to date!
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <Link
                          key={notif.id}
                          to={notif.path}
                          onClick={() => setShowNotifications(false)}
                          className="p-3 hover:bg-slate-50 block text-xs transition-colors"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-semibold text-navy-900 line-clamp-1">
                              {notif.title}
                            </span>
                            <span className="text-[10px] text-slate-400 shrink-0">
                              {new Date(notif.time).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                          <p className="text-slate-500 mt-0.5 line-clamp-1">{notif.detail}</p>
                        </Link>
                      ))
                    )}
                  </div>

                  <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
                    <Link
                      to="/admin/messages"
                      onClick={() => setShowNotifications(false)}
                      className="text-xs text-navy-800 hover:text-gold font-semibold"
                    >
                      View All Messages &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Public Site Link */}
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-lg border border-slate-200 text-navy-800 hover:border-gold hover:text-gold transition-colors bg-white shadow-2xs"
            >
              <span>Public Website</span>
              <ExternalLink size={13} />
            </a>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs font-medium text-red-600 hover:text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Child Page Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
