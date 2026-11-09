import { Link } from 'react-router-dom';
import {
  MapPin, Phone, Mail, Clock,
  ArrowRight, ChevronRight,
} from 'lucide-react';
import {
  SITE_NAME, CONTACT, SOCIAL,
  FOOTER_LINKS, CURRENT_YEAR,
} from '../../utils/constants';

// ── Social Icons (Inline SVG) ────────────────────────────────
const LinkedinIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const TwitterIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const FacebookIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const InstagramIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

// ── Logo (reused from Navbar style) ─────────────────────────
const FooterLogo = () => (
  <Link to="/" className="flex items-center gap-3 group w-fit">
    <div className="w-10 h-10 bg-gold flex items-center justify-center flex-shrink-0
                    group-hover:bg-gold-400 transition-colors duration-300">
      <span className="text-navy-900 font-heading font-bold text-lg leading-none">N</span>
    </div>
    <div className="flex flex-col leading-tight">
      <span className="text-white font-heading font-bold text-lg tracking-wide">
        {SITE_NAME}
      </span>
      <span className="text-gold/70 text-[10px] tracking-[0.15em] uppercase font-medium">
        Chartered Accountants
      </span>
    </div>
  </Link>
);

// ── Footer Link Column ───────────────────────────────────────
const FooterLinkColumn = ({ title, links }) => (
  <div>
    <h3 className="text-white font-semibold text-sm tracking-widest uppercase mb-5
                   pb-3 border-b border-navy-700">
      {title}
    </h3>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.path}>
          <Link
            to={link.path}
            className="flex items-center gap-2 text-white/55 text-sm
                       hover:text-gold group transition-colors duration-200"
          >
            <ChevronRight
              size={12}
              className="text-gold/40 group-hover:text-gold
                         group-hover:translate-x-1 transition-all duration-200 flex-shrink-0"
            />
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

// ── Social Icons ────────────────────────────────────────────
const SOCIAL_ICONS = [
  { icon: LinkedinIcon,  href: SOCIAL.linkedin,  label: 'LinkedIn'  },
  { icon: TwitterIcon,   href: SOCIAL.twitter,   label: 'Twitter'   },
  { icon: FacebookIcon,  href: SOCIAL.facebook,  label: 'Facebook'  },
  { icon: InstagramIcon, href: SOCIAL.instagram, label: 'Instagram' },
];

// ── Newsletter Form ──────────────────────────────────────────
const NewsletterForm = () => (
  <div className="mt-6">
    <p className="text-white/55 text-sm mb-3">
      Subscribe to our newsletter for the latest insights and updates.
    </p>
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex gap-2"
      aria-label="Newsletter subscription"
    >
      <input
        type="email"
        placeholder="Your email address"
        className="flex-1 bg-navy-700 border border-navy-600 text-white
                   placeholder-white/30 text-sm px-3 py-2.5
                   focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30
                   transition-all duration-200 min-w-0"
        aria-label="Email address for newsletter"
      />
      <button
        type="submit"
        className="bg-gold hover:bg-gold-400 text-navy-900 px-4 py-2.5
                   transition-colors duration-200 flex-shrink-0 flex items-center"
        aria-label="Subscribe to newsletter"
      >
        <ArrowRight size={16} />
      </button>
    </form>
  </div>
);

// ── Main Footer ──────────────────────────────────────────────
const Footer = () => (
  <footer className="bg-navy-900" role="contentinfo" aria-label="Site footer">

    {/* ── Gold accent bar ─────────────────────────────────── */}
    <div className="h-1 bg-gradient-to-r from-gold-700 via-gold to-gold-700" />

    {/* ── Main footer content ─────────────────────────────── */}
    <div className="container-custom py-16 lg:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

        {/* ── Column 1: Brand & Contact ─────────────────── */}
        <div className="lg:col-span-1">
          <FooterLogo />

          <p className="text-white/50 text-sm leading-relaxed mt-5 mb-6">
            A professional consultancy providing expert accounting, taxation, and
            financial advisory services. Your trusted partner for business growth.
          </p>

          {/* Contact details */}
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <MapPin size={15} className="text-gold mt-0.5 flex-shrink-0" />
              <span className="text-white/50 text-sm leading-relaxed">
                {CONTACT.address}
                <br />
                {CONTACT.city}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={15} className="text-gold flex-shrink-0" />
              <a
                href={`tel:${CONTACT.phone}`}
                className="text-white/50 text-sm hover:text-gold transition-colors duration-200"
              >
                {CONTACT.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={15} className="text-gold flex-shrink-0" />
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-white/50 text-sm hover:text-gold transition-colors duration-200"
              >
                {CONTACT.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Clock size={15} className="text-gold flex-shrink-0" />
              <span className="text-white/50 text-sm">{CONTACT.hours}</span>
            </li>
          </ul>
        </div>

        {/* ── Column 2: Company Links ───────────────────── */}
        <FooterLinkColumn title="Company"  links={FOOTER_LINKS.company} />

        {/* ── Column 3: Services Links ──────────────────── */}
        <FooterLinkColumn title="Services" links={FOOTER_LINKS.services} />

        {/* ── Column 4: Social & Newsletter ────────────── */}
        <div>
          <h3 className="text-white font-semibold text-sm tracking-widest uppercase mb-5
                         pb-3 border-b border-navy-700">
            Connect With Us
          </h3>

          {/* Social icons */}
          <div className="flex gap-3 flex-wrap">
            {SOCIAL_ICONS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-navy-600 flex items-center justify-center
                           text-white/50 hover:border-gold hover:text-gold hover:bg-gold/10
                           transition-all duration-200"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>

          {/* Newsletter */}
          <NewsletterForm />
        </div>
      </div>
    </div>

    {/* ── Bottom bar ──────────────────────────────────────── */}
    <div className="border-t border-navy-800">
      <div className="container-custom py-5 flex flex-col sm:flex-row
                      items-center justify-between gap-3">
        <p className="text-white/35 text-xs text-center sm:text-left">
          &copy; {CURRENT_YEAR} {SITE_NAME}. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {FOOTER_LINKS.legal.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-white/35 text-xs hover:text-gold transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          <span className="text-white/20 text-xs">•</span>
          <Link
            to="/admin"
            className="text-white/35 text-xs hover:text-gold transition-colors duration-200 flex items-center gap-1"
          >
            <span>Admin Portal</span>
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
