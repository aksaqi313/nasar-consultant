import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { Calendar, Clock, Tag, ArrowLeft, ArrowRight, Share2 } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import { SITE_NAME } from '../utils/constants';

// ── Full article data ──────────────────────────────────────────
// In Phase 6 this will be replaced by an API call to the backend
const ARTICLES = {
  'understanding-fbr-annual-return-2025': {
    title: 'Understanding FBR Annual Return Filing for 2025',
    category: 'Taxation',
    date: '2025-09-15',
    readTime: '6 min read',
    author: '[Author Name — Placeholder]',
    authorTitle: '[Author Title — Placeholder]',
    content: `
      <p>Filing your annual income tax return with the Federal Board of Revenue (FBR) is a legal obligation for all eligible taxpayers in Pakistan. Yet, many individuals and businesses miss deadlines or make errors that lead to penalties and unnecessary complications.</p>
      <h2>Who Must File?</h2>
      <p>Under the Income Tax Ordinance 2001, every individual, association of persons (AOP), and company with taxable income above the threshold is required to file an annual income tax return. Additionally, the law requires certain categories of individuals to file regardless of income level, including property owners, vehicle owners, and members of professional bodies.</p>
      <h2>Key Deadlines</h2>
      <p>[PLACEHOLDER — Insert verified FBR deadlines for the current tax year. Deadlines change annually and must be confirmed from official FBR notices before publication.]</p>
      <h2>Documents Required</h2>
      <ul>
        <li>CNIC copy</li>
        <li>Bank statements for the tax year</li>
        <li>Salary certificates / employment letters</li>
        <li>Property purchase / sale deeds</li>
        <li>Business income and expense records</li>
        <li>Foreign remittance certificates (if applicable)</li>
      </ul>
      <h2>Common Mistakes to Avoid</h2>
      <p>Many taxpayers make errors that result in FBR notices. The most frequent include: understating income, omitting foreign assets, missing withholding tax certificates, and filing after the deadline without an extension.</p>
      <h2>How Nasar Consultant Can Help</h2>
      <p>Our tax specialists manage the entire return filing process on your behalf — from gathering documents to submission on the IRIS portal — ensuring accuracy and timely compliance. <a href="/contact">Contact us</a> to get started.</p>
    `,
  },
};

// Fallback for articles not yet fully written
const PLACEHOLDER_ARTICLE = {
  title: '[Article Title — Placeholder]',
  category: 'Insights',
  date: '2025-01-01',
  readTime: '— min read',
  author: '[Author Name — Placeholder]',
  authorTitle: '[Author Title — Placeholder]',
  content: `<p>This article is a placeholder. Full content will be added via the Admin Dashboard once the backend is implemented in Phase 7. All published articles will be stored in the database and managed by authorized administrators.</p>`,
};

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

// ── InsightDetail Page ────────────────────────────────────────
const InsightDetail = () => {
  const { slug } = useParams();
  const article = ARTICLES[slug] || { ...PLACEHOLDER_ARTICLE, title: `[Article: ${slug}]` };

  return (
    <>
      <Helmet>
        <title>{article.title} — {SITE_NAME}</title>
        <meta name="description" content={article.title} />
      </Helmet>

      <PageHero
        label={article.category}
        title={article.title}
        breadcrumb={[
          { label: 'Insights', path: '/insights' },
          { label: article.category },
        ]}
      />

      {/* ── Article Content ───────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Main article */}
            <div className="lg:col-span-2">
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-gray-100">
                <span className="badge-gold">{article.category}</span>
                <span className="flex items-center gap-1.5 text-gray-400 text-xs">
                  <Calendar size={12} /> {formatDate(article.date)}
                </span>
                <span className="flex items-center gap-1.5 text-gray-400 text-xs">
                  <Clock size={12} /> {article.readTime}
                </span>
                <button
                  className="ml-auto flex items-center gap-1.5 text-gray-400 hover:text-gold
                             text-xs transition-colors duration-200"
                  aria-label="Share article"
                >
                  <Share2 size={13} /> Share
                </button>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-gold font-bold text-sm">N</span>
                </div>
                <div>
                  <div className="text-navy-800 font-semibold text-sm">{article.author}</div>
                  <div className="text-gray-400 text-xs">{article.authorTitle}</div>
                </div>
              </div>

              {/* Body */}
              <div
                className="prose prose-navy max-w-none
                           prose-headings:font-heading prose-headings:text-navy-800
                           prose-p:text-gray-600 prose-p:leading-relaxed
                           prose-li:text-gray-600 prose-a:text-gold
                           prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Back link */}
              <div className="mt-12 pt-8 border-t border-gray-100">
                <Link
                  to="/insights"
                  className="inline-flex items-center gap-2 text-navy-700 hover:text-gold
                             text-sm font-medium transition-colors duration-200"
                >
                  <ArrowLeft size={14} /> Back to All Insights
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Tags */}
              <div className="card p-6">
                <h3 className="font-heading text-navy-800 text-base font-bold mb-4 flex items-center gap-2">
                  <Tag size={14} className="text-gold" /> Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Taxation', 'Accounting', 'Compliance', 'FBR', 'SECP', 'IFRS', 'Payroll'].map((t) => (
                    <button
                      key={t}
                      className="badge-gold cursor-pointer hover:bg-gold hover:text-navy-900 transition-colors duration-200"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-navy text-white p-8">
                <h3 className="font-heading text-xl font-bold mb-3">Need Expert Advice?</h3>
                <p className="text-white/60 text-sm mb-6 leading-relaxed">
                  Our specialists are ready to help you navigate complex financial and tax matters.
                </p>
                <Link to="/contact" className="btn-primary w-full justify-center">
                  Contact Us <ArrowRight size={14} />
                </Link>
              </div>

              {/* More insights */}
              <div className="card p-6">
                <h3 className="font-heading text-navy-800 text-base font-bold mb-4">More Insights</h3>
                <ul className="space-y-4">
                  {[
                    { slug: 'ifrs-updates-for-smes-pakistan', title: 'Key IFRS Updates Affecting SMEs in Pakistan' },
                    { slug: 'payroll-compliance-guide', title: 'Complete Payroll Compliance Guide' },
                    { slug: 'corporate-governance-best-practices', title: 'Corporate Governance Best Practices' },
                  ].map((related) => (
                    <li key={related.slug}>
                      <Link
                        to={`/insights/${related.slug}`}
                        className="text-sm text-navy-700 hover:text-gold transition-colors duration-200
                                   border-b border-gray-50 pb-4 block leading-snug"
                      >
                        {related.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default InsightDetail;
