// ─────────────────────────────────────────────────────────────
// NASAR CONSULTANT — Site Constants
// Replace placeholder values with verified company information
// ─────────────────────────────────────────────────────────────

export const SITE_NAME = 'Nasar Consultant';
export const SITE_TAGLINE = 'Accounting, Taxation & Financial Services';
export const SITE_DESCRIPTION =
  'Nasar Consultant provides professional accounting, taxation, and financial advisory services to businesses and individuals.';

// ── Contact Info (PLACEHOLDER — replace with verified details) ──
export const CONTACT = {
  address:   '[Office Address — To Be Provided]',
  city:      '[City, Country — To Be Provided]',
  phone:     '[Phone Number — To Be Provided]',
  email:     '[Email Address — To Be Provided]',
  hours:     'Monday – Friday: 9:00 AM – 6:00 PM',
};

// ── Social Links (PLACEHOLDER) ──────────────────────────────
export const SOCIAL = {
  linkedin:  '#',
  twitter:   '#',
  facebook:  '#',
  instagram: '#',
};

// ── Navigation Links ─────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Home',       path: '/' },
  { label: 'About',      path: '/about' },
  { label: 'Services',   path: '/services' },
  { label: 'Industries', path: '/industries' },
  { label: 'Insights',   path: '/insights' },
  { label: 'Careers',    path: '/careers' },
  { label: 'Contact',    path: '/contact' },
];

// ── Service Categories (PLACEHOLDER — replace with real services) ──
export const SERVICES = [
  { id: 'audit',        title: 'Audit & Assurance',          slug: 'audit-assurance' },
  { id: 'tax',          title: 'Taxation Services',           slug: 'taxation-services' },
  { id: 'accounting',   title: 'Accounting & Bookkeeping',    slug: 'accounting-bookkeeping' },
  { id: 'advisory',     title: 'Financial Advisory',          slug: 'financial-advisory' },
  { id: 'corporate',    title: 'Corporate Secretarial',       slug: 'corporate-secretarial' },
  { id: 'payroll',      title: 'Payroll Services',            slug: 'payroll-services' },
];

// ── Industries (PLACEHOLDER) ────────────────────────────────
export const INDUSTRIES = [
  'Manufacturing',
  'Real Estate',
  'Retail & Distribution',
  'Healthcare',
  'Technology',
  'Construction',
  'Financial Services',
  'Non-Profit Organizations',
];

// ── Footer Quick Links ───────────────────────────────────────
export const FOOTER_LINKS = {
  company: [
    { label: 'About Us',       path: '/about' },
    { label: 'Our Team',       path: '/about#team' },
    { label: 'Careers',        path: '/careers' },
    { label: 'Insights',       path: '/insights' },
    { label: 'Contact Us',     path: '/contact' },
  ],
  services: [
    { label: 'Audit & Assurance',        path: '/services/audit-assurance' },
    { label: 'Taxation Services',         path: '/services/taxation-services' },
    { label: 'Accounting & Bookkeeping',  path: '/services/accounting-bookkeeping' },
    { label: 'Financial Advisory',        path: '/services/financial-advisory' },
    { label: 'Corporate Secretarial',     path: '/services/corporate-secretarial' },
  ],
  legal: [
    { label: 'Privacy Policy', path: '/privacy-policy' },
  ],
};

export const CURRENT_YEAR = new Date().getFullYear();
