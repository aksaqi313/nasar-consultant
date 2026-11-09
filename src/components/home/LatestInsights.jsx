import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User, Tag } from 'lucide-react';

// PLACEHOLDER — these will be replaced with real DB content in Phase 6
const SAMPLE_ARTICLES = [
  {
    id: 1,
    slug: 'understanding-corporate-tax-obligations',
    title: 'Understanding Corporate Tax Obligations in 2025',
    excerpt:
      'A comprehensive overview of key corporate tax obligations, deadlines, and strategies for businesses to maintain compliance and optimize their tax position.',
    category: 'Taxation',
    author: '[Author Name]',
    date: 'October 20, 2025',
  },
  {
    id: 2,
    slug: 'financial-reporting-standards-update',
    title: 'Key Changes in Financial Reporting Standards',
    excerpt:
      'An analysis of recent updates to financial reporting standards and their implications for businesses preparing annual financial statements.',
    category: 'Audit & Assurance',
    author: '[Author Name]',
    date: 'October 15, 2025',
  },
  {
    id: 3,
    slug: 'small-business-bookkeeping-best-practices',
    title: 'Bookkeeping Best Practices for Small Businesses',
    excerpt:
      'Essential bookkeeping practices that every small business should follow to maintain accurate financial records and support growth.',
    category: 'Accounting',
    author: '[Author Name]',
    date: 'October 10, 2025',
  },
];

const ArticleCard = ({ slug, title, excerpt, category, author, date }) => (
  <Link
    to={`/insights/${slug}`}
    className="card group flex flex-col h-full overflow-hidden
               hover:-translate-y-2 transition-all duration-300"
  >
    {/* Color bar at top */}
    <div className="h-1 bg-gradient-to-r from-navy-800 to-gold
                    group-hover:from-gold group-hover:to-gold-400
                    transition-all duration-300" />

    <div className="p-7 flex flex-col flex-1">
      {/* Category badge */}
      <span className="badge-gold w-fit mb-4">{category}</span>

      {/* Title */}
      <h3 className="font-sans font-bold text-navy-800 text-lg mb-3 leading-snug
                    group-hover:text-gold transition-colors duration-200 line-clamp-2">
        {title}
      </h3>

      {/* Excerpt */}
      <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-5 line-clamp-3">
        {excerpt}
      </p>

      {/* Meta */}
      <div className="flex items-center gap-4 pt-4 border-t border-gray-100
                      text-gray-400 text-xs">
        <span className="flex items-center gap-1.5">
          <User size={12} /> {author}
        </span>
        <span className="flex items-center gap-1.5">
          <Calendar size={12} /> {date}
        </span>
      </div>
    </div>
  </Link>
);

const LatestInsights = () => (
  <section className="section-padding bg-gray-50">
    <div className="container-custom">
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
        <div>
          <span className="section-label">Knowledge & Updates</span>
          <h2 className="section-title mt-2">
            Latest{' '}
            <span className="text-gradient-gold">Insights</span>
          </h2>
          <div className="gold-divider" />
          <p className="section-subtitle mt-4 max-w-xl">
            Stay informed with our latest articles on taxation, compliance,
            financial management, and industry trends.
          </p>
        </div>
        <Link
          to="/insights"
          className="btn-outline-navy self-start md:self-auto flex-shrink-0"
        >
          View All Insights
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* ── Article Grid ───────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {SAMPLE_ARTICLES.map((article) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </div>
    </div>
  </section>
);

export default LatestInsights;
