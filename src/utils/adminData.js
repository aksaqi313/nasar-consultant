// ─────────────────────────────────────────────────────────────
// NASAR CONSULTANT — Admin Data Layer & Persistence Store
// Manages local storage persistence for Inquiries, Insights, Careers, Applications & Settings
// ─────────────────────────────────────────────────────────────

const STORAGE_KEYS = {
  INQUIRIES: 'nasar_admin_inquiries',
  INSIGHTS: 'nasar_admin_insights',
  JOBS: 'nasar_admin_jobs',
  APPLICATIONS: 'nasar_admin_applications',
  SETTINGS: 'nasar_admin_settings',
  SERVICES: 'nasar_admin_services',
  HOME_CONTENT: 'nasar_admin_home_content',
};

export const INITIAL_HOME_CONTENT = {
  hero: {
    badge: 'Nasar Consultant',
    headlinePrefix: 'Excellence in',
    headlineHighlight: 'Accounting',
    headlineSuffix: '& Financial Advisory',
    subtitle: 'Delivering professional accounting, taxation, and financial advisory services to empower businesses and individuals with clarity, compliance, and confidence.',
    primaryBtnText: 'Schedule a Consultation',
    primaryBtnLink: '/contact',
    secondaryBtnText: 'Explore Our Services',
    secondaryBtnLink: '/services',
    // Background options
    bgType: 'gradient', // 'gradient' | 'image'
    bgGradient: 'navy-classic', // 'navy-classic' | 'navy-dark' | 'midnight-sapphire' | 'charcoal-gold'
    bgImageUrl: '',
    bgOverlayOpacity: 85,
    showPattern: true,
    showGlowingOrbs: true,
    // Trust statistics
    stat1Value: '15+',
    stat1Label: 'Years of Experience',
    stat2Value: '500+',
    stat2Label: 'Clients Served',
    stat3Value: '50+',
    stat3Label: 'Professional Staff',
  },
  about: {
    sectionLabel: 'Who We Are',
    titlePrefix: 'A Trusted Partner for',
    titleHighlight: 'Financial Excellence',
    paragraph1: 'Nasar Consultant is a professional consultancy firm specializing in accounting, taxation, and financial advisory services. We are committed to helping businesses navigate complex financial landscapes with clarity and confidence.',
    paragraph2: 'Our team of experienced professionals brings together expertise across multiple disciplines to deliver comprehensive solutions tailored to your business needs.',
    buttonText: 'Learn More About Us',
    buttonLink: '/about',
  },
  cta: {
    badge: 'Get Started Today',
    titlePrefix: 'Ready to Elevate Your',
    titleHighlight: 'Financial Strategy?',
    subtitle: 'Whether you need audit support, tax advisory, or comprehensive financial guidance, our team is ready to help you achieve your goals.',
    primaryBtnText: 'Schedule a Consultation',
    primaryBtnLink: '/contact',
    secondaryBtnText: 'Explore Our Services',
    secondaryBtnLink: '/services',
    bgGradient: 'navy-classic',
  },
};

// ── Initial Seed Data ──────────────────────────────────────────

const INITIAL_INQUIRIES = [
  {
    id: 'inq-101',
    firstName: 'Tariq',
    lastName: 'Mahmood',
    email: 'tariq@textilespak.com',
    phone: '+92 300 1234567',
    subject: 'Corporate Tax Audit Support for FY 2024-25',
    service: 'Taxation Services',
    message: 'We are looking for assistance with our upcoming FBR corporate income tax audit and sales tax reconciliation. Please let us know your availability for an introductory consultation next week.',
    status: 'new', // 'new' | 'in-progress' | 'resolved' | 'archived'
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    notes: '',
  },
  {
    id: 'inq-102',
    firstName: 'Ayesha',
    lastName: 'Khan',
    email: 'ayesha.k@alphalogistics.com.pk',
    phone: '+92 321 9876543',
    subject: 'Monthly Bookkeeping & Payroll Outsourcing',
    service: 'Accounting & Bookkeeping',
    message: 'Our company has 45 employees and we want to outsource our complete monthly bookkeeping, EOBI, and payroll processing. Looking for a comprehensive quote.',
    status: 'in-progress',
    createdAt: new Date(Date.now() - 28 * 3600 * 1000).toISOString(),
    notes: 'Called client on phone. Sending proposal document by tomorrow.',
  },
  {
    id: 'inq-103',
    firstName: 'Dr. Salman',
    lastName: 'Farooq',
    email: 'dr.farooq@healthcaresolutions.org',
    phone: '+92 333 4567890',
    subject: 'Internal Controls & Financial Due Diligence',
    service: 'Financial Advisory',
    message: 'We are in discussions to acquire a regional diagnostic center and require professional financial due diligence and valuation services before concluding terms.',
    status: 'resolved',
    createdAt: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
    notes: 'Due diligence scope agreed. Engagement letter signed.',
  },
  {
    id: 'inq-104',
    firstName: 'Zainab',
    lastName: 'Bilal',
    email: 'zainab@fintechinnovate.io',
    phone: '+92 345 6789012',
    subject: 'SECP Company Incorporation & Secretarial Compliance',
    service: 'Corporate Secretarial',
    message: 'We are founding a technology startup and need guidance regarding SECP registration, NTN, sales tax registration, and structuring of share capital.',
    status: 'new',
    createdAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    notes: '',
  },
];

const INITIAL_INSIGHTS = [
  {
    id: 'art-1',
    slug: 'understanding-fbr-annual-return-2025',
    category: 'Taxation',
    title: 'Understanding FBR Annual Return Filing for 2025',
    excerpt: 'A practical guide to understanding the key deadlines, requirements, and common mistakes to avoid when filing your annual income tax return with the FBR.',
    content: `Filing annual tax returns in Pakistan has seen critical procedural changes following the recent Finance Act amendments. Companies and salaried individuals alike must adapt to tighter documentation standards and digital wealth statements.\n\n### Key Highlights for 2025:\n1. Mandatory Active Taxpayer List (ATL) verification for corporate transactions.\n2. Enhanced penalties for non-filing and delayed submissions.\n3. Detailed reconciliations required between provincial sales tax declarations and federal income statements.\n\nOur advisory team strongly recommends reconciling bank accounts and withholding certificates well in advance to prevent system discrepancies during Iris portal submission.`,
    date: '2025-09-15',
    readTime: '6 min read',
    author: 'Nasar Senior Tax Team',
    status: 'published', // 'published' | 'draft'
    views: 1420,
  },
  {
    id: 'art-2',
    slug: 'ifrs-updates-for-smes-pakistan',
    category: 'Accounting',
    title: 'Key IFRS Updates Affecting SMEs in Pakistan',
    excerpt: 'An overview of the latest International Financial Reporting Standards updates and what they mean for small and medium-sized businesses operating in Pakistan.',
    content: `The adoption of updated reporting guidelines under IFRS for SMEs introduces refined classifications for revenue recognition, leases, and financial instruments.\n\nFor Pakistani SMEs, these revisions demand greater precision in record-keeping, especially regarding supplier credit agreements and asset depreciation schedules. Preparing early ensures seamless external audit clearance.`,
    date: '2025-08-28',
    readTime: '8 min read',
    author: 'Audit & Advisory Board',
    status: 'published',
    views: 980,
  },
  {
    id: 'art-3',
    slug: 'payroll-compliance-guide',
    category: 'Payroll',
    title: 'Complete Payroll Compliance Guide for Pakistan Employers',
    excerpt: 'Everything employers need to know about EOBI contributions, PESSI obligations, income tax deductions, and maintaining clean payroll records.',
    content: `Maintaining clean and compliant payroll records is a non-negotiable legal obligation. Employers face severe audits if monthly withholding tax deductions under Section 149 are not properly matched with challans on the e-portal.\n\nFurthermore, timely contributions to EOBI (Employees' Old-Age Benefits Institution) and provincial social security institutions protect management from unnecessary legal liabilities.`,
    date: '2025-07-10',
    readTime: '10 min read',
    author: 'HR & Payroll Services Group',
    status: 'published',
    views: 2150,
  },
  {
    id: 'art-4',
    slug: 'mergers-acquisitions-due-diligence',
    category: 'Financial Advisory',
    title: 'Why Financial Due Diligence Is Critical in M&A Transactions',
    excerpt: 'Mergers and acquisitions carry significant financial risk. This article explores how rigorous due diligence protects buyers and sellers alike.',
    content: `A thorough financial due diligence process looks beyond historical balance sheets to evaluate underlying cash flows, contingent tax liabilities, customer concentration risks, and normalized EBITDA.\n\nDiscover how structured audit findings help buyers negotiate favorable representations, warranties, and purchase price adjustments.`,
    date: '2025-06-22',
    readTime: '7 min read',
    author: 'Corporate Advisory Practice',
    status: 'draft',
    views: 310,
  },
];

const INITIAL_JOBS = [
  {
    id: 'audit-associate-2025',
    title: 'Audit Associate',
    department: 'Audit & Assurance',
    type: 'Full-time',
    location: 'Lahore / On-site',
    experience: '1–3 years',
    deadline: '2026-03-31',
    summary: 'We are looking for a motivated Audit Associate to join our Audit & Assurance team. You will assist in planning and executing statutory audit engagements across a range of industries.',
    status: 'active',
  },
  {
    id: 'tax-consultant-2025',
    title: 'Tax Consultant',
    department: 'Taxation',
    type: 'Full-time',
    location: 'Lahore / Hybrid',
    experience: '2–4 years',
    deadline: '2026-04-15',
    summary: 'We seek an experienced Tax Consultant with strong knowledge of Pakistani income tax and sales tax regulations to manage client compliance portfolios and dispute representations.',
    status: 'active',
  },
  {
    id: 'accounts-officer-2025',
    title: 'Accounts Officer',
    department: 'Accounting',
    type: 'Full-time',
    location: 'Lahore / On-site',
    experience: '1–2 years',
    deadline: '2026-03-15',
    summary: 'An Accounts Officer is required to maintain client bookkeeping records, prepare monthly management accounts, and support the senior accounting team.',
    status: 'active',
  },
  {
    id: 'internship-2026',
    title: 'Internship Program — Spring 2026',
    department: 'All Departments',
    type: 'Internship',
    location: 'Lahore / On-site',
    experience: 'Fresh graduates / Final year',
    deadline: '2026-05-30',
    summary: 'Our structured internship program gives final-year students and fresh graduates hands-on exposure to accounting, tax, and audit practice in a professional environment.',
    status: 'active',
  },
];

const INITIAL_APPLICATIONS = [
  {
    id: 'app-501',
    applicantName: 'Hamza Tariq',
    email: 'hamza.tariq@gmail.com',
    phone: '+92 301 2345678',
    jobId: 'audit-associate-2025',
    jobTitle: 'Audit Associate',
    experience: '2 years at Big 4 affiliate',
    education: 'ACCA Member / B.Sc Applied Accounting',
    appliedDate: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    status: 'Shortlisted', // 'Pending' | 'Reviewing' | 'Shortlisted' | 'Interview' | 'Hired' | 'Rejected'
    coverLetter: 'I have 2 years of audit experience handling manufacturing and consumer goods clients. I am eager to contribute to Nasar Consultant’s growing assurance team.',
    resumeName: 'Hamza_Tariq_CV.pdf',
  },
  {
    id: 'app-502',
    applicantName: 'Mariam Siddiqui',
    email: 'mariam.siddiqui@outlook.com',
    phone: '+92 312 9876543',
    jobId: 'tax-consultant-2025',
    jobTitle: 'Tax Consultant',
    experience: '3 years in direct taxation',
    education: 'CA Finalist (ICAP)',
    appliedDate: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    status: 'Interview',
    coverLetter: 'Extensive hands-on experience handling Iris portal returns, withholding statements, and assisting in appeals before Commissioner (Appeals).',
    resumeName: 'Mariam_Tax_Resume.pdf',
  },
  {
    id: 'app-503',
    applicantName: 'Usman Ali',
    email: 'usman.ali99@yahoo.com',
    phone: '+92 334 1122334',
    jobId: 'accounts-officer-2025',
    jobTitle: 'Accounts Officer',
    experience: '1.5 years',
    education: 'B.Com / CMA Inter',
    appliedDate: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
    status: 'Reviewing',
    coverLetter: 'Proficient in QuickBooks, Xero, Excel financial modeling, and managing AP/AR cycles accurately.',
    resumeName: 'Usman_Ali_Bookkeeping.pdf',
  },
  {
    id: 'app-504',
    applicantName: 'Fatima Noor',
    email: 'fatima.noor@lums.edu.pk',
    phone: '+92 322 7788990',
    jobId: 'internship-2026',
    jobTitle: 'Internship Program — Spring 2026',
    experience: 'Undergraduate student',
    education: 'B.Sc Accounting & Finance (Senior Year)',
    appliedDate: new Date(Date.now() - 96 * 3600 * 1000).toISOString(),
    status: 'Pending',
    coverLetter: 'Passionate about pursuing a career in audit advisory. Consistently on the Dean’s Honor List with high analytical acumen.',
    resumeName: 'Fatima_Noor_Resume.pdf',
  },
];

const INITIAL_SERVICES = [
  { id: 'audit', title: 'Audit & Assurance', slug: 'audit-assurance', active: true, desc: 'Statutory audits, internal control reviews, and compliance assurance.' },
  { id: 'tax', title: 'Taxation Services', slug: 'taxation-services', active: true, desc: 'Corporate & personal income tax, sales tax, FBR representation.' },
  { id: 'accounting', title: 'Accounting & Bookkeeping', slug: 'accounting-bookkeeping', active: true, desc: 'Cloud accounting, financial statements, and day-to-day general ledgers.' },
  { id: 'advisory', title: 'Financial Advisory', slug: 'financial-advisory', active: true, desc: 'M&A due diligence, business valuation, and feasibility analysis.' },
  { id: 'corporate', title: 'Corporate Secretarial', slug: 'corporate-secretarial', active: true, desc: 'SECP compliance, company incorporation, and legal corporate filings.' },
  { id: 'payroll', title: 'Payroll Services', slug: 'payroll-services', active: true, desc: 'End-to-end payroll runs, EOBI, social security, and tax deduction challans.' },
];

const INITIAL_SETTINGS = {
  companyName: 'Nasar Consultant',
  tagline: 'Accounting, Taxation & Financial Services',
  email: 'info@nasarconsultant.com',
  phone: '+92 (042) 3578-9000',
  address: 'Suite 402, Business Avenue, Gulberg III',
  city: 'Lahore, Pakistan',
  officeHours: 'Monday – Friday: 9:00 AM – 6:00 PM',
  social: {
    linkedin: 'https://linkedin.com/company/nasar-consultant',
    twitter: 'https://twitter.com/nasarconsultant',
    facebook: 'https://facebook.com/nasarconsultant',
    instagram: 'https://instagram.com/nasarconsultant',
  },
  adminEmail: 'admin@nasarconsultant.com',
  adminPassword: 'admin', // default demo password
  notifyEmail: true,
};

// ── Generic LocalStorage Helpers ───────────────────────────────

function getStored(key, defaultValue) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error('Storage Read Error for key:', key, e);
    return defaultValue;
  }
}

function setStored(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Storage Write Error for key:', key, e);
  }
}

// ── Data API Methods ───────────────────────────────────────────

export const AdminDataAPI = {
  // ── Inquiries ──
  getInquiries: () => getStored(STORAGE_KEYS.INQUIRIES, INITIAL_INQUIRIES),
  saveInquiry: (inquiry) => {
    const list = AdminDataAPI.getInquiries();
    const newInquiry = {
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'new',
      notes: '',
      ...inquiry,
    };
    const updated = [newInquiry, ...list];
    setStored(STORAGE_KEYS.INQUIRIES, updated);
    return newInquiry;
  },
  updateInquiry: (id, updates) => {
    const list = AdminDataAPI.getInquiries();
    const updated = list.map((item) => (item.id === id ? { ...item, ...updates } : item));
    setStored(STORAGE_KEYS.INQUIRIES, updated);
    return updated;
  },
  deleteInquiry: (id) => {
    const list = AdminDataAPI.getInquiries();
    const updated = list.filter((item) => item.id !== id);
    setStored(STORAGE_KEYS.INQUIRIES, updated);
    return updated;
  },

  // ── Insights ──
  getInsights: () => getStored(STORAGE_KEYS.INSIGHTS, INITIAL_INSIGHTS),
  createInsight: (article) => {
    const list = AdminDataAPI.getInsights();
    const newArt = {
      id: `art-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      views: 0,
      status: 'published',
      readTime: '5 min read',
      ...article,
    };
    const updated = [newArt, ...list];
    setStored(STORAGE_KEYS.INSIGHTS, updated);
    return newArt;
  },
  updateInsight: (id, updates) => {
    const list = AdminDataAPI.getInsights();
    const updated = list.map((item) => (item.id === id ? { ...item, ...updates } : item));
    setStored(STORAGE_KEYS.INSIGHTS, updated);
    return updated;
  },
  deleteInsight: (id) => {
    const list = AdminDataAPI.getInsights();
    const updated = list.filter((item) => item.id !== id);
    setStored(STORAGE_KEYS.INSIGHTS, updated);
    return updated;
  },

  // ── Jobs ──
  getJobs: () => getStored(STORAGE_KEYS.JOBS, INITIAL_JOBS),
  createJob: (job) => {
    const list = AdminDataAPI.getJobs();
    const newJob = {
      id: `job-${Date.now()}`,
      status: 'active',
      ...job,
    };
    const updated = [newJob, ...list];
    setStored(STORAGE_KEYS.JOBS, updated);
    return newJob;
  },
  updateJob: (id, updates) => {
    const list = AdminDataAPI.getJobs();
    const updated = list.map((item) => (item.id === id ? { ...item, ...updates } : item));
    setStored(STORAGE_KEYS.JOBS, updated);
    return updated;
  },
  deleteJob: (id) => {
    const list = AdminDataAPI.getJobs();
    const updated = list.filter((item) => item.id !== id);
    setStored(STORAGE_KEYS.JOBS, updated);
    return updated;
  },

  // ── Applications ──
  getApplications: () => getStored(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS),
  saveApplication: (app) => {
    const list = AdminDataAPI.getApplications();
    const newApp = {
      id: `app-${Date.now()}`,
      appliedDate: new Date().toISOString(),
      status: 'Pending',
      ...app,
    };
    const updated = [newApp, ...list];
    setStored(STORAGE_KEYS.APPLICATIONS, updated);
    return newApp;
  },
  updateApplicationStatus: (id, status) => {
    const list = AdminDataAPI.getApplications();
    const updated = list.map((item) => (item.id === id ? { ...item, status } : item));
    setStored(STORAGE_KEYS.APPLICATIONS, updated);
    return updated;
  },
  deleteApplication: (id) => {
    const list = AdminDataAPI.getApplications();
    const updated = list.filter((item) => item.id !== id);
    setStored(STORAGE_KEYS.APPLICATIONS, updated);
    return updated;
  },

  // ── Services ──
  getServices: () => getStored(STORAGE_KEYS.SERVICES, INITIAL_SERVICES),
  updateService: (id, updates) => {
    const list = AdminDataAPI.getServices();
    const updated = list.map((item) => (item.id === id ? { ...item, ...updates } : item));
    setStored(STORAGE_KEYS.SERVICES, updated);
    return updated;
  },
  createService: (service) => {
    const list = AdminDataAPI.getServices();
    const newService = {
      id: `srv-${Date.now()}`,
      active: true,
      ...service,
    };
    const updated = [...list, newService];
    setStored(STORAGE_KEYS.SERVICES, updated);
    return newService;
  },

  // ── Settings ──
  getSettings: () => getStored(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS),
  updateSettings: (newSettings) => {
    const current = AdminDataAPI.getSettings();
    const updated = { ...current, ...newSettings };
    setStored(STORAGE_KEYS.SETTINGS, updated);
    return updated;
  },

  // ── Home Content & Customization ──
  getHomeContent: () => getStored(STORAGE_KEYS.HOME_CONTENT, INITIAL_HOME_CONTENT),
  updateHomeContent: (newContent) => {
    const current = AdminDataAPI.getHomeContent();
    const updated = {
      hero: { ...current.hero, ...(newContent.hero || {}) },
      about: { ...current.about, ...(newContent.about || {}) },
      cta: { ...current.cta, ...(newContent.cta || {}) },
    };
    setStored(STORAGE_KEYS.HOME_CONTENT, updated);
    return updated;
  },

  // ── Reset ──
  resetAllToDefault: () => {
    setStored(STORAGE_KEYS.INQUIRIES, INITIAL_INQUIRIES);
    setStored(STORAGE_KEYS.INSIGHTS, INITIAL_INSIGHTS);
    setStored(STORAGE_KEYS.JOBS, INITIAL_JOBS);
    setStored(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
    setStored(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
    setStored(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
    setStored(STORAGE_KEYS.HOME_CONTENT, INITIAL_HOME_CONTENT);
  },
};

