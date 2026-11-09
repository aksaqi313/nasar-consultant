import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  FileText, Calculator, Briefcase, TrendingUp,
  Shield, Users, ArrowRight,
} from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import CTASection from '../components/home/CTASection';
import { SITE_NAME, SERVICES } from '../utils/constants';

// ── Service definitions with icons & descriptions ─────────────
const SERVICE_META = {
  'audit-assurance': {
    icon: Shield,
    description:
      'Independent, objective assurance services that enhance the reliability of financial information and build stakeholder confidence.',
    features: [
      'Statutory & regulatory audits',
      'Internal audit & control reviews',
      'Due diligence engagements',
      'Agreed-upon procedures',
      'Review of financial statements',
    ],
  },
  'taxation-services': {
    icon: Calculator,
    description:
      'Comprehensive tax planning, compliance, and advisory services for businesses and individuals navigating complex regulations.',
    features: [
      'Corporate income tax returns',
      'Sales tax & FBR compliance',
      'Withholding tax management',
      'Tax planning & optimization',
      'Tax dispute resolution',
    ],
  },
  'accounting-bookkeeping': {
    icon: FileText,
    description:
      'Accurate, timely bookkeeping and financial reporting that gives you a clear picture of your business at all times.',
    features: [
      'Monthly bookkeeping services',
      'IFRS / GAAP financial statements',
      'Payables & receivables management',
      'Bank reconciliations',
      'Management accounts',
    ],
  },
  'financial-advisory': {
    icon: TrendingUp,
    description:
      'Strategic financial guidance to help you make informed decisions, manage risk, and achieve your business objectives.',
    features: [
      'Business valuation',
      'Financial modelling & forecasting',
      'Mergers & acquisition advisory',
      'Working capital management',
      'Feasibility studies',
    ],
  },
  'corporate-secretarial': {
    icon: Briefcase,
    description:
      'Ensuring your company remains compliant with all corporate governance and statutory requirements.',
    features: [
      'SECP company registration',
      'Annual return filings',
      'Board resolution preparation',
      'Change of directors / shareholders',
      'Corporate governance advisory',
    ],
  },
  'payroll-services': {
    icon: Users,
    description:
      'Accurate, confidential payroll processing that keeps your employees paid on time and your business compliant.',
    features: [
      'Monthly payroll processing',
      'EOBI & PESSI compliance',
      'Leave & attendance management',
      'Employee tax deductions',
      'Payroll reporting',
    ],
  },
};

// ── Service Card ──────────────────────────────────────────────
const ServiceCard = ({ service }) => {
  const meta = SERVICE_META[service.slug] || {};
  const Icon = meta.icon || FileText;

  return (
    <div className="card group p-8 flex flex-col hover:-translate-y-1 transition-all duration-300">
      {/* Icon */}
      <div className="w-14 h-14 bg-gold/10 flex items-center justify-center mb-6 flex-shrink-0
                      group-hover:bg-gold transition-colors duration-300">
        <Icon
          size={24}
          className="text-gold group-hover:text-navy-900 transition-colors duration-300"
        />
      </div>

      <h2 className="font-heading text-navy-800 text-xl font-bold mb-3">{service.title}</h2>
      <p className="text-gray-500 text-sm leading-relaxed flex-1">{meta.description}</p>

      {/* Feature list */}
      {meta.features && (
        <ul className="mt-5 space-y-2">
          {meta.features.slice(0, 3).map((f) => (
            <li key={f} className="flex items-center gap-2 text-xs text-gray-400">
              <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      )}

      <Link
        to={`/services/${service.slug}`}
        className="mt-6 inline-flex items-center gap-2 text-gold text-sm font-semibold
                   hover:gap-3 transition-all duration-200"
      >
        Learn More <ArrowRight size={14} />
      </Link>
    </div>
  );
};

// ── Services Page ─────────────────────────────────────────────
const Services = () => (
  <>
    <Helmet>
      <title>Our Services — {SITE_NAME}</title>
      <meta
        name="description"
        content={`Explore ${SITE_NAME}'s full range of professional services including audit, taxation, accounting, financial advisory, corporate secretarial, and payroll.`}
      />
    </Helmet>

    <PageHero
      label="What We Offer"
      title="Our Professional Services"
      subtitle="From compliance to strategic advisory, we provide end-to-end financial and accounting services tailored to your needs."
      breadcrumb={[{ label: 'Services' }]}
    />

    {/* ── Services Grid ─────────────────────────────────────── */}
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>

    {/* ── Approach ──────────────────────────────────────────── */}
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="section-label">Our Approach</span>
            <h2 className="section-title mt-2">How We Work With You</h2>
            <div className="gold-divider" />
            <p className="section-subtitle mt-6">
              Every engagement begins with listening. We take the time to deeply understand
              your business, industry, and objectives before recommending any solution.
            </p>
            <div className="mt-8 space-y-6">
              {[
                { step: '01', title: 'Understand', desc: 'We begin with a thorough consultation to understand your goals and challenges.' },
                { step: '02', title: 'Plan', desc: 'We design a tailored approach that addresses your specific requirements.' },
                { step: '03', title: 'Execute', desc: 'Our experienced team delivers with precision, quality, and on time.' },
                { step: '04', title: 'Support', desc: 'We stay by your side, providing ongoing guidance and responsive service.' },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-5">
                  <div className="flex-shrink-0 w-10 h-10 bg-gold/10 flex items-center justify-center">
                    <span className="text-gold font-bold text-xs">{step}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-800 text-sm">{title}</h3>
                    <p className="text-gray-500 text-sm mt-1 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-navy p-10 text-white">
            <h3 className="font-heading text-2xl font-bold mb-4">Not sure which service you need?</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-8">
              Our advisors are happy to discuss your situation and point you in the right direction — no obligation.
            </p>
            <Link to="/contact" className="btn-primary">
              Book a Free Consultation <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>

    <CTASection />
  </>
);

export default Services;
