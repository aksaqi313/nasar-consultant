import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Mail,
  Search,
  Trash2,
  Download,
  Phone,
  Save,
  Check,
} from 'lucide-react';
import { AdminDataAPI } from '../../utils/adminData';
import { SITE_NAME } from '../../utils/constants';

const AdminMessages = () => {
  const [inquiries, setInquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [notesInput, setNotesInput] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const loadData = () => {
    const list = AdminDataAPI.getInquiries();
    setInquiries(list);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (selectedInquiry) {
      setNotesInput(selectedInquiry.notes || '');
    }
  }, [selectedInquiry]);

  const showFeedback = (msg) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  const handleStatusChange = (id, newStatus) => {
    AdminDataAPI.updateInquiry(id, { status: newStatus });
    loadData();
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry((prev) => ({ ...prev, status: newStatus }));
    }
    showFeedback(`Inquiry status updated to ${newStatus}`);
  };

  const handleSaveNotes = () => {
    if (!selectedInquiry) return;
    AdminDataAPI.updateInquiry(selectedInquiry.id, { notes: notesInput });
    loadData();
    setSelectedInquiry((prev) => ({ ...prev, notes: notesInput }));
    showFeedback('Internal note saved successfully');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      AdminDataAPI.deleteInquiry(id);
      loadData();
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry(null);
      }
      showFeedback('Inquiry deleted');
    }
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Date', 'First Name', 'Last Name', 'Email', 'Phone', 'Service', 'Subject', 'Status', 'Message'];
    const rows = inquiries.map((i) => [
      i.id,
      new Date(i.createdAt).toISOString(),
      `"${i.firstName}"`,
      `"${i.lastName}"`,
      `"${i.email}"`,
      `"${i.phone || ''}"`,
      `"${i.service || ''}"`,
      `"${(i.subject || '').replace(/"/g, '""')}"`,
      i.status,
      `"${(i.message || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `nasar_inquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showFeedback('Inquiries exported to CSV');
  };

  // Filter inquiries
  const filtered = inquiries.filter((item) => {
    const matchStatus = statusFilter === 'all' || item.status === statusFilter;
    const q = searchTerm.toLowerCase();
    const matchSearch =
      (item.firstName || '').toLowerCase().includes(q) ||
      (item.lastName || '').toLowerCase().includes(q) ||
      (item.email || '').toLowerCase().includes(q) ||
      (item.subject || '').toLowerCase().includes(q) ||
      (item.service || '').toLowerCase().includes(q) ||
      (item.message || '').toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'new':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200 uppercase tracking-wider">
            New
          </span>
        );
      case 'in-progress':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200 uppercase tracking-wider">
            In Progress
          </span>
        );
      case 'resolved':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase tracking-wider">
            Resolved
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 uppercase tracking-wider">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      <Helmet>
        <title>Client Inquiries & Messages | {SITE_NAME} Admin</title>
      </Helmet>

      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-2xl text-navy-950">
            Inquiries & Client Messages
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage incoming contact queries, tax advice leads, and advisory requests
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-2 shadow-2xs transition-colors"
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {feedbackMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-4 py-2.5 rounded-lg flex items-center gap-2">
          <Check size={14} className="text-emerald-600" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {[
            { id: 'all', label: 'All Inquiries', count: inquiries.length },
            { id: 'new', label: 'New', count: inquiries.filter((i) => i.status === 'new').length },
            { id: 'in-progress', label: 'In Progress', count: inquiries.filter((i) => i.status === 'in-progress').length },
            { id: 'resolved', label: 'Resolved', count: inquiries.filter((i) => i.status === 'resolved').length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                statusFilter === tab.id
                  ? 'bg-navy-900 text-white font-semibold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  statusFilter === tab.id ? 'bg-gold text-navy-950 font-bold' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search inquiries, client name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-gold focus:bg-white text-navy-950"
          />
        </div>
      </div>

      {/* Inquiries Table & Detail Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Inquiries List */}
        <div className={`${selectedInquiry ? 'lg:col-span-7' : 'lg:col-span-12'} bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4">Service & Subject</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400">
                      No inquiries match the current search or filter.
                    </td>
                  </tr>
                ) : (
                  filtered.map((item) => {
                    const isSelected = selectedInquiry?.id === item.id;
                    return (
                      <tr
                        key={item.id}
                        onClick={() => setSelectedInquiry(item)}
                        className={`hover:bg-slate-50/80 cursor-pointer transition-colors ${
                          isSelected ? 'bg-gold/10' : ''
                        }`}
                      >
                        <td className="py-3.5 px-4 font-medium text-navy-900">
                          <div>
                            <span className="font-semibold block">{item.firstName} {item.lastName}</span>
                            <span className="text-[11px] text-slate-400">{item.email}</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 max-w-xs">
                          <span className="font-medium text-slate-800 block truncate">{item.subject || item.service}</span>
                          <span className="text-[11px] text-gold font-semibold">{item.service}</span>
                        </td>

                        <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                          {new Date(item.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>

                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {getStatusBadge(item.status)}
                        </td>

                        <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors"
                            title="Delete Inquiry"
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

        {/* Inquiry Detail Panel */}
        {selectedInquiry && (
          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/80 shadow-card p-6 space-y-5 sticky top-20">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-gold">
                  Inquiry Details
                </span>
                <h3 className="font-heading font-bold text-lg text-navy-900">
                  {selectedInquiry.firstName} {selectedInquiry.lastName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Quick Contact buttons */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href={`mailto:${selectedInquiry.email}?subject=RE: ${selectedInquiry.subject || 'Consultation Inquiry - Nasar Consultant'}`}
                className="p-2.5 rounded-lg border border-slate-200 hover:border-gold hover:text-gold flex items-center justify-center gap-2 font-semibold text-navy-900 transition-colors"
              >
                <Mail size={14} className="text-gold" />
                <span>Reply via Email</span>
              </a>
              {selectedInquiry.phone ? (
                <a
                  href={`tel:${selectedInquiry.phone}`}
                  className="p-2.5 rounded-lg border border-slate-200 hover:border-gold hover:text-gold flex items-center justify-center gap-2 font-semibold text-navy-900 transition-colors"
                >
                  <Phone size={14} className="text-emerald-600" />
                  <span>Call Client</span>
                </a>
              ) : (
                <div className="p-2.5 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center text-center">
                  No phone provided
                </div>
              )}
            </div>

            {/* Message Details */}
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Practice / Service Area:</span>
                <span className="font-semibold text-navy-900 text-sm">{selectedInquiry.service || 'General Practice'}</span>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">Subject Line:</span>
                <span className="font-medium text-slate-800">{selectedInquiry.subject || 'N/A'}</span>
              </div>

              <div>
                <span className="text-slate-400 block font-medium mb-1">Client Message:</span>
                <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3 text-slate-800 leading-relaxed max-h-56 overflow-y-auto">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Status Switcher */}
              <div className="pt-2">
                <span className="text-slate-400 block font-medium mb-1.5">Update Status:</span>
                <div className="flex gap-2">
                  {['new', 'in-progress', 'resolved'].map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(selectedInquiry.id, st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                        selectedInquiry.status === st
                          ? 'bg-navy-900 text-gold shadow-sm'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Internal Admin Note */}
              <div className="pt-3 border-t border-slate-100">
                <span className="text-slate-400 block font-medium mb-1.5">
                  Internal Notes (Not visible to client):
                </span>
                <textarea
                  rows={3}
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  placeholder="e.g., Spoke with client. Arranging introductory meeting with Senior Tax Partner..."
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-gold focus:bg-white text-navy-900"
                />
                <button
                  onClick={handleSaveNotes}
                  className="mt-2 px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-900 text-white font-semibold text-xs flex items-center gap-1.5"
                >
                  <Save size={13} />
                  <span>Save Note</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
