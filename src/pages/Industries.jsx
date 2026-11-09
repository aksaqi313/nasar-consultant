import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Factory, Building2, ShoppingCart, Heart, Cpu,
  HardHat, Landmark, Leaf, ArrowRight,
} from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import CTASection from '../components/home/CTASection';
import { SITE_NAME } from '../utils/constants';

// ── Industry data ──────────────────────────────────────────────
const INDUSTRY_LIST = [
  {
    icon: Factory,
    name: 'Manufacturing',
    description:
      'Cost accounting, inventory management, payroll compliance, and financial reporting tailored for manufacturing operations.',
    services: ['Audit & Assurance', 'Taxation', 'Accounting'],
  },
  {
    icon: Building2,
    name: 'Real Estate',
    description:
      'Project cost management, withholding tax compliance, and financial advisory for property developers and investors.',
    services: ['Taxation', 'Financial Advisory', 'Accounting'],
  },
  {
    icon: ShoppingCart,
    name: 'Retail & Distribution',
    description:
      'Sales tax management, inventory accounting, and cash flow optimisation for retail businesses of all sizes.',
    services: ['Taxation', 'Accounting', 'Payroll'],
  },
  {
    icon: Heart,
    name: 'Healthcare',
    description:
      'Specialised accounting and compliance services for hospitals, clinics, and healthcare providers.',
    services: ['Audit', 'Accounting', 'Corporate Secretarial'],
  },
  {
    icon: Cpu,
    name: 'Technology',
    description:
      'R&D tax benefits, STZA compliance, and financial advisory for startups and established tech companies.',
    services: ['Taxation', 'Financial Advisory', 'Accounting'],
  },
  {
    icon: HardHat,
    name: 'Construction',
    description:
      'Project-based accounting, contract costing, and compliance services for contractors and developers.',
    services: ['Accounting', 'Taxation', 'Audit'],
  },
  {
    icon: Landmark,
    name: 'Financial Services',
    description:
      'Regulatory compliance, internal audit, and advisory services for banks, NBFCs, and investment companies.',
    services: ['Audit & Assurance', 'Corporate Secretarial', 'Advisory'],
  },
  {
    icon: Leaf,
    name: 'Non-Profit Organizations',
    description:
      'Transparent fund management, SECP compliance, and audit services that build donor trust.',
    services: ['Audit', 'Accounting', 'Corporate Secretarial'],
  },
];

// ── Industry Card ─────────────────────────────────────────────
const IndustryCard = ({ icon: Icon, name, description, services }) => (
  <div className="card group p-8 hover:-translate-y-1 transition-all duration-300">
    <div className="w-14 h-14 bg-gold/10 flex items-center justify-center mb-5
                    group-hover:bg-gold transition-colors duration-300">
      <Icon
        size={24}
        className="text-gold group-hover:text-navy-900 transition-colors duration-300"
      />
    </div>
    <h3 className="font-heading text-navy-800 text-xl font-bold mb-3">{name}</h3>
    <p className="text-gray-500 text-sm leading-relaxed mb-5">{description}</p>
    <div className="flex flex-wrap gap-2">
      {services.map((s) => (
        <span key={s} className="badge-gold">{s}</span>
      ))}
    </div>
  </div>
);

// ── Industries Page ───────────────────────────────────────────
const Industries = () => (
  <>
    <Helmet>
      <title>Industries We Serve — {SITE_NAME}</title>
      <meta
        name="description"
        content={`${SITE_NAME} serves clients across manufacturing, real estate, retail, healthcare, technology, construction, financial services, and non-profit sectors.`}
      />
    </Helmet>

    <PageHero
      label="Sectors We Serve"
      title="Industries We Work With"
      subtitle="Sector-specific knowledge that lets us provide relevant, practical advice — not generic solutions."
      breadcrumb={[{ label: 'Industries' }]}
    />

    {/* ── Industry Grid ─────────────────────────────────────── */}
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-14">
          <span className="section-label">Our Expertise</span>
          <h2 className="section-title mt-2">Serving Diverse Sectors</h2>
          <div className="gold-divider mx-auto" />
          <p className="section-subtitle mt-6 max-w-2xl mx-auto">
            Every industry has unique financial challenges and regulatory requirements.
            Our team brings deep sector knowledge to every engagement.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INDUSTRY_LIST.map((industry) => (
            <IndustryCard key={industry.name} {...industry} />
          ))}
        </div>
      </div>
    </section>

    {/* ── Cross-industry expertise ──────────────────────────── */}
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="section-label">Cross-Industry Capability</span>
            <h2 className="section-title mt-2">
              Deep Sector Knowledge,<br />Broad Financial Expertise
            </h2>
            <div className="gold-divider" />
            <p className="section-subtitle mt-6">
              While each industry is unique, the fundamentals of sound financial management,
              tax compliance, and strategic planning apply universally. Our team combines
              sector-specific regulatory knowledge with robust technical accounting expertise.
            </p>
            <p className="section-subtitle mt-4">
              Whether you are a growing startup or an established enterprise, we adapt our
              services to your industry's regulatory environment and growth stage.
            </p>
            <Link to="/contact" className="btn-navy mt-8 inline-flex">
              Discuss Your Industry Needs <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '[X]+', label: 'Industries Served' },
              { value: '[X]+', label: 'Years of Expertise' },
              { value: '[X]+', label: 'Satisfied Clients' },
              { value: '[X]%', label: 'On-Time Delivery' },
            ].map(({ value, label }) => (
              <div key={label} className="bg-navy-50 p-8 text-center">
                <div className="font-heading text-4xl font-bold text-gold">{value}</div>
                <div className="text-navy-700 text-sm font-medium mt-2">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <CTASection />
  </>
);

export default Industries;
