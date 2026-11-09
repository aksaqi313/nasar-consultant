import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { CONTACT } from '../../utils/constants';
import { AdminDataAPI, INITIAL_HOME_CONTENT } from '../../utils/adminData';

const CTASection = () => {
  const [cta, setCta] = useState(() => {
    try {
      return AdminDataAPI.getHomeContent()?.cta || INITIAL_HOME_CONTENT.cta;
    } catch {
      return INITIAL_HOME_CONTENT.cta;
    }
  });

  useEffect(() => {
    try {
      const live = AdminDataAPI.getHomeContent()?.cta;
      if (live) setCta(live);
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* ── Background ───────────────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-800 to-navy-700" />

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-gold/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-gold/5 blur-[80px] pointer-events-none" />

      {/* Gold line at top */}
      <div className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent relative z-10" />

      {/* ── Content ──────────────────────────────────────────── */}
      <div className="container-custom py-20 lg:py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-gold font-semibold text-xs tracking-[0.2em] uppercase mb-3 block">
            {cta.badge || 'Get Started Today'}
          </span>

          <h2 className="font-heading text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mt-2 mb-6">
            {cta.titlePrefix || 'Ready to Elevate Your'}{' '}
            <span className="text-gradient-gold">{cta.titleHighlight || 'Financial Strategy?'}</span>
          </h2>

          <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            {cta.subtitle ||
              'Whether you need audit support, tax advisory, or comprehensive financial guidance, our team is ready to help you achieve your goals.'}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link to={cta.primaryBtnLink || '/contact'} className="btn-primary">
              <span>{cta.primaryBtnText || 'Schedule a Consultation'}</span>
              <ArrowRight size={16} />
            </Link>
            <Link to={cta.secondaryBtnLink || '/services'} className="btn-secondary">
              {cta.secondaryBtnText || 'Explore Our Services'}
            </Link>
          </div>

          {/* Phone line */}
          <div className="flex items-center justify-center gap-3 text-white/40">
            <div className="w-8 h-[1px] bg-white/20" />
            <span className="text-sm">Or call us at</span>
            <a
              href={`tel:${CONTACT.phone}`}
              className="text-gold font-semibold text-sm hover:text-gold-300 transition-colors duration-200 flex items-center gap-1.5"
            >
              <Phone size={14} />
              {CONTACT.phone}
            </a>
            <div className="w-8 h-[1px] bg-white/20" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
