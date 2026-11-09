import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import {
  FileText, Calculator, Briefcase, TrendingUp,
  Shield, Users, ArrowRight, CheckCircle, Phone,
} from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import CTASection from '../components/home/CTASection';
import { SITE_NAME } from '../utils/constants';

// ── All service data in one place ─────────────────────────────
const ALL_SERVICES = {
  'audit-assurance': {
    id: 'audit-assurance',
    icon: Shield,
    title: 'Audit & Assurance',
    tagline: 'Independent assurance that strengthens stakeholder confidence.',
    description:
      'Our audit and assurance practice delivers independent, objective examinations of financial statements and internal controls. We help organisations demonstrate accountability, manage risk, and meet regulatory requirements with confidence.',
    features: [
      'Statutory & regulatory audits',
      'Internal audit & control reviews',
      'Due diligence engagements',
      'Agreed-upon procedures',
      'Review of financial statements',
      'Compliance audits',
    ],
    benefits: [
      'Enhanced credibility with investors and lenders',
      'Early identification of financial risks',
      'Improved internal controls and processes',
      'Full regulatory compliance assurance',
    ],
    related: ['taxation-services', 'accounting-bookkeeping', 'financial-advisory'],
  },
  'taxation-services': {
    id: 'taxation-services',
    icon: Calculator,
    title: 'Taxation Services',
    tagline: 'Strategic tax compliance and planning for businesses and individuals.',
    description:
      "Navigating Pakistan's tax landscape requires specialist knowledge and constant vigilance. Our tax team combines technical expertise with practical business understanding to help you comply, plan effectively, and minimise risk.",
    features: [
      'Corporate income tax returns (ITR)',
      'Sales tax & FBR compliance',
      'Withholding tax management',
      'Tax planning & optimisation',
      'Tax dispute resolution & appeals',
      'Transfer pricing advisory',
    ],
    benefits: [
      'Full compliance with FBR requirements',
      'Minimised tax liabilities through planning',
      'Expert representation in tax disputes',
      'Up-to-date with evolving tax legislation',
    ],
    related: ['audit-assurance', 'accounting-bookkeeping', 'financial-advisory'],
  },
  'accounting-bookkeeping': {
    id: 'accounting-bookkeeping',
    icon: FileText,
    title: 'Accounting & Bookkeeping',
    tagline: 'Accurate financial records that power informed business decisions.',
    description:
      'Reliable bookkeeping is the foundation of every successful business. We maintain precise, timely records and prepare financial statements that give you a clear, real-time view of your financial position.',
    features: [
      'Monthly bookkeeping services',
      'IFRS / GAAP financial statements',
      'Accounts payable & receivable',
      'Bank reconciliations',
      'Management accounts & reporting',
      'Chart of accounts setup',
    ],
    benefits: [
      'Always audit-ready financial records',
      'Real-time visibility into cash flow',
      'Reduced bookkeeping errors',
      'More time to focus on your core business',
    ],
    related: ['audit-assurance', 'payroll-services', 'taxation-services'],
  },
  'financial-advisory': {
    id: 'financial-advisory',
    icon: TrendingUp,
    title: 'Financial Advisory',
    tagline: 'Strategic guidance to help your business grow and thrive.',
    description:
      'Our financial advisory team provides strategic insight at every stage of your business journey — from start-up through growth, acquisition, and exit. We combine financial analysis with practical business understanding.',
    features: [
      'Business valuation',
      'Financial modelling & forecasting',
      'Mergers & acquisition advisory',
      'Working capital management',
      'Feasibility studies & business plans',
      'Investment appraisal',
    ],
    benefits: [
      'Clearer strategic direction and decision-making',
      'Independent, objective financial perspective',
      'Higher confidence from investors and banks',
      'Better positioned for growth or exit',
    ],
    related: ['audit-assurance', 'taxation-services', 'corporate-secretarial'],
  },
  'corporate-secretarial': {
    id: 'corporate-secretarial',
    icon: Briefcase,
    title: 'Corporate Secretarial',
    tagline: 'Keeping your company compliant with all statutory requirements.',
    description:
      'Our corporate secretarial service ensures your company meets every SECP and regulatory obligation, freeing you from administrative burden and protecting you from the risk of non-compliance penalties.',
    features: [
      'SECP company registration',
      'Annual return filings',
      'Board resolution preparation',
      'Change of directors / shareholders',
      'Registered office services',
      'Corporate governance advisory',
    ],
    benefits: [
      'Zero risk of statutory non-compliance',
      'Professionally maintained corporate records',
      'Timely filing of all regulatory documents',
      'Expert guidance on governance matters',
    ],
    related: ['financial-advisory', 'taxation-services', 'audit-assurance'],
  },
  'payroll-services': {
    id: 'payroll-services',
    icon: Users,
    title: 'Payroll Services',
    tagline: 'Accurate, confidential payroll delivered on time, every time.',
    description:
      'Outsource your payroll to our specialist team and eliminate the administrative burden while ensuring your employees are paid correctly and on time, every month.',
    features: [
      'Monthly payroll processing',
      'EOBI & PESSI compliance',
      'Leave & attendance management',
      'Employee income tax deductions',
      'Payroll reports & payslips',
      'End-of-service calculations',
    ],
    benefits: [
      'Reduced payroll errors and disputes',
      'Full social security & EOBI compliance',
      'Confidential handling of employee data',
      'Free up HR bandwidth for strategic work',
    ],
    related: ['accounting-bookkeeping', 'corporate-secretarial', 'taxation-services'],
  },
};

// ── ServiceDetail Page ────────────────────────────────────────
const ServiceDetail = () => {
  const { slug } = useParams();
  const service = ALL_SERVICES[slug];

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gray-50">
        <h1 className="section-title">Service Not Found</h1>
        <p className="section-subtitle mt-3">The service you are looking for does not exist.</p>
        <Link to="/services" className="btn-navy mt-6">Back to Services</Link>
      </div>
    );
  }

  const Icon = service.icon;
  const relatedServices = service.related
    .map((r) => ALL_SERVICES[r])
    .filter(Boolean);

  return (
    <>
      <Helmet>
        <title>{service.title} — {SITE_NAME}</title>
        <meta name="description" content={service.tagline} />
      </Helmet>

      <PageHero
        label="Our Services"
        title={service.title}
        subtitle={service.tagline}
        breadcrumb={[
          { label: 'Services', path: '/services' },
          { label: service.title },
        ]}
      />

      {/* ── Overview ─────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Main content */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={26} className="text-gold" />
                </div>
                <h2 className="font-heading text-navy-800 text-2xl font-bold">{service.title}</h2>
              </div>
              <p className="text-gray-600 text-base leading-relaxed">{service.description}</p>

              <h3 className="font-heading text-navy-800 text-xl font-bold mt-10 mb-5">
                What's Included
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {service.features.map((f) => (
                  <div key={f} className="flex items-start gap-3 bg-gray-50 p-4">
                    <CheckCircle className="text-gold flex-shrink-0 mt-0.5" size={16} />
                    <span className="text-gray-600 text-sm">{f}</span>
                  </div>
                ))}
              </div>

              <h3 className="font-heading text-navy-800 text-xl font-bold mt-10 mb-5">
                Key Benefits
              </h3>
              <ul className="space-y-3">
                {service.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gold rounded-full flex-shrink-0 mt-1.5" />
                    <span className="text-gray-600 text-sm leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* CTA card */}
              <div className="bg-gradient-navy text-white p-8">
                <h3 className="font-heading text-xl font-bold mb-3">Ready to get started?</h3>
                <p className="text-white/60 text-sm mb-6 leading-relaxed">
                  Speak with one of our specialists to discuss how we can help your business.
                </p>
                <Link to="/contact" className="btn-primary w-full justify-center">
                  Get a Free Consultation <ArrowRight size={14} />
                </Link>
                <a
                  href="tel:[Phone Number]"
                  className="flex items-center justify-center gap-2 mt-4 text-white/50
                             hover:text-gold text-sm transition-colors duration-200"
                >
                  <Phone size={14} />
                  [Phone Number — Placeholder]
                </a>
              </div>

              {/* Related services */}
              <div className="card p-6">
                <h3 className="font-heading text-navy-800 text-base font-bold mb-4">
                  Related Services
                </h3>
                <ul className="space-y-2">
                  {relatedServices.map((rs) => {
                    const RIcon = rs.icon;
                    return (
                      <li key={rs.id}>
                        <Link
                          to={`/services/${rs.id}`}
                          className="flex items-center gap-3 text-sm text-gray-600
                                     hover:text-gold transition-colors duration-200 py-2
                                     border-b border-gray-50 last:border-b-0"
                        >
                          <RIcon size={14} className="text-gold flex-shrink-0" />
                          {rs.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default ServiceDetail;
