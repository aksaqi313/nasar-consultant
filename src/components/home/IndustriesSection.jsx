import {
  Factory, Landmark, ShoppingBag, HeartPulse,
  Monitor, HardHat, Wallet, HandHelping,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const INDUSTRY_LIST = [
  { icon: Factory,      name: 'Manufacturing' },
  { icon: Landmark,     name: 'Real Estate' },
  { icon: ShoppingBag,  name: 'Retail & Distribution' },
  { icon: HeartPulse,   name: 'Healthcare' },
  { icon: Monitor,      name: 'Technology' },
  { icon: HardHat,      name: 'Construction' },
  { icon: Wallet,       name: 'Financial Services' },
  { icon: HandHelping,  name: 'Non-Profit Organizations' },
];

const IndustriesSection = () => (
  <section className="section-padding bg-white">
    <div className="container-custom">
      {/* ── Section Header ─────────────────────────────────── */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="section-label">Industries</span>
        <h2 className="section-title mt-2">
          Sectors We{' '}
          <span className="text-gradient-gold">Serve</span>
        </h2>
        <div className="gold-divider mx-auto" />
        <p className="section-subtitle mt-4">
          We bring sector-specific expertise to deliver solutions that address the
          unique challenges and opportunities within each industry.
        </p>
      </div>

      {/* ── Industries Grid ────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {INDUSTRY_LIST.map(({ icon: Icon, name }) => (
          <div
            key={name}
            className="group bg-gray-50 border border-gray-100 p-6
                       flex flex-col items-center text-center
                       hover:bg-navy-800 hover:border-navy-800
                       hover:-translate-y-1 hover:shadow-navy
                       transition-all duration-300 cursor-default"
          >
            <div className="w-14 h-14 bg-white border border-gray-100 flex items-center justify-center
                            mb-4 group-hover:bg-gold group-hover:border-gold
                            transition-all duration-300">
              <Icon
                size={24}
                className="text-navy-800 group-hover:text-navy-900
                           transition-colors duration-300"
              />
            </div>
            <h3 className="font-sans font-semibold text-navy-800 text-sm
                          group-hover:text-white transition-colors duration-300">
              {name}
            </h3>
          </div>
        ))}
      </div>

      {/* ── CTA ────────────────────────────────────────────── */}
      <div className="text-center mt-12">
        <Link to="/industries" className="btn-outline-navy">
          Explore All Industries
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  </section>
);

export default IndustriesSection;
