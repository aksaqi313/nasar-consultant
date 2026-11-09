import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Plus,
  Edit2,
  Check,
  ExternalLink,
} from 'lucide-react';
import { AdminDataAPI } from '../../utils/adminData';
import { SITE_NAME } from '../../utils/constants';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const [form, setForm] = useState({
    title: '',
    slug: '',
    desc: '',
    active: true,
  });

  const loadData = () => {
    setServices(AdminDataAPI.getServices());
  };

  useEffect(() => {
    loadData();
  }, []);

  const showFeedback = (msg) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  const handleOpenCreate = () => {
    setEditingItem(null);
    setForm({
      title: '',
      slug: '',
      desc: '',
      active: true,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setForm({
      title: item.title || '',
      slug: item.slug || '',
      desc: item.desc || '',
      active: item.active !== false,
    });
    setModalOpen(true);
  };

  const handleTitleChange = (val) => {
    setForm((prev) => ({
      ...prev,
      title: val,
      slug: !editingItem ? val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : prev.slug,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      alert('Please provide a practice area title.');
      return;
    }

    if (editingItem) {
      AdminDataAPI.updateService(editingItem.id, form);
      showFeedback('Service updated successfully');
    } else {
      AdminDataAPI.createService(form);
      showFeedback('New practice area created');
    }

    setModalOpen(false);
    loadData();
  };

  const handleToggleActive = (item) => {
    const newActive = !item.active;
    AdminDataAPI.updateService(item.id, { active: newActive });
    loadData();
    showFeedback(`Practice area ${newActive ? 'activated' : 'deactivated'}`);
  };

  return (
    <div className="space-y-6">
      <Helmet>
        <title>Services & Practice Areas | {SITE_NAME} Admin</title>
      </Helmet>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-2xl text-navy-950">
            Practice Areas & Services
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure the firm's core corporate advisory, taxation, and assurance services
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-lg bg-gold hover:bg-gold-400 text-navy-950 font-semibold text-xs transition-colors flex items-center gap-2 shadow-sm self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Add Practice Area</span>
        </button>
      </div>

      {feedbackMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-4 py-2.5 rounded-lg flex items-center gap-2">
          <Check size={14} className="text-emerald-600" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-slate-200/80 shadow-2xs hover:shadow-card transition-shadow flex flex-col justify-between overflow-hidden"
          >
            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-navy-900 text-gold flex items-center justify-center font-bold text-sm">
                  {item.title.substring(0, 2).toUpperCase()}
                </div>

                <button
                  onClick={() => handleToggleActive(item)}
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full transition-colors ${
                    item.active
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {item.active ? 'Active' : 'Inactive'}
                </button>
              </div>

              <div>
                <h3 className="font-heading font-bold text-base text-navy-900">
                  {item.title}
                </h3>
                <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                  /services/{item.slug}
                </p>
              </div>

              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {item.desc || 'Comprehensive professional advisory and implementation services tailored to client corporate requirements.'}
              </p>
            </div>

            <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
              <a
                href={`/services/${item.slug}`}
                target="_blank"
                rel="noreferrer"
                className="text-slate-600 hover:text-gold flex items-center gap-1 font-medium"
              >
                <ExternalLink size={13} />
                <span>View Page</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-1.5 text-navy-800 hover:text-gold rounded hover:bg-slate-200 transition-colors"
                  title="Edit Practice Area"
                >
                  <Edit2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 animate-slide-up">
            <div className="bg-navy-900 text-white p-5 flex items-center justify-between">
              <h3 className="font-heading font-bold text-lg">
                {editingItem ? 'Edit Practice Area' : 'New Practice Area'}
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
                <label className="block font-semibold text-navy-900 mb-1">Service Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g., Forensic Audit & Litigation Support"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-gold focus:bg-white text-navy-950 font-medium"
                />
              </div>

              <div>
                <label className="block font-semibold text-navy-900 mb-1">Slug / URL</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="forensic-audit-litigation"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-gold focus:bg-white text-navy-950"
                />
              </div>

              <div>
                <label className="block font-semibold text-navy-900 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={form.desc}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                  placeholder="Concise overview of what this practice encompasses..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-gold focus:bg-white text-navy-950"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="activeService"
                  checked={form.active}
                  onChange={(e) => setForm({ ...form, active: e.target.checked })}
                  className="w-4 h-4 text-gold rounded border-slate-300 focus:ring-gold"
                />
                <label htmlFor="activeService" className="font-semibold text-navy-900">
                  Active (Visible on public website)
                </label>
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
                  {editingItem ? 'Save Changes' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;
