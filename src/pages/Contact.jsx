import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import {
  MapPin, Phone, Mail, Clock,
  Send, CheckCircle, AlertCircle,
} from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import { SITE_NAME, CONTACT } from '../utils/constants';
import { AdminDataAPI } from '../utils/adminData';

// ── Contact Info Items ────────────────────────────────────────
const INFO_ITEMS = [
  {
    icon: MapPin,
    label: 'Our Office',
    lines: [CONTACT.address, CONTACT.city],
  },
  {
    icon: Phone,
    label: 'Call Us',
    lines: [CONTACT.phone],
    href: `tel:${CONTACT.phone}`,
  },
  {
    icon: Mail,
    label: 'Email Us',
    lines: [CONTACT.email],
    href: `mailto:${CONTACT.email}`,
  },
  {
    icon: Clock,
    label: 'Office Hours',
    lines: [CONTACT.hours],
  },
];

// ── Contact Form ──────────────────────────────────────────────
const ContactForm = () => {
  const initialState = {
    firstName: '', lastName: '', email: '',
    phone: '', subject: '', service: '', message: '',
  };
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errors, setErrors] = useState({});

  const SERVICES = [
    'Audit & Assurance',
    'Taxation Services',
    'Accounting & Bookkeeping',
    'Financial Advisory',
    'Corporate Secretarial',
    'Payroll Services',
    'General Enquiry',
  ];

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Required.';
    if (!form.lastName.trim()) e.lastName = 'Required.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Valid email required.';
    if (!form.message.trim() || form.message.trim().length < 20)
      e.message = 'Please provide at least 20 characters.';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus('submitting');
    try {
      AdminDataAPI.saveInquiry({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        subject: form.subject || form.service || 'Website Consultation Request',
        service: form.service || 'General Enquiry',
        message: form.message,
      });
      await new Promise((r) => setTimeout(r, 600));
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="card p-12 text-center h-full flex flex-col items-center justify-center">
        <CheckCircle className="text-green-500 mb-5" size={52} />
        <h3 className="font-heading text-navy-800 text-2xl font-bold mb-3">
          Message Sent!
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
          Thank you for reaching out. One of our team members will be in contact with you shortly.
        </p>
        <p className="text-gray-400 text-xs mt-5">
          ⚠️ This is currently simulated. Real inquiries will be saved to the database in Phase 6.
        </p>
        <button
          className="btn-outline-navy mt-6 text-sm"
          onClick={() => { setForm(initialState); setStatus('idle'); }}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  const field = (name) =>
    `w-full px-4 py-3 text-sm border text-navy-800 bg-white placeholder-gray-400
     focus:outline-none focus:border-gold transition-colors duration-200
     ${errors[name] ? 'border-red-400' : 'border-gray-200'}`;

  return (
    <form onSubmit={handleSubmit} noValidate className="card p-8 space-y-5" id="contact-form">
      <h2 className="font-heading text-navy-800 text-xl font-bold">Send Us a Message</h2>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-navy-700 mb-1.5" htmlFor="cf-firstName">First Name *</label>
          <input id="cf-firstName" name="firstName" type="text" value={form.firstName}
            onChange={handleChange} placeholder="Jane" className={field('firstName')} />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-navy-700 mb-1.5" htmlFor="cf-lastName">Last Name *</label>
          <input id="cf-lastName" name="lastName" type="text" value={form.lastName}
            onChange={handleChange} placeholder="Doe" className={field('lastName')} />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-navy-700 mb-1.5" htmlFor="cf-email">Email Address *</label>
        <input id="cf-email" name="email" type="email" value={form.email}
          onChange={handleChange} placeholder="jane@example.com" className={field('email')} />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-xs font-semibold text-navy-700 mb-1.5" htmlFor="cf-phone">Phone <span className="text-gray-400 font-normal">(optional)</span></label>
        <input id="cf-phone" name="phone" type="tel" value={form.phone}
          onChange={handleChange} placeholder="+92 300 0000000" className={field('phone')} />
      </div>

      <div>
        <label className="block text-xs font-semibold text-navy-700 mb-1.5" htmlFor="cf-service">Service of Interest</label>
        <select id="cf-service" name="service" value={form.service}
          onChange={handleChange} className={field('service')}>
          <option value="">Select a service...</option>
          {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-navy-700 mb-1.5" htmlFor="cf-message">Message *</label>
        <textarea id="cf-message" name="message" rows={5} value={form.message}
          onChange={handleChange}
          placeholder="Please describe how we can help you..."
          className={field('message') + ' resize-none'} />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
      </div>

      <button
        type="submit"
        id="submit-contact"
        disabled={status === 'submitting'}
        className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Sending…' : (
          <><Send size={14} /> Send Message</>
        )}
      </button>

      <p className="text-gray-400 text-xs text-center flex items-start gap-1 justify-center">
        <AlertCircle size={11} className="mt-0.5 flex-shrink-0" />
        Form is currently simulated. Real inquiries will be stored in the database in Phase 6.
      </p>
    </form>
  );
};

// ── Contact Page ──────────────────────────────────────────────
const Contact = () => (
  <>
    <Helmet>
      <title>Contact Us — {SITE_NAME}</title>
      <meta
        name="description"
        content={`Get in touch with ${SITE_NAME}. We are ready to answer your questions about accounting, taxation, and financial services.`}
      />
    </Helmet>

    <PageHero
      label="Get in Touch"
      title="Contact Us"
      subtitle="We would love to hear from you. Reach out to schedule a consultation or ask any questions."
      breadcrumb={[{ label: 'Contact' }]}
    />

    {/* ── Main content ─────────────────────────────────────── */}
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left — info + map */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className="section-label">Find Us</span>
              <h2 className="section-title mt-2 text-3xl">Get in Touch</h2>
              <div className="gold-divider" />
              <p className="section-subtitle mt-5 text-sm">
                Whether you need help with tax compliance, financial reporting, or strategic
                advisory, our team is ready to assist.
              </p>
            </div>

            {/* Info cards */}
            <div className="space-y-4">
              {INFO_ITEMS.map(({ icon: Icon, label, lines, href }) => (
                <div key={label} className="card p-5 flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-gold" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-navy-700 uppercase tracking-wide mb-1">{label}</div>
                    {lines.map((line, i) =>
                      href ? (
                        <a key={i} href={href}
                          className="block text-sm text-gray-600 hover:text-gold transition-colors duration-200">
                          {line}
                        </a>
                      ) : (
                        <p key={i} className="text-sm text-gray-600">{line}</p>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="bg-navy-100 h-56 flex items-center justify-center border border-gray-200">
              <div className="text-center text-gray-400">
                <MapPin size={28} className="mx-auto mb-2 text-gold/50" />
                <p className="text-xs">Google Maps embed will appear here.</p>
                <p className="text-xs mt-1">[Provide verified address to enable map.]</p>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  </>
);

export default Contact;
