import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { AdminDataAPI, INITIAL_HOME_CONTENT } from '../../utils/adminData';

const GRADIENT_CLASSES = {
  'navy-classic': 'from-navy-950 via-navy-800 to-navy-700',
  'navy-dark': 'from-slate-950 via-navy-950 to-slate-900',
  'midnight-sapphire': 'from-blue-950 via-navy-900 to-indigo-950',
  'charcoal-gold': 'from-neutral-950 via-navy-950 to-stone-900',
};

const HeroSection = () => {
  const [hero, setHero] = useState(() => {
    try {
      return AdminDataAPI.getHomeContent()?.hero || INITIAL_HOME_CONTENT.hero;
    } catch {
      return INITIAL_HOME_CONTENT.hero;
    }
  });

  useEffect(() => {
    try {
      const live = AdminDataAPI.getHomeContent()?.hero;
      if (live) setHero(live);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleScrollDown = () => {
    const next = document.getElementById('about-preview');
    if (next) next.scrollIntoView({ behavior: 'smooth' });
  };

  const gradientClass = GRADIENT_CLASSES[hero.bgGradient] || GRADIENT_CLASSES['navy-classic'];

  return (
    <section
      className="relative min-h-[92vh] flex items-center overflow-hidden"
      style={
        hero.bgType === 'image' && hero.bgImageUrl
          ? {
              backgroundImage: `url('${hero.bgImageUrl}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      {/* ── Background Layers ──────────────────────────────── */}
      {hero.bgType === 'gradient' ? (
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass}`} />
      ) : (
        <div
          className="absolute inset-0 bg-navy-950"
          style={{ opacity: (hero.bgOverlayOpacity ?? 85) / 100 }}
        />
      )}

      {/* Decorative patterns */}
      {hero.showPattern !== false && (
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      )}

      {/* Glowing orbs */}
      {hero.showGlowingOrbs !== false && (
        <>
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-60 -left-40 w-[500px] h-[500px] rounded-full bg-navy-400/10 blur-[100px] pointer-events-none" />
        </>
      )}

      {/* Gold accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold/40 to-transparent" />

      {/* ── Content ────────────────────────────────────────── */}
      <div className="container-custom relative z-10 py-20">
        <div className="max-w-3xl">
          {/* Label */}
          <div className="flex items-center gap-3 mb-6 animate-fade-in">
            <div className="w-10 h-[2px] bg-gold" />
            <span className="text-gold font-semibold text-xs tracking-[0.2em] uppercase">
              {hero.badge || 'Nasar Consultant'}
            </span>
          </div>

          {/* Main headline */}
          <h1 className="font-heading text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 animate-slide-up">
            {hero.headlinePrefix || 'Excellence in'}{' '}
            <span className="text-gradient-gold">{hero.headlineHighlight || 'Accounting'}</span>
            <br />
            {hero.headlineSuffix || '& Financial Advisory'}
          </h1>

          {/* Subtitle */}
          <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-2xl mb-10 animate-slide-up animate-delay-100">
            {hero.subtitle ||
              'Delivering professional accounting, taxation, and financial advisory services to empower businesses and individuals with clarity, compliance, and confidence.'}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up animate-delay-200">
            <Link to={hero.primaryBtnLink || '/contact'} className="btn-primary">
              <span>{hero.primaryBtnText || 'Schedule a Consultation'}</span>
              <ArrowRight size={16} />
            </Link>
            <Link to={hero.secondaryBtnLink || '/services'} className="btn-secondary">
              {hero.secondaryBtnText || 'Explore Our Services'}
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-6 mt-14 pt-8 border-t border-white/10 animate-fade-in animate-delay-300">
            {[
              { value: hero.stat1Value || '15+', label: hero.stat1Label || 'Years of Experience' },
              { value: hero.stat2Value || '500+', label: hero.stat2Label || 'Clients Served' },
              { value: hero.stat3Value || '50+', label: hero.stat3Label || 'Professional Staff' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <span className="text-gold font-heading text-3xl font-bold">{stat.value}</span>
                <span className="text-white/40 text-xs uppercase tracking-wider leading-tight">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll Indicator ───────────────────────────────── */}
      <button
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/30 hover:text-gold transition-colors duration-300 animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={28} />
      </button>
    </section>
  );
};

export default HeroSection;
