import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

/**
 * PageHero — reusable inner-page banner
 * Props:
 *   label      string   — small uppercase label above title
 *   title      string   — main heading
 *   subtitle   string   — optional description
 *   breadcrumb array    — [{ label, path }]  (last item has no path)
 */
const PageHero = ({ label, title, subtitle, breadcrumb = [] }) => (
  <section className="relative bg-gradient-navy overflow-hidden">
    {/* Decorative pattern */}
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    />
    {/* Gold glow */}
    <div className="absolute -right-40 top-0 w-[400px] h-[400px] rounded-full bg-gold/5 blur-[100px] pointer-events-none" />
    {/* Gold left bar */}
    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold/50 to-transparent" />

    <div className="container-custom relative z-10 py-16 lg:py-24">
      {/* Breadcrumb */}
      {breadcrumb.length > 0 && (
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-6 text-white/40 text-xs">
          <Link to="/" className="hover:text-gold transition-colors duration-200">Home</Link>
          {breadcrumb.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <ChevronRight size={12} />
              {crumb.path ? (
                <Link to={crumb.path} className="hover:text-gold transition-colors duration-200">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-white/70">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}

      {label && (
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-[2px] bg-gold" />
          <span className="section-label">{label}</span>
        </div>
      )}

      <h1 className="font-heading text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-3xl">
        {title}
      </h1>

      {subtitle && (
        <p className="text-white/55 text-base md:text-lg mt-4 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  </section>
);

export default PageHero;
