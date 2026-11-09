import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Trash2,
  Mail,
  Phone,
  FileText,
  Check,
} from 'lucide-react';
import { AdminDataAPI } from '../../utils/adminData';
import { SITE_NAME } from '../../utils/constants';

const STATUS_OPTIONS = ['Pending', 'Reviewing', 'Shortlisted', 'Interview', 'Hired', 'Rejected'];

const AdminApplications = () => {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') || 'all';

  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [roleFilter, setRoleFilter] = useState(initialRole);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const loadData = () => {
    setApplications(AdminDataAPI.getApplications());
    setJobs(AdminDataAPI.getJobs());
  };

  useEffect(() => {
    loadData();
  }, []);

  const showFeedback = (msg) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  const handleStatusChange = (id, newStatus) => {
    AdminDataAPI.updateApplicationStatus(id, newStatus);
    loadData();
    if (selectedApp && selectedApp.id === id) {
      setSelectedApp((prev) => ({ ...prev, status: newStatus }));
    }
    showFeedback(`Applicant status updated to ${newStatus}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this application?')) {
      AdminDataAPI.deleteApplication(id);
      loadData();
      if (selectedApp && selectedApp.id === id) {
        setSelectedApp(null);
      }
      showFeedback('Application removed');
    }
  };

  const filtered = applications.filter((app) => {
    const matchRole = roleFilter === 'all' || app.jobTitle === roleFilter;
    const matchStatus = statusFilter === 'all' || app.status === statusFilter;
    const q = searchTerm.toLowerCase();
    const matchSearch =
      (app.applicantName || '').toLowerCase().includes(q) ||
      (app.email || '').toLowerCase().includes(q) ||
      (app.jobTitle || '').toLowerCase().includes(q) ||
      (app.education || '').toLowerCase().includes(q);
    return matchRole && matchStatus && matchSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Shortlisted':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">Shortlisted</span>;
      case 'Interview':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-100 text-purple-800">Interview</span>;
      case 'Reviewing':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-100 text-blue-800">Reviewing</span>;
      case 'Hired':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-teal-100 text-teal-800">Hired</span>;
      case 'Rejected':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-100 text-red-800">Rejected</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800">Pending</span>;
    }
  };

  return (
    <div className="space-y-6">
      <Helmet>
        <title>Job Applications & CV Tracking | {SITE_NAME} Admin</title>
      </Helmet>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-2xl text-navy-950">
            Applicant Tracking System
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review candidate resumes, qualification records, and recruitment stages
          </p>
        </div>
      </div>

      {feedbackMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-4 py-2.5 rounded-lg flex items-center gap-2">
          <Check size={14} className="text-emerald-600" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Status Filter */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                statusFilter === 'all' ? 'bg-navy-900 text-white font-semibold' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              All ({applications.length})
            </button>
            {STATUS_OPTIONS.map((st) => {
              const count = applications.filter((a) => a.status === st).length;
              if (count === 0) return null;
              return (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    statusFilter === st ? 'bg-navy-900 text-white font-semibold' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {st} ({count})
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search candidate name, CV..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-gold focus:bg-white text-navy-950"
            />
          </div>
        </div>

        {/* Roles Sub-filter */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-2 overflow-x-auto text-xs text-slate-600">
          <span className="font-semibold text-slate-400 shrink-0">Filter by Vacancy:</span>
          <button
            onClick={() => setRoleFilter('all')}
            className={`px-2.5 py-1 rounded text-[11px] font-medium shrink-0 ${
              roleFilter === 'all' ? 'bg-gold text-navy-950 font-bold' : 'hover:bg-slate-100'
            }`}
          >
            All Roles
          </button>
          {jobs.map((j) => (
            <button
              key={j.id}
              onClick={() => setRoleFilter(j.title)}
              className={`px-2.5 py-1 rounded text-[11px] font-medium shrink-0 ${
                roleFilter === j.title ? 'bg-gold text-navy-950 font-bold' : 'hover:bg-slate-100'
              }`}
            >
              {j.title}
            </button>
          ))}
        </div>
      </div>

      {/* Applications Table & Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className={`${selectedApp ? 'lg:col-span-7' : 'lg:col-span-12'} bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">Candidate</th>
                  <th className="py-3 px-4">Applied Role</th>
                  <th className="py-3 px-4">Experience & Edu</th>
                  <th className="py-3 px-4">Applied Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400">
                      No applications found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((item) => {
                    const isSelected = selectedApp?.id === item.id;
                    return (
                      <tr
                        key={item.id}
                        onClick={() => setSelectedApp(item)}
                        className={`hover:bg-slate-50/80 cursor-pointer transition-colors ${
                          isSelected ? 'bg-gold/10' : ''
                        }`}
                      >
                        <td className="py-3.5 px-4 font-medium text-navy-900">
                          <div>
                            <span className="font-semibold block">{item.applicantName}</span>
                            <span className="text-[11px] text-slate-400">{item.email}</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 font-medium text-slate-800">
                          {item.jobTitle}
                        </td>

                        <td className="py-3.5 px-4 text-slate-600">
                          <div>
                            <span>{item.experience || 'Not specified'}</span>
                            {item.education && (
                              <span className="text-[11px] text-slate-400 block">{item.education}</span>
                            )}
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                          {new Date(item.appliedDate).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>

                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {getStatusBadge(item.status)}
                        </td>

                        <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors"
                            title="Delete Application"
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Candidate Detail Drawer */}
        {selectedApp && (
          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/80 shadow-card p-6 space-y-5 sticky top-20">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-gold">
                  Candidate Dossier
                </span>
                <h3 className="font-heading font-bold text-lg text-navy-900">
                  {selectedApp.applicantName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Quick Contact buttons */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href={`mailto:${selectedApp.email}?subject=Interview Invitation - Nasar Consultant`}
                className="p-2.5 rounded-lg border border-slate-200 hover:border-gold hover:text-gold flex items-center justify-center gap-2 font-semibold text-navy-900 transition-colors"
              >
                <Mail size={14} className="text-gold" />
                <span>Email Candidate</span>
              </a>
              {selectedApp.phone ? (
                <a
                  href={`tel:${selectedApp.phone}`}
                  className="p-2.5 rounded-lg border border-slate-200 hover:border-gold hover:text-gold flex items-center justify-center gap-2 font-semibold text-navy-900 transition-colors"
                >
                  <Phone size={14} className="text-emerald-600" />
                  <span>Call Candidate</span>
                </a>
              ) : null}
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Applied Vacancy:</span>
                <span className="font-semibold text-navy-900 text-sm">{selectedApp.jobTitle}</span>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">Education / Qualifications:</span>
                <span className="font-medium text-slate-800">{selectedApp.education || 'N/A'}</span>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">Experience Level:</span>
                <span className="font-medium text-slate-800">{selectedApp.experience || 'N/A'}</span>
              </div>

              {selectedApp.coverLetter && (
                <div>
                  <span className="text-slate-400 block font-medium mb-1">Cover Note:</span>
                  <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3 text-slate-800 leading-relaxed max-h-40 overflow-y-auto">
                    {selectedApp.coverLetter}
                  </div>
                </div>
              )}

              <div>
                <span className="text-slate-400 block font-medium mb-1">Attached Resume / CV:</span>
                <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="flex items-center gap-2 text-slate-700">
                    <FileText size={16} className="text-gold" />
                    <span className="font-medium">{selectedApp.resumeName || 'Candidate_Resume.pdf'}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">PDF Doc</span>
                </div>
              </div>

              {/* Recruitment Stage Selector */}
              <div className="pt-2">
                <span className="text-slate-400 block font-medium mb-1.5">Change Recruitment Stage:</span>
                <div className="grid grid-cols-3 gap-1.5">
                  {STATUS_OPTIONS.map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(selectedApp.id, st)}
                      className={`px-2 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all text-center ${
                        selectedApp.status === st
                          ? 'bg-navy-900 text-gold shadow-sm'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminApplications;
