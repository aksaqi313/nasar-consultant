import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import { NAV_LINKS, CONTACT, SITE_NAME } from '../../utils/constants';

// ── Services dropdown items ──────────────────────────────────
const SERVICE_ITEMS = [
  { label: 'Audit & Assurance',       path: '/services/audit-assurance' },
  { label: 'Taxation Services',        path: '/services/taxation-services' },
  { label: 'Accounting & Bookkeeping', path: '/services/accounting-bookkeeping' },
  { label: 'Financial Advisory',       path: '/services/financial-advisory' },
  { label: 'Corporate Secretarial',    path: '/services/corporate-secretarial' },
  { label: 'Payroll Services',         path: '/services/payroll-services' },
];

// ── Logo Component ───────────────────────────────────────────
const Logo = ({ onClick }) => (
  <Link to="/" onClick={onClick} className="flex items-center gap-3 group">
    {/* Icon mark */}
    <div className="w-10 h-10 bg-gold flex items-center justify-center flex-shrink-0
                    group-hover:bg-gold-400 transition-colors duration-300">
      <span className="text-navy-900 font-heading font-bold text-lg leading-none">N</span>
    </div>
    {/* Text */}
    <div className="flex flex-col leading-tight">
      <span className="text-white font-heading font-bold text-lg tracking-wide">
        {SITE_NAME}
      </span>
      <span className="text-gold/80 text-[10px] tracking-[0.15em] uppercase font-medium">
        Chartered Accountants
      </span>
    </div>
  </Link>
);

// ── Desktop Services Dropdown ────────────────────────────────
const ServicesDropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="nav-link flex items-center gap-1 py-1"
        aria-expanded={open}
        aria-haspopup="true"
      >
        Services
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown panel */}
      <div
        className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56
                    bg-white shadow-navy border-t-2 border-t-gold
                    transition-all duration-200 z-50
                    ${open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
      >
        {SERVICE_ITEMS.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setOpen(false)}
            className="block px-5 py-3 text-navy-800 text-sm font-medium
                       hover:bg-navy-50 hover:text-gold hover:pl-6
                       border-b border-gray-50 last:border-b-0
                       transition-all duration-150"
          >
            {item.label}
          </Link>
        ))}
        <Link
          to="/services"
          onClick={() => setOpen(false)}
          className="block px-5 py-3 text-gold text-sm font-semibold
                     hover:bg-gold hover:text-navy-900
                     transition-all duration-150 tracking-wide"
        >
          View All Services →
        </Link>
      </div>
    </div>
  );
};

// ── Main Navbar ──────────────────────────────────────────────
const Navbar = () => {
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [scrolled,   setScrolled]     = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileServices(false);
  }, [location.pathname]);

  // Detect scroll for shadow effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Top Info Bar ──────────────────────────────────────── */}
      <div className="bg-navy-950 text-white/60 text-xs hidden lg:block">
        <div className="container-custom flex justify-between items-center py-2">
          <span>Professional Accounting, Taxation &amp; Financial Services</span>
          <a
            href={`tel:${CONTACT.phone}`}
            className="flex items-center gap-1.5 hover:text-gold transition-colors duration-200"
          >
            <Phone size={12} />
            {CONTACT.phone}
          </a>
        </div>
      </div>

      {/* ── Main Navigation Bar ───────────────────────────────── */}
      <header
        className={`sticky top-0 z-40 bg-navy-800
                    transition-shadow duration-300
                    ${scrolled ? 'shadow-navy' : ''}`}
        role="banner"
      >
        <nav
          className="container-custom flex items-center justify-between h-16 lg:h-20"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Logo />

          {/* ── Desktop Links ──────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) =>
              link.label === 'Services' ? (
                <ServicesDropdown key="services" />
              ) : (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'nav-link-active' : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              )
            )}
          </div>

          {/* ── Desktop CTA ────────────────────────────────── */}
          <div className="hidden lg:block">
            <Link to="/contact" className="btn-primary text-xs px-6 py-2.5">
              Get a Consultation
            </Link>
          </div>

          {/* ── Mobile Menu Toggle ─────────────────────────── */}
          <button
            id="mobile-menu-toggle"
            className="lg:hidden text-white hover:text-gold transition-colors duration-200 p-1"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* ── Mobile Menu Overlay ─────────────────────────────── */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-30 bg-navy-950/95 backdrop-blur-sm
                     flex flex-col pt-24 px-6 pb-8 overflow-y-auto lg:hidden"
          aria-hidden={!mobileOpen}
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) =>
              link.label === 'Services' ? (
                <div key="services">
                  <button
                    className="w-full flex items-center justify-between
                               text-white/85 hover:text-gold font-medium text-lg
                               py-3 border-b border-navy-700/50
                               transition-colors duration-200"
                    onClick={() => setMobileServices((prev) => !prev)}
                    aria-expanded={mobileServices}
                  >
                    Services
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-200 ${mobileServices ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {mobileServices && (
                    <div className="pl-4 flex flex-col gap-1 mt-1 mb-2">
                      {SERVICE_ITEMS.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="text-white/60 hover:text-gold text-base
                                     py-2 border-b border-navy-800/30
                                     transition-colors duration-200"
                        >
                          {item.label}
                        </Link>
                      ))}
                      <Link
                        to="/services"
                        className="text-gold font-semibold text-base py-2
                                   transition-colors duration-200"
                      >
                        View All Services →
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `block py-3 font-medium text-lg border-b border-navy-700/50
                     transition-colors duration-200
                     ${isActive ? 'text-gold' : 'text-white/85 hover:text-gold'}`
                  }
                >
                  {link.label}
                </NavLink>
              )
            )}

            {/* Mobile CTA */}
            <div className="mt-6">
              <Link to="/contact" className="btn-primary w-full justify-center">
                Get a Consultation
              </Link>
            </div>

            {/* Mobile contact */}
            <a
              href={`tel:${CONTACT.phone}`}
              className="flex items-center justify-center gap-2 mt-4
                         text-white/50 hover:text-gold text-sm transition-colors duration-200"
            >
              <Phone size={14} />
              {CONTACT.phone}
            </a>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
