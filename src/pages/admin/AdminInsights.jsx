import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  Check,
  Calendar,
  ExternalLink,
} from 'lucide-react';
import { AdminDataAPI } from '../../utils/adminData';
import { SITE_NAME } from '../../utils/constants';

const CATEGORIES = [
  'Taxation',
  'Accounting',
  'Audit & Assurance',
  'Financial Advisory',
  'Payroll',
  'Corporate Secretarial',
];

const AdminInsights = () => {
  const [insights, setInsights] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const [form, setForm] = useState({
    title: '',
    slug: '',
    category: 'Taxation',
    author: 'Nasar Advisory Team',
    readTime: '5 min read',
    excerpt: '',
    content: '',
    status: 'published',
  });

  const loadData = () => {
    setInsights(AdminDataAPI.getInsights());
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
      category: 'Taxation',
      author: 'Nasar Advisory Team',
      readTime: '5 min read',
      excerpt: '',
      content: '',
      status: 'published',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setForm({
      title: item.title || '',
      slug: item.slug || '',
      category: item.category || 'Taxation',
      author: item.author || 'Nasar Advisory Team',
      readTime: item.readTime || '5 min read',
      excerpt: item.excerpt || '',
      content: item.content || '',
      status: item.status || 'published',
    });
    setModalOpen(true);
  };

  const handleTitleChange = (val) => {
    setForm((prev) => ({
      ...prev,
      title: val,
      // Auto-generate slug if not editing an existing slug manually
      slug: !editingItem ? val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : prev.slug,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      alert('Please provide an article title.');
      return;
    }

    if (editingItem) {
      AdminDataAPI.updateInsight(editingItem.id, form);
      showFeedback('Article updated successfully');
    } else {
      AdminDataAPI.createInsight(form);
      showFeedback('New article published successfully');
    }

    setModalOpen(false);
    loadData();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this publication?')) {
      AdminDataAPI.deleteInsight(id);
      loadData();
      showFeedback('Article deleted');
    }
  };

  const handleToggleStatus = (item) => {
    const newStatus = item.status === 'published' ? 'draft' : 'published';
    AdminDataAPI.updateInsight(item.id, { status: newStatus });
    loadData();
    showFeedback(`Article changed to ${newStatus}`);
  };

  const filtered = insights.filter((item) => {
    const matchCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const q = searchTerm.toLowerCase();
    const matchSearch =
      (item.title || '').toLowerCase().includes(q) ||
      (item.excerpt || '').toLowerCase().includes(q) ||
      (item.author || '').toLowerCase().includes(q);
    return matchCategory && matchSearch;
  });

  return (
    <div className="space-y-6">
      <Helmet>
        <title>Insights & Publications CMS | {SITE_NAME} Admin</title>
      </Helmet>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-2xl text-navy-950">
            Insights & Publications
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Author and publish articles on Pakistani tax regulations, corporate law, and accounting standards
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-lg bg-gold hover:bg-gold-400 text-navy-950 font-semibold text-xs transition-colors flex items-center gap-2 shadow-sm self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>New Publication</span>
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
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              categoryFilter === 'all'
                ? 'bg-navy-900 text-white font-semibold'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Categories ({insights.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = insights.filter((i) => i.category === cat).length;
            if (count === 0) return null;
            return (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  categoryFilter === cat
                    ? 'bg-navy-900 text-white font-semibold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        <div className="relative w-full md:w-64">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-gold focus:bg-white text-navy-950"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <div className="col-span-full bg-white p-12 text-center rounded-xl border border-slate-200 text-slate-400 text-xs">
            No publications found matching your query.
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200/80 shadow-2xs hover:shadow-card transition-shadow flex flex-col justify-between overflow-hidden"
            >
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gold/15 text-gold-700 border border-gold/30">
                    {item.category}
                  </span>
                  <button
                    onClick={() => handleToggleStatus(item)}
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full transition-colors ${
                      item.status === 'published'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.status}
                  </button>
                </div>

                <h3 className="font-heading font-bold text-base text-navy-900 line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {item.excerpt || item.content}
                </p>

                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {item.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye size={12} /> {item.views || 0} reads
                  </span>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                <a
                  href={`/insights/${item.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-600 hover:text-gold flex items-center gap-1 font-medium"
                >
                  <ExternalLink size={13} />
                  <span>View</span>
                </a>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 text-navy-800 hover:text-gold rounded hover:bg-slate-200 transition-colors"
                    title="Edit Publication"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded hover:bg-red-50 transition-colors"
                    title="Delete Publication"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Editor Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 animate-slide-up">
            <div className="bg-navy-900 text-white p-5 flex items-center justify-between sticky top-0 z-10">
              <h3 className="font-heading font-bold text-lg">
                {editingItem ? 'Edit Publication' : 'Create New Publication'}
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
                <label className="block font-semibold text-navy-900 mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g., Guide to Corporate Income Tax Deductions for 2026"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-gold focus:bg-white text-navy-950 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-navy-900 mb-1">
                    Slug / URL Path
                  </label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="guide-to-corporate-income-tax"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-gold focus:bg-white text-navy-950"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-navy-900 mb-1">
                    Category *
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-gold focus:bg-white text-navy-950 font-medium"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-navy-900 mb-1">
                    Author
                  </label>
                  <input
                    type="text"
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-gold focus:bg-white text-navy-950"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-navy-900 mb-1">
                    Reading Time
                  </label>
                  <input
                    type="text"
                    value={form.readTime}
                    onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                    placeholder="e.g., 5 min read"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-gold focus:bg-white text-navy-950"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-navy-900 mb-1">
                    Publication Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-gold focus:bg-white text-navy-950 font-medium"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-navy-900 mb-1">
                  Summary / Excerpt
                </label>
                <textarea
                  rows={2}
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  placeholder="Short introductory summary displayed on listing cards..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-gold focus:bg-white text-navy-950"
                />
              </div>

              <div>
                <label className="block font-semibold text-navy-900 mb-1">
                  Full Article Body
                </label>
                <textarea
                  rows={8}
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="Write the full publication content here. Markdown headings and bullet points are supported..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-gold focus:bg-white text-navy-950 font-mono text-xs"
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
                  {editingItem ? 'Save Changes' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInsights;
