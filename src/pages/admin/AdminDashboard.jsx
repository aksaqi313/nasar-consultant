import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Mail,
  FileText,
  Briefcase,
  Users,
  ArrowUpRight,
  Eye,
  PlusCircle,
  Building,
  ChevronRight,
  ShieldAlert,
  Palette,
} from 'lucide-react';
import { AdminDataAPI } from '../../utils/adminData';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { SITE_NAME } from '../../utils/constants';

const AdminDashboard = () => {
  const { user } = useAdminAuth();
  const [inquiries, setInquiries] = useState([]);
  const [insights, setInsights] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const loadAllData = () => {
    setInquiries(AdminDataAPI.getInquiries());
    setInsights(AdminDataAPI.getInsights());
    setJobs(AdminDataAPI.getJobs());
    setApplications(AdminDataAPI.getApplications());
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const newInquiries = inquiries.filter((i) => i.status === 'new');
  const activeJobs = jobs.filter((j) => j.status === 'active');
  const publishedInsights = insights.filter((i) => i.status === 'published');
  const pendingApps = applications.filter((a) => a.status === 'Pending' || a.status === 'Reviewing');

  const totalViews = insights.reduce((acc, curr) => acc + (curr.views || 0), 0);

  const handleStatusChange = (id, newStatus) => {
    AdminDataAPI.updateInquiry(id, { status: newStatus });
    loadAllData();
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry((prev) => ({ ...prev, status: newStatus }));
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <Helmet>
        <title>Admin Dashboard | {SITE_NAME}</title>
      </Helmet>

      {/* ── Welcome Banner ── */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-navy">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 text-gold text-xs font-semibold mb-3 border border-gold/30">
              <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
              Real-time Administrative Control
            </div>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-white">
              Welcome back, {user?.name || 'Managing Partner'}
            </h1>
            <p className="text-slate-300 text-sm mt-1.5 max-w-2xl leading-relaxed">
              Track client inquiries, manage financial publications, review job candidates, and administer your firm's practice portal in real time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/admin/insights"
              className="px-4 py-2.5 rounded-lg bg-gold hover:bg-gold-400 text-navy-950 font-semibold text-xs transition-colors flex items-center gap-2 shadow-sm"
            >
              <PlusCircle size={15} />
              <span>New Insight</span>
            </Link>
            <Link
              to="/admin/careers"
              className="px-4 py-2.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-white font-medium text-xs transition-colors border border-navy-700 flex items-center gap-2"
            >
              <Briefcase size={15} className="text-gold" />
              <span>Post Vacancy</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── KPI Metrics Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Inquiries */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs hover:shadow-card transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Inquiries
            </span>
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Mail size={19} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-heading font-bold text-navy-900">
              {inquiries.length}
            </span>
            {newInquiries.length > 0 && (
              <span className="text-xs font-semibold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full">
                {newInquiries.length} unread
              </span>
            )}
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>{inquiries.filter((i) => i.status === 'resolved').length} resolved</span>
            <Link to="/admin/messages" className="text-gold font-semibold hover:underline flex items-center">
              View <ChevronRight size={13} />
            </Link>
          </div>
        </div>

        {/* Card 2: Insights */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs hover:shadow-card transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Publications
            </span>
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <FileText size={19} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-heading font-bold text-navy-900">
              {publishedInsights.length}
            </span>
            <span className="text-xs font-medium text-slate-500">
              of {insights.length} total
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Eye size={13} className="text-slate-400" /> {totalViews.toLocaleString()} reads
            </span>
            <Link to="/admin/insights" className="text-gold font-semibold hover:underline flex items-center">
              Manage <ChevronRight size={13} />
            </Link>
          </div>
        </div>

        {/* Card 3: Active Jobs */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs hover:shadow-card transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Open Vacancies
            </span>
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Briefcase size={19} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-heading font-bold text-navy-900">
              {activeJobs.length}
            </span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
              Hiring
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>{jobs.length - activeJobs.length} closed</span>
            <Link to="/admin/careers" className="text-gold font-semibold hover:underline flex items-center">
              Careers <ChevronRight size={13} />
            </Link>
          </div>
        </div>

        {/* Card 4: Applications */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs hover:shadow-card transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              CVs Received
            </span>
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <Users size={19} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-heading font-bold text-navy-900">
              {applications.length}
            </span>
            {pendingApps.length > 0 && (
              <span className="text-xs font-semibold text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded-full">
                {pendingApps.length} pending
              </span>
            )}
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>{applications.filter((a) => a.status === 'Shortlisted').length} shortlisted</span>
            <Link to="/admin/applications" className="text-gold font-semibold hover:underline flex items-center">
              Review <ChevronRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Two Column Layout: Recent Inquiries & Recent Applications ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Inquiries List */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="font-heading font-bold text-base text-navy-900">
                Recent Inquiries & Leads
              </h2>
              <p className="text-xs text-slate-500">
                Direct inquiries from the website contact page
              </p>
            </div>
            <Link
              to="/admin/messages"
              className="text-xs text-navy-800 hover:text-gold font-semibold flex items-center gap-1"
            >
              View All ({inquiries.length}) <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {inquiries.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-sm">
                No inquiries submitted yet.
              </div>
            ) : (
              inquiries.slice(0, 5).map((inquiry) => (
                <div
                  key={inquiry.id}
                  className="p-4 sm:p-5 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="font-semibold text-sm text-navy-950">
                        {inquiry.firstName} {inquiry.lastName}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          inquiry.status === 'new'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : inquiry.status === 'in-progress'
                            ? 'bg-blue-100 text-blue-800 border border-blue-200'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        }`}
                      >
                        {inquiry.status}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {new Date(inquiry.createdAt).toLocaleDateString([], {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>

                    <p className="text-xs font-medium text-slate-700">
                      {inquiry.subject || inquiry.service}
                    </p>
                    <p className="text-xs text-slate-500 line-clamp-1 max-w-xl">
                      {inquiry.message}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      onClick={() => setSelectedInquiry(inquiry)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-gold hover:text-gold text-xs font-medium text-slate-700 bg-white shadow-2xs transition-colors"
                    >
                      Quick View
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Col: Recent Applications & Shortcuts */}
        <div className="space-y-6">
          {/* Quick Actions Panel */}
          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs">
            <h3 className="font-heading font-bold text-sm text-navy-900 mb-3">
              Administrative Shortcuts
            </h3>
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <Link
                to="/admin/home"
                className="col-span-2 p-3 rounded-lg border border-gold/40 bg-gold/5 hover:bg-gold/10 text-navy-950 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <Palette size={18} className="text-gold" />
                  <div>
                    <span className="font-bold block">Customize Home Page</span>
                    <span className="text-[10px] text-slate-500">Edit headline, subtitle, hero background & stats</span>
                  </div>
                </div>
                <ChevronRight size={15} className="text-gold" />
              </Link>
              <Link
                to="/admin/insights"
                className="p-3 rounded-lg border border-slate-200 hover:border-gold hover:bg-slate-50 text-navy-900 transition-colors flex flex-col gap-1.5"
              >
                <FileText size={18} className="text-gold" />
                <span className="font-semibold">Write Article</span>
                <span className="text-[10px] text-slate-500">Tax & audit updates</span>
              </Link>
              <Link
                to="/admin/careers"
                className="p-3 rounded-lg border border-slate-200 hover:border-gold hover:bg-slate-50 text-navy-900 transition-colors flex flex-col gap-1.5"
              >
                <Briefcase size={18} className="text-blue-600" />
                <span className="font-semibold">Post Vacancy</span>
                <span className="text-[10px] text-slate-500">Recruit team members</span>
              </Link>
              <Link
                to="/admin/services"
                className="p-3 rounded-lg border border-slate-200 hover:border-gold hover:bg-slate-50 text-navy-900 transition-colors flex flex-col gap-1.5"
              >
                <Building size={18} className="text-emerald-600" />
                <span className="font-semibold">Practice Areas</span>
                <span className="text-[10px] text-slate-500">Manage services</span>
              </Link>
              <Link
                to="/admin/settings"
                className="p-3 rounded-lg border border-slate-200 hover:border-gold hover:bg-slate-50 text-navy-900 transition-colors flex flex-col gap-1.5"
              >
                <ShieldAlert size={18} className="text-indigo-600" />
                <span className="font-semibold">Firm Settings</span>
                <span className="text-[10px] text-slate-500">Contact & security</span>
              </Link>
            </div>
          </div>

          {/* Recent CVs Received */}
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-heading font-bold text-sm text-navy-900">
                Latest Candidates
              </h3>
              <Link to="/admin/applications" className="text-xs text-gold font-semibold hover:underline">
                View All
              </Link>
            </div>

            <div className="p-3 divide-y divide-slate-100">
              {applications.slice(0, 4).map((app) => (
                <div key={app.id} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-navy-900">{app.applicantName}</p>
                    <p className="text-[11px] text-slate-500">{app.jobTitle}</p>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      app.status === 'Shortlisted'
                        ? 'bg-emerald-100 text-emerald-800'
                        : app.status === 'Interview'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick View Modal for Inquiry ── */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 animate-slide-up">
            <div className="bg-navy-900 text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-gold uppercase tracking-wider font-semibold">
                  Client Inquiry
                </span>
                <h3 className="font-heading font-bold text-base mt-0.5">
                  {selectedInquiry.firstName} {selectedInquiry.lastName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-slate-400 hover:text-white text-sm p-1 rounded-md"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-slate-400 block mb-0.5">Email</span>
                  <a href={`mailto:${selectedInquiry.email}`} className="text-navy-900 font-semibold hover:text-gold">
                    {selectedInquiry.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Phone</span>
                  <a href={`tel:${selectedInquiry.phone}`} className="text-navy-900 font-semibold hover:text-gold">
                    {selectedInquiry.phone || 'N/A'}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Service Requested</span>
                  <span className="text-navy-900 font-semibold">{selectedInquiry.service || 'General'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Received At</span>
                  <span className="text-slate-700">{new Date(selectedInquiry.createdAt).toLocaleString()}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">Message</span>
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 leading-relaxed max-h-48 overflow-y-auto">
                  {selectedInquiry.message}
                </div>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">Update Status</span>
                <div className="flex gap-2">
                  {['new', 'in-progress', 'resolved'].map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(selectedInquiry.id, st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                        selectedInquiry.status === st
                          ? 'bg-navy-900 text-gold shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
              <Link
                to="/admin/messages"
                className="text-xs text-navy-800 hover:text-gold font-semibold"
              >
                Open Full Messages Page &rarr;
              </Link>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-1.5 rounded-lg bg-navy-800 text-white text-xs font-semibold hover:bg-navy-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
