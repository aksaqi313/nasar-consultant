import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ClipboardCheck, FileText, BookOpen,
  TrendingUp, Building2, Receipt,
} from 'lucide-react';

const SERVICE_CARDS = [
  {
    icon: ClipboardCheck,
    title: 'Audit & Assurance',
    slug: 'audit-assurance',
    description:
      'Independent and objective audit services to enhance the credibility of your financial information and ensure regulatory compliance.',
  },
  {
    icon: Receipt,
    title: 'Taxation Services',
    slug: 'taxation-services',
    description:
      'Comprehensive tax planning, compliance, and advisory services to help you navigate complex tax regulations efficiently.',
  },
  {
    icon: BookOpen,
    title: 'Accounting & Bookkeeping',
    slug: 'accounting-bookkeeping',
    description:
      'Accurate and timely accounting and bookkeeping solutions to maintain your financial records with precision and clarity.',
  },
  {
    icon: TrendingUp,
    title: 'Financial Advisory',
    slug: 'financial-advisory',
    description:
      'Strategic financial guidance to support informed decision-making, business growth, and long-term value creation.',
  },
  {
    icon: Building2,
    title: 'Corporate Secretarial',
    slug: 'corporate-secretarial',
    description:
      'Professional corporate secretarial services to ensure your company meets its governance and statutory obligations.',
  },
  {
    icon: FileText,
    title: 'Payroll Services',
    slug: 'payroll-services',
    description:
      'Reliable payroll management solutions to ensure accurate, timely compensation and regulatory compliance for your workforce.',
  },
];

const ServiceCard = ({ icon: Icon, title, slug, description, index }) => (
  <Link
    to={`/services/${slug}`}
    className="card group p-7 flex flex-col h-full
               hover:-translate-y-2 transition-all duration-300"
  >
    {/* Icon box */}
    <div className="w-14 h-14 bg-navy-50 flex items-center justify-center mb-5
                    group-hover:bg-navy-800 transition-colors duration-300">
      <Icon
        size={26}
        className="text-navy-800 group-hover:text-gold transition-colors duration-300"
      />
    </div>

    {/* Content */}
    <h3 className="font-sans font-bold text-navy-800 text-lg mb-3">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed flex-1">{description}</p>

    {/* Link indicator */}
    <div className="flex items-center gap-2 mt-5 text-gold text-sm font-semibold
                    opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1
                    transition-all duration-300">
      Learn More <ArrowRight size={14} />
    </div>
  </Link>
);

const ServicesOverview = () => (
  <section className="section-padding bg-gray-50">
    <div className="container-custom">
      {/* ── Section Header ─────────────────────────────────── */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="section-label">What We Offer</span>
        <h2 className="section-title mt-2">
          Comprehensive{' '}
          <span className="text-gradient-gold">Professional Services</span>
        </h2>
        <div className="gold-divider mx-auto" />
        <p className="section-subtitle mt-4">
          From audit and taxation to financial advisory, we provide end-to-end
          solutions tailored to your business needs.
        </p>
      </div>

      {/* ── Service Cards Grid ─────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {SERVICE_CARDS.map((service, i) => (
          <ServiceCard key={service.slug} {...service} index={i} />
        ))}
      </div>

      {/* ── View All CTA ───────────────────────────────────── */}
      <div className="text-center mt-12">
        <Link to="/services" className="btn-navy">
          View All Services
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  </section>
);

export default ServicesOverview;
