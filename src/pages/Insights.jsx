import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Calendar, Tag, ArrowRight, Search } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import { SITE_NAME } from '../utils/constants';

// ── Placeholder articles ───────────────────────────────────────
// Replace with real database-backed content in Phase 6
const SAMPLE_ARTICLES = [
  {
    slug: 'understanding-fbr-annual-return-2025',
    category: 'Taxation',
    title: 'Understanding FBR Annual Return Filing for 2025',
    excerpt:
      'A practical guide to understanding the key deadlines, requirements, and common mistakes to avoid when filing your annual income tax return with the FBR.',
    date: '2025-09-15',
    readTime: '6 min read',
    author: '[Author Name — Placeholder]',
  },
  {
    slug: 'ifrs-updates-for-smes-pakistan',
    category: 'Accounting',
    title: 'Key IFRS Updates Affecting SMEs in Pakistan',
    excerpt:
      'An overview of the latest International Financial Reporting Standards updates and what they mean for small and medium-sized businesses operating in Pakistan.',
    date: '2025-08-28',
    readTime: '8 min read',
    author: '[Author Name — Placeholder]',
  },
  {
    slug: 'payroll-compliance-guide',
    category: 'Payroll',
    title: 'Complete Payroll Compliance Guide for Pakistan Employers',
    excerpt:
      'Everything employers need to know about EOBI contributions, PESSI obligations, income tax deductions, and maintaining clean payroll records.',
    date: '2025-07-10',
    readTime: '10 min read',
    author: '[Author Name — Placeholder]',
  },
  {
    slug: 'mergers-acquisitions-due-diligence',
    category: 'Financial Advisory',
    title: 'Why Financial Due Diligence Is Critical in M&A Transactions',
    excerpt:
      'Mergers and acquisitions carry significant financial risk. This article explores how rigorous due diligence protects buyers and sellers alike.',
    date: '2025-06-22',
    readTime: '7 min read',
    author: '[Author Name — Placeholder]',
  },
  {
    slug: 'corporate-governance-best-practices',
    category: 'Corporate',
    title: 'Corporate Governance Best Practices for Pakistani Companies',
    excerpt:
      'Good governance builds investor confidence and reduces risk. Learn the fundamentals every Pakistani company director should understand.',
    date: '2025-05-14',
    readTime: '5 min read',
    author: '[Author Name — Placeholder]',
  },
  {
    slug: 'sales-tax-common-errors',
    category: 'Taxation',
    title: 'Most Common Sales Tax Errors and How to Avoid Them',
    excerpt:
      'Sales tax compliance can be complex. We outline the errors that most frequently trigger FBR notices and explain how to stay compliant.',
    date: '2025-04-30',
    readTime: '6 min read',
    author: '[Author Name — Placeholder]',
  },
];

const CATEGORIES = ['All', 'Taxation', 'Accounting', 'Payroll', 'Financial Advisory', 'Corporate'];

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

// ── Article Card ──────────────────────────────────────────────
const ArticleCard = ({ article, featured = false }) => (
  <article className={`card group overflow-hidden hover:-translate-y-1 transition-all duration-300 ${featured ? 'lg:col-span-2' : ''}`}>
    {/* Category bar */}
    <div className="h-1 bg-gradient-to-r from-gold to-gold-400" />
    <div className={`p-8 ${featured ? 'lg:flex lg:gap-8' : ''}`}>
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-4">
          <span className="badge-gold">{article.category}</span>
          <span className="text-gray-400 text-xs flex items-center gap-1">
            <Calendar size={11} />
            {formatDate(article.date)}
          </span>
          <span className="text-gray-400 text-xs">{article.readTime}</span>
        </div>
        <h2 className={`font-heading font-bold text-navy-800 mb-3 group-hover:text-gold transition-colors duration-200 ${featured ? 'text-2xl' : 'text-xl'}`}>
          <Link to={`/insights/${article.slug}`}>{article.title}</Link>
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed">{article.excerpt}</p>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-gray-400 text-xs">{article.author}</span>
          <Link
            to={`/insights/${article.slug}`}
            className="inline-flex items-center gap-1.5 text-gold text-sm font-semibold
                       hover:gap-2.5 transition-all duration-200"
          >
            Read More <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  </article>
);

// ── Insights Page ─────────────────────────────────────────────
const Insights = () => (
  <>
    <Helmet>
      <title>Insights & Articles — {SITE_NAME}</title>
      <meta
        name="description"
        content={`Stay informed with the latest tax, accounting, and financial advisory insights from ${SITE_NAME}.`}
      />
    </Helmet>

    <PageHero
      label="Knowledge Hub"
      title="Insights & Articles"
      subtitle="Expert perspectives on taxation, accounting, and financial management to help you stay informed and ahead."
      breadcrumb={[{ label: 'Insights' }]}
    />

    {/* ── Articles ──────────────────────────────────────────── */}
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* ── Filters + Search ──────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-12">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  cat === 'All'
                    ? 'bg-gold text-navy-900'
                    : 'bg-white text-navy-700 border border-gray-200 hover:border-gold hover:text-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          {/* Search (decorative — wire to API in Phase 6) */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search articles..."
              className="pl-8 pr-4 py-2 text-sm border border-gray-200 bg-white text-navy-800
                         placeholder-gray-400 focus:outline-none focus:border-gold transition-colors
                         duration-200 w-56"
            />
          </div>
        </div>

        {/* ── Article Grid ──────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-8">
          {SAMPLE_ARTICLES.map((article, i) => (
            <ArticleCard key={article.slug} article={article} featured={i === 0} />
          ))}
        </div>

        {/* Placeholder pagination */}
        <div className="flex items-center justify-center gap-2 mt-14">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={`w-10 h-10 text-sm font-semibold transition-colors duration-200 ${
                page === 1
                  ? 'bg-gold text-navy-900'
                  : 'bg-white border border-gray-200 text-navy-700 hover:border-gold hover:text-gold'
              }`}
            >
              {page}
            </button>
          ))}
          <button className="w-10 h-10 text-sm font-semibold bg-white border border-gray-200
                             text-navy-700 hover:border-gold hover:text-gold transition-colors duration-200">
            →
          </button>
        </div>

        {/* Placeholder notice */}
        <p className="text-center text-gray-400 text-xs mt-6">
          ⚠️ Articles above are placeholder content. Real articles will be managed via the Admin Dashboard (Phase 7).
        </p>
      </div>
    </section>

    {/* ── Newsletter CTA ────────────────────────────────────── */}
    <section className="section-padding bg-navy-950">
      <div className="container-custom max-w-2xl text-center">
        <Tag className="text-gold mx-auto mb-4" size={32} />
        <h2 className="font-heading text-white text-3xl font-bold mb-4">
          Stay Up to Date
        </h2>
        <p className="text-white/50 text-base mb-8">
          Subscribe to receive the latest tax alerts and financial insights directly to your inbox.
        </p>
        {/* Wire to backend in Phase 6 */}
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-4 py-3 text-sm bg-white/5 border border-white/10 text-white
                       placeholder-white/30 focus:outline-none focus:border-gold transition-colors duration-200"
          />
          <button className="btn-primary whitespace-nowrap">
            Subscribe <ArrowRight size={14} />
          </button>
        </div>
        <p className="text-white/30 text-xs mt-4">
          Newsletter functionality will be connected to the backend in Phase 6.
        </p>
      </div>
    </section>
  </>
);

export default Insights;
