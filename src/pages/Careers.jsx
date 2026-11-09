import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Briefcase, ArrowRight, Users } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import { SITE_NAME } from '../utils/constants';

// ── Placeholder job listings ───────────────────────────────────
// Replace with real database-backed data in Phase 6
const JOBS = [
  {
    id: 'audit-associate-2025',
    title: 'Audit Associate',
    department: 'Audit & Assurance',
    type: 'Full-time',
    location: '[City — Placeholder]',
    experience: '1–3 years',
    deadline: '2025-11-30',
    summary:
      'We are looking for a motivated Audit Associate to join our Audit & Assurance team. You will assist in planning and executing audit engagements across a range of industries.',
  },
  {
    id: 'tax-consultant-2025',
    title: 'Tax Consultant',
    department: 'Taxation',
    type: 'Full-time',
    location: '[City — Placeholder]',
    experience: '2–4 years',
    deadline: '2025-11-30',
    summary:
      'We seek an experienced Tax Consultant with strong knowledge of Pakistani income tax and sales tax regulations to manage client compliance portfolios.',
  },
  {
    id: 'accounts-officer-2025',
    title: 'Accounts Officer',
    department: 'Accounting',
    type: 'Full-time',
    location: '[City — Placeholder]',
    experience: '1–2 years',
    deadline: '2025-12-15',
    summary:
      'An Accounts Officer is required to maintain client bookkeeping records, prepare financial statements, and support the senior accounting team.',
  },
  {
    id: 'internship-2026',
    title: 'Internship Program — Spring 2026',
    department: 'All Departments',
    type: 'Internship',
    location: '[City — Placeholder]',
    experience: 'Final-year or fresh graduates',
    deadline: '2026-01-31',
    summary:
      'Our structured internship program gives final-year students and fresh graduates hands-on exposure to accounting, tax, and audit practice in a professional environment.',
  },
];

const VALUES = [
  { icon: '🎓', title: 'Professional Development', desc: 'Continuous training, exam support, and structured career progression.' },
  { icon: '🤝', title: 'Collaborative Culture', desc: "A team-first environment where everyone's contribution is valued." },
  { icon: '⚖️', title: 'Work-Life Balance', desc: 'We respect your time and believe sustainable work drives better results.' },
  { icon: '🏆', title: 'Merit-Based Growth', desc: 'Your performance, not politics, determines your advancement here.' },
];

const formatDeadline = (d) =>
  new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

// ── Job Card ──────────────────────────────────────────────────
const JobCard = ({ job }) => (
  <div className="card group p-8 hover:-translate-y-1 transition-all duration-300">
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
      <div className="flex-1">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="badge-gold">{job.department}</span>
          <span className={`text-xs font-semibold px-3 py-1 uppercase tracking-wide
            ${job.type === 'Internship'
              ? 'bg-blue-50 text-blue-600'
              : 'bg-green-50 text-green-700'}`}>
            {job.type}
          </span>
        </div>
        <h2 className="font-heading text-navy-800 text-xl font-bold group-hover:text-gold transition-colors duration-200">
          {job.title}
        </h2>
        <div className="flex flex-wrap gap-4 mt-3">
          <span className="flex items-center gap-1.5 text-gray-400 text-xs">
            <MapPin size={12} /> {job.location}
          </span>
          <span className="flex items-center gap-1.5 text-gray-400 text-xs">
            <Briefcase size={12} /> {job.experience}
          </span>
          <span className="flex items-center gap-1.5 text-gray-400 text-xs">
            <Clock size={12} /> Apply by {formatDeadline(job.deadline)}
          </span>
        </div>
        <p className="text-gray-500 text-sm mt-4 leading-relaxed">{job.summary}</p>
      </div>
      <Link
        to={`/careers/${job.id}`}
        className="btn-outline-navy text-sm whitespace-nowrap self-start sm:self-center"
      >
        View Role <ArrowRight size={14} />
      </Link>
    </div>
  </div>
);

// ── Careers Page ──────────────────────────────────────────────
const Careers = () => (
  <>
    <Helmet>
      <title>Careers — {SITE_NAME}</title>
      <meta
        name="description"
        content={`Explore career opportunities at ${SITE_NAME}. Join our team of accounting, taxation, and financial advisory professionals.`}
      />
    </Helmet>

    <PageHero
      label="Join Our Team"
      title="Build Your Career With Us"
      subtitle="We are always looking for talented, ambitious individuals who share our commitment to excellence, integrity, and client service."
      breadcrumb={[{ label: 'Careers' }]}
    />

    {/* ── Why work here ─────────────────────────────────────── */}
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="section-label">Life at {SITE_NAME}</span>
          <h2 className="section-title mt-2">Why Join Us?</h2>
          <div className="gold-divider mx-auto" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map(({ icon, title, desc }) => (
            <div key={title} className="card p-8 text-center hover:-translate-y-1 transition-all duration-300">
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="font-heading text-navy-800 text-base font-bold mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Open Positions ────────────────────────────────────── */}
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
          <div>
            <span className="section-label">Open Positions</span>
            <h2 className="section-title mt-2">Current Openings</h2>
            <div className="gold-divider" />
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Users size={16} className="text-gold" />
            {JOBS.length} positions available
          </div>
        </div>

        {JOBS.length > 0 ? (
          <div className="space-y-6">
            {JOBS.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 card">
            <Users className="text-gray-300 mx-auto mb-4" size={48} />
            <h3 className="font-heading text-navy-700 text-xl font-semibold">No Openings Right Now</h3>
            <p className="text-gray-400 text-sm mt-2">
              We are not actively hiring at the moment. Send us your CV and we will keep you in mind for future roles.
            </p>
            <Link to="/contact" className="btn-navy mt-6">Send Your CV</Link>
          </div>
        )}

        <p className="text-center text-gray-400 text-xs mt-8">
          ⚠️ Job listings above are placeholder content. Real positions will be managed via the Admin Dashboard (Phase 7).
        </p>
      </div>
    </section>

    {/* ── Spontaneous Applications ──────────────────────────── */}
    <section className="section-padding bg-navy-950">
      <div className="container-custom max-w-2xl text-center">
        <h2 className="font-heading text-white text-3xl font-bold mb-4">
          Don't See a Suitable Role?
        </h2>
        <p className="text-white/50 text-base mb-8">
          We welcome proactive applications. Send us your CV and a brief note about what you're looking for.
        </p>
        <Link to="/contact" className="btn-primary">
          Send a Spontaneous Application <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  </>
);

export default Careers;
