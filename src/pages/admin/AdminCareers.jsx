import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Users,
  Check,
} from 'lucide-react';
import { AdminDataAPI } from '../../utils/adminData';
import { SITE_NAME } from '../../utils/constants';

const DEPARTMENTS = [
  'Audit & Assurance',
  'Taxation',
  'Accounting',
  'Financial Advisory',
  'Corporate Secretarial',
  'All Departments',
];

const JOB_TYPES = ['Full-time', 'Part-time', 'Internship', 'Contract'];

const AdminCareers = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const [form, setForm] = useState({
    title: '',
    department: 'Audit & Assurance',
    type: 'Full-time',
    location: 'Lahore / On-site',
    experience: '1–3 years',
    deadline: '',
    summary: '',
    status: 'active',
  });

  const loadData = () => {
    setJobs(AdminDataAPI.getJobs());
    setApplications(AdminDataAPI.getApplications());
  };

  useEffect(() => {
    loadData();
  }, []);

  const showFeedback = (msg) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  const handleOpenCreate = () => {
    setEditingJob(null);
    setForm({
      title: '',
      department: 'Audit & Assurance',
      type: 'Full-time',
      location: 'Lahore / On-site',
      experience: '1–3 years',
      deadline: '2026-06-30',
      summary: '',
      status: 'active',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (job) => {
    setEditingJob(job);
    setForm({
      title: job.title || '',
      department: job.department || 'Audit & Assurance',
      type: job.type || 'Full-time',
      location: job.location || 'Lahore / On-site',
      experience: job.experience || '1–3 years',
      deadline: job.deadline || '',
      summary: job.summary || '',
      status: job.status || 'active',
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      alert('Please provide a job title.');
      return;
    }

    if (editingJob) {
      AdminDataAPI.updateJob(editingJob.id, form);
      showFeedback('Job vacancy updated successfully');
    } else {
      AdminDataAPI.createJob(form);
      showFeedback('New job vacancy posted successfully');
    }

    setModalOpen(false);
    loadData();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this job listing?')) {
      AdminDataAPI.deleteJob(id);
      loadData();
      showFeedback('Job vacancy deleted');
    }
  };

  const handleToggleStatus = (job) => {
    const newStatus = job.status === 'active' ? 'closed' : 'active';
    AdminDataAPI.updateJob(job.id, { status: newStatus });
    loadData();
    showFeedback(`Job status changed to ${newStatus}`);
  };

  const filtered = jobs.filter((job) => {
    const matchDept = deptFilter === 'all' || job.department === deptFilter;
    const q = searchTerm.toLowerCase();
    const matchSearch =
      (job.title || '').toLowerCase().includes(q) ||
      (job.department || '').toLowerCase().includes(q) ||
      (job.summary || '').toLowerCase().includes(q);
    return matchDept && matchSearch;
  });

  return (
    <div className="space-y-6">
      <Helmet>
        <title>Careers & Vacancies | {SITE_NAME} Admin</title>
      </Helmet>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-2xl text-navy-950">
            Careers & Vacancies
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage practice openings, student internships, and professional roles
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-lg bg-gold hover:bg-gold-400 text-navy-950 font-semibold text-xs transition-colors flex items-center gap-2 shadow-sm self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Post New Vacancy</span>
        </button>
      </div>

      {feedbackMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-4 py-2.5 rounded-lg flex items-center gap-2">
          <Check size={14} className="text-emerald-600" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => setDeptFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              deptFilter === 'all' ? 'bg-navy-900 text-white font-semibold' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Roles ({jobs.length})
          </button>
          {DEPARTMENTS.map((dept) => {
            const count = jobs.filter((j) => j.department === dept).length;
            if (count === 0) return null;
            return (
              <button
                key={dept}
                onClick={() => setDeptFilter(dept)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  deptFilter === dept ? 'bg-navy-900 text-white font-semibold' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {dept} ({count})
              </button>
            );
          })}
        </div>

        <div className="relative w-full md:w-64">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search job postings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-gold focus:bg-white text-navy-950"
          />
        </div>
      </div>

      {/* Job Postings Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Role & Department</th>
                <th className="py-3 px-4">Type & Location</th>
                <th className="py-3 px-4">Experience</th>
                <th className="py-3 px-4">Deadline</th>
                <th className="py-3 px-4">Applicants</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No job postings found.
                  </td>
                </tr>
              ) : (
                filtered.map((job) => {
                  const applicantCount = applications.filter((a) => a.jobId === job.id || a.jobTitle === job.title).length;
                  return (
                    <tr key={job.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-navy-900">
                        <div>
                          <span className="font-semibold block text-sm">{job.title}</span>
                          <span className="text-[11px] text-slate-500">{job.department}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-600">
                        <div>
                          <span className="font-medium block">{job.type}</span>
                          <span className="text-[11px] text-slate-400">{job.location}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-600">
                        {job.experience}
                      </td>

                      <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                        {job.deadline || 'Open'}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <Link
                          to={`/admin/applications?role=${encodeURIComponent(job.title)}`}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-semibold text-[11px] hover:bg-indigo-100"
                        >
                          <Users size={12} />
                          <span>{applicantCount} CVs</span>
                        </Link>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <button
                          onClick={() => handleToggleStatus(job)}
                          className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full transition-colors ${
                            job.status === 'active'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {job.status}
                        </button>
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleOpenEdit(job)}
                            className="p-1.5 text-navy-800 hover:text-gold rounded hover:bg-slate-100 transition-colors"
                            title="Edit Vacancy"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(job.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded hover:bg-red-50 transition-colors"
                            title="Delete Vacancy"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vacancy Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 animate-slide-up">
            <div className="bg-navy-900 text-white p-5 flex items-center justify-between sticky top-0 z-10">
              <h3 className="font-heading font-bold text-lg">
                {editingJob ? 'Edit Vacancy' : 'Post New Vacancy'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-navy-900 mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g., Senior Tax Consultant"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-gold focus:bg-white text-navy-950 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-navy-900 mb-1">Department</label>
                  <select
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-gold focus:bg-white text-navy-950 font-medium"
                  >
                    {DEPARTMENTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-navy-900 mb-1">Employment Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-gold focus:bg-white text-navy-950 font-medium"
                  >
                    {JOB_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-navy-900 mb-1">Location / Workplace</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="e.g. Lahore / On-site"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-gold focus:bg-white text-navy-950"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-navy-900 mb-1">Experience Required</label>
                  <input
                    type="text"
                    value={form.experience}
                    onChange={(e) => setForm({ ...form, experience: e.target.value })}
                    placeholder="e.g. 2–4 years"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-gold focus:bg-white text-navy-950"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-navy-900 mb-1">Application Deadline</label>
                  <input
                    type="date"
                    value={form.deadline}
                    onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-gold focus:bg-white text-navy-950"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-navy-900 mb-1">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-gold focus:bg-white text-navy-950 font-medium"
                  >
                    <option value="active">Active (Accepting Applications)</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-navy-900 mb-1">Role Summary & Requirements</label>
                <textarea
                  rows={4}
                  value={form.summary}
                  onChange={(e) => setForm({ ...form, summary: e.target.value })}
                  placeholder="Provide responsibilities, required qualifications (e.g. CA, ACCA, B.Com), and perks..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-gold focus:bg-white text-navy-950"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-navy-800 hover:bg-navy-900 text-white font-semibold shadow-xs"
                >
                  {editingJob ? 'Save Changes' : 'Post Vacancy'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCareers;
