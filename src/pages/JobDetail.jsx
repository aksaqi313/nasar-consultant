import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  MapPin, Clock, Briefcase, ArrowLeft, CheckCircle,
  Upload, Send, AlertCircle,
} from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import { SITE_NAME } from '../utils/constants';
import { AdminDataAPI } from '../utils/adminData';

// ── Job data (same as Careers.jsx — Phase 6 will use API) ─────
const JOBS = {
  'audit-associate-2025': {
    id: 'audit-associate-2025',
    title: 'Audit Associate',
    department: 'Audit & Assurance',
    type: 'Full-time',
    location: '[City — Placeholder]',
    experience: '1–3 years',
    deadline: '2025-11-30',
    description: `
      <p>We are seeking a motivated and detail-oriented <strong>Audit Associate</strong> to join our growing Audit & Assurance practice. In this role, you will work directly with senior auditors and managers across a diverse portfolio of clients in manufacturing, retail, and financial services.</p>
      <h3>Key Responsibilities</h3>
      <ul>
        <li>Assist in planning and executing statutory and internal audit engagements</li>
        <li>Prepare working papers, schedules, and audit documentation</li>
        <li>Perform analytical procedures and tests of controls</li>
        <li>Liaise with client finance teams to obtain necessary information</li>
        <li>Identify control weaknesses and draft management letter points</li>
        <li>Assist in drafting audit reports under senior supervision</li>
      </ul>
      <h3>Requirements</h3>
      <ul>
        <li>ACCA / CA (finalist or newly qualified) or relevant accounting degree</li>
        <li>1–3 years of audit experience (public accounting preferred)</li>
        <li>Strong understanding of ISA and IFRS</li>
        <li>Proficiency in MS Excel and accounting software</li>
        <li>Excellent communication and report-writing skills</li>
        <li>Ability to manage multiple engagements under deadlines</li>
      </ul>
      <h3>What We Offer</h3>
      <ul>
        <li>Competitive market salary (commensurate with experience)</li>
        <li>Professional exam support and study leave</li>
        <li>Structured career progression pathway</li>
        <li>Friendly, professional work environment</li>
      </ul>
    `,
  },
};

const PLACEHOLDER_JOB = {
  title: '[Job Title — Placeholder]',
  department: '[Department]',
  type: 'Full-time',
  location: '[City — Placeholder]',
  experience: '[Experience Required]',
  deadline: '2025-12-31',
  description: `<p>Full job description will be available via the Admin Dashboard once the backend is connected in Phase 7. All job listings will be created and managed by authorized administrators.</p>`,
};

const formatDeadline = (d) =>
  new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

// ── Application Form ──────────────────────────────────────────
const ApplicationForm = ({ jobTitle }) => {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    phone: '', coverLetter: '', resume: null,
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'First name is required.';
    if (!form.lastName.trim()) e.lastName = 'Last name is required.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'A valid email is required.';
    if (!form.phone.trim()) e.phone = 'Phone number is required.';
    if (!form.resume) e.resume = 'Please upload your CV / resume.';
    else if (!['application/pdf', 'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      .includes(form.resume.type))
      e.resume = 'Only PDF or Word documents are accepted.';
    else if (form.resume.size > 5 * 1024 * 1024)
      e.resume = 'File must be smaller than 5 MB.';
    return e;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({ ...prev, [name]: files ? files[0] : value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus('submitting');
    try {
      AdminDataAPI.saveApplication({
        applicantName: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
        phone: form.phone,
        jobTitle: jobTitle,
        coverLetter: form.coverLetter,
        resumeName: form.resume ? form.resume.name : 'CV_Upload.pdf',
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
      <div className="card p-10 text-center">
        <CheckCircle className="text-green-500 mx-auto mb-4" size={48} />
        <h3 className="font-heading text-navy-800 text-2xl font-bold mb-2">Application Submitted!</h3>
        <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
          Thank you for your interest in the <strong>{jobTitle}</strong> role. We will review your
          application and be in touch if your profile matches our requirements.
        </p>
        <p className="text-gray-400 text-xs mt-4">
          ⚠️ Form submission is currently simulated. Real submissions will be saved to the database in Phase 6.
        </p>
        <Link to="/careers" className="btn-navy mt-6">
          <ArrowLeft size={14} /> Back to All Roles
        </Link>
      </div>
    );
  }

  const fieldClass = (name) =>
    `w-full px-4 py-3 text-sm border text-navy-800 bg-white
     placeholder-gray-400 focus:outline-none focus:border-gold transition-colors duration-200
     ${errors[name] ? 'border-red-400' : 'border-gray-200'}`;

  return (
    <form onSubmit={handleSubmit} noValidate className="card p-8 space-y-6" id="application-form">
      <h2 className="font-heading text-navy-800 text-xl font-bold">Apply for This Role</h2>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-navy-700 mb-1.5" htmlFor="firstName">First Name *</label>
          <input id="firstName" name="firstName" type="text" value={form.firstName}
            onChange={handleChange} placeholder="Jane" className={fieldClass('firstName')} />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-navy-700 mb-1.5" htmlFor="lastName">Last Name *</label>
          <input id="lastName" name="lastName" type="text" value={form.lastName}
            onChange={handleChange} placeholder="Doe" className={fieldClass('lastName')} />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-navy-700 mb-1.5" htmlFor="email">Email Address *</label>
        <input id="email" name="email" type="email" value={form.email}
          onChange={handleChange} placeholder="jane@example.com" className={fieldClass('email')} />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-xs font-semibold text-navy-700 mb-1.5" htmlFor="phone">Phone Number *</label>
        <input id="phone" name="phone" type="tel" value={form.phone}
          onChange={handleChange} placeholder="+92 300 0000000" className={fieldClass('phone')} />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
      </div>

      <div>
        <label className="block text-xs font-semibold text-navy-700 mb-1.5" htmlFor="coverLetter">
          Cover Letter <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <textarea id="coverLetter" name="coverLetter" rows={5} value={form.coverLetter}
          onChange={handleChange}
          placeholder="Tell us why you are a great fit for this role..."
          className={fieldClass('coverLetter') + ' resize-none'} />
      </div>

      <div>
        <label className="block text-xs font-semibold text-navy-700 mb-1.5" htmlFor="resume">
          CV / Resume * <span className="text-gray-400 font-normal">(PDF or Word, max 5 MB)</span>
        </label>
        <label
          htmlFor="resume"
          className={`flex items-center gap-3 px-4 py-4 border-2 border-dashed cursor-pointer
                      transition-colors duration-200 text-sm
                      ${errors.resume
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-200 bg-gray-50 hover:border-gold hover:bg-gold/5'}`}
        >
          <Upload size={18} className="text-gray-400 flex-shrink-0" />
          <span className="text-gray-500">
            {form.resume ? form.resume.name : 'Click to upload your CV'}
          </span>
          <input
            id="resume"
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            className="sr-only"
            onChange={handleChange}
          />
        </label>
        {errors.resume && <p className="text-red-500 text-xs mt-1">{errors.resume}</p>}
      </div>

      <button
        type="submit"
        id="submit-application"
        disabled={status === 'submitting'}
        className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Submitting…' : (
          <><Send size={14} /> Submit Application</>
        )}
      </button>

      <p className="text-gray-400 text-xs text-center">
        ⚠️ Submissions are currently simulated. Real applications will be stored in the database in Phase 6.
      </p>
    </form>
  );
};

// ── JobDetail Page ────────────────────────────────────────────
const JobDetail = () => {
  const { id } = useParams();
  const job = JOBS[id] || { ...PLACEHOLDER_JOB, id, title: `[Role: ${id}]` };

  return (
    <>
      <Helmet>
        <title>{job.title} — Careers at {SITE_NAME}</title>
        <meta name="description" content={`Apply for the ${job.title} position at ${SITE_NAME}.`} />
      </Helmet>

      <PageHero
        label="Careers"
        title={job.title}
        subtitle={`${job.department} · ${job.type} · ${job.location}`}
        breadcrumb={[
          { label: 'Careers', path: '/careers' },
          { label: job.title },
        ]}
      />

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Job description */}
            <div className="lg:col-span-2">
              {/* Meta chips */}
              <div className="flex flex-wrap gap-4 mb-8 p-6 bg-white border border-gray-100">
                {[
                  { icon: Briefcase, label: job.department },
                  { icon: MapPin, label: job.location },
                  { icon: Clock, label: `Deadline: ${formatDeadline(job.deadline)}` },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-navy-700 text-sm">
                    <Icon size={14} className="text-gold" />
                    {label}
                  </div>
                ))}
              </div>

              <div
                className="prose prose-navy max-w-none
                           prose-headings:font-heading prose-headings:text-navy-800
                           prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
                           prose-p:text-gray-600 prose-p:leading-relaxed
                           prose-li:text-gray-600 prose-li:my-1"
                dangerouslySetInnerHTML={{ __html: job.description }}
              />

              <Link
                to="/careers"
                className="inline-flex items-center gap-2 text-navy-700 hover:text-gold
                           text-sm font-medium transition-colors duration-200 mt-8"
              >
                <ArrowLeft size={14} /> Back to All Roles
              </Link>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              <ApplicationForm jobTitle={job.title} />

              <div className="card p-6">
                <AlertCircle size={16} className="text-gold mb-3" />
                <p className="text-gray-500 text-xs leading-relaxed">
                  Applications are reviewed on a rolling basis. Only shortlisted candidates will be contacted.
                  All information provided is treated with strict confidentiality.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobDetail;
