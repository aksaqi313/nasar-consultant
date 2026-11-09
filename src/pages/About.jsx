import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Target, Eye, Heart, Users, Award, TrendingUp,
  CheckCircle, ArrowRight, Shield, Lightbulb,
} from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import CTASection from '../components/home/CTASection';
import { SITE_NAME } from '../utils/constants';

// ── Data (replace placeholders once verified) ────────────────
const VALUES = [
  {
    icon: Shield,
    title: 'Integrity',
    description:
      'We uphold the highest ethical standards in every engagement, ensuring our clients can trust us completely.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description:
      'We are committed to delivering work of the highest quality, continuously improving our skills and processes.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description:
      'We embrace modern approaches and technology to provide forward-thinking solutions to complex challenges.',
  },
  {
    icon: Heart,
    title: 'Client Focus',
    description:
      'Your success is our success. We listen carefully and tailor our services to your unique business needs.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description:
      'We work closely with our clients, building long-term partnerships built on open communication and mutual respect.',
  },
  {
    icon: TrendingUp,
    title: 'Growth',
    description:
      'We invest in our people and our clients, fostering an environment where everyone can thrive and grow.',
  },
];

const WHY_US = [
  'Deep expertise in Pakistani taxation and regulatory environment',
  'Dedicated relationship managers for every client',
  'Transparent pricing with no hidden costs',
  'Timely delivery with attention to detail',
  'Up-to-date with latest tax laws and IFRS standards',
  'Confidential handling of all financial information',
];

const STATS = [
  { value: '[X]+', label: 'Years of Experience' },
  { value: '[X]+', label: 'Clients Served' },
  { value: '[X]+', label: 'Professionals' },
  { value: '[X]%', label: 'Client Retention Rate' },
];

// ── Component ─────────────────────────────────────────────────
const About = () => (
  <>
    <Helmet>
      <title>About Us — {SITE_NAME}</title>
      <meta
        name="description"
        content={`Learn about ${SITE_NAME}'s mission, values, and the experienced team behind our accounting, taxation, and financial advisory services.`}
      />
    </Helmet>

    <PageHero
      label="Our Story"
      title="About Nasar Consultant"
      subtitle="A trusted partner for businesses and individuals seeking professional accounting, taxation, and financial advisory services."
      breadcrumb={[{ label: 'About Us' }]}
    />

    {/* ── Mission & Vision ───────────────────────────────────── */}
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <div>
            <span className="section-label">Who We Are</span>
            <h2 className="section-title mt-2">
              Built on Trust,<br />Driven by Excellence
            </h2>
            <div className="gold-divider" />
            <p className="section-subtitle mt-6">
              {/* PLACEHOLDER — replace with verified company history */}
              [Company founding story and background — to be provided by the client.
              Describe when the firm was established, by whom, and the journey to becoming
              a trusted consultancy.]
            </p>
            <p className="section-subtitle mt-4">
              [Describe the firm's core expertise areas, notable achievements, and what
              sets it apart from other accounting firms in the region.]
            </p>
            <Link to="/contact" className="btn-navy mt-8 inline-flex">
              Get in Touch <ArrowRight size={16} />
            </Link>
          </div>

          {/* Right — stats */}
          <div className="grid grid-cols-2 gap-6">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="card p-8 text-center hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="font-heading text-5xl font-bold text-gold">{stat.value}</div>
                <div className="text-navy-700 text-sm font-medium mt-2 leading-snug">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ── Mission & Vision Boxes ─────────────────────────────── */}
    <section className="section-padding bg-navy-50">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-navy text-white p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <Target className="text-gold mb-5" size={36} />
            <h3 className="font-heading text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-white/70 leading-relaxed">
              {/* PLACEHOLDER */}
              [Mission statement — to be provided by the client. Describe the firm's
              purpose and commitment to its clients.]
            </p>
          </div>
          <div className="border-2 border-gold/30 p-10 relative overflow-hidden bg-white">
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gold/5 rounded-full translate-y-1/2 translate-x-1/2" />
            <Eye className="text-gold mb-5" size={36} />
            <h3 className="font-heading text-2xl font-bold text-navy-800 mb-4">Our Vision</h3>
            <p className="text-gray-500 leading-relaxed">
              {/* PLACEHOLDER */}
              [Vision statement — to be provided by the client. Describe where the firm
              aspires to be in the future and the impact it aims to create.]
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* ── Core Values ───────────────────────────────────────── */}
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-14">
          <span className="section-label">What We Stand For</span>
          <h2 className="section-title mt-2">Our Core Values</h2>
          <div className="gold-divider mx-auto" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {VALUES.map(({ icon: Icon, title, description }) => (
            <div key={title} className="card p-8 group hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-gold/10 flex items-center justify-center mb-5
                              group-hover:bg-gold group-hover:text-navy-900 transition-colors duration-300">
                <Icon size={22} className="text-gold group-hover:text-navy-900 transition-colors duration-300" />
              </div>
              <h3 className="font-heading text-lg font-bold text-navy-800 mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Team Section ──────────────────────────────────────── */}
    <section id="team" className="section-padding bg-navy-950">
      <div className="container-custom">
        <div className="text-center mb-14">
          <span className="section-label">The People Behind Our Success</span>
          <h2 className="font-heading text-white text-3xl md:text-4xl lg:text-5xl font-bold mt-2">
            Our Leadership Team
          </h2>
          <div className="gold-divider mx-auto" />
          <p className="text-white/50 text-base mt-6 max-w-2xl mx-auto">
            {/* PLACEHOLDER */}
            [Brief description of the leadership team — to be provided by the client.]
          </p>
        </div>

        {/* Team placeholder grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-navy-800 p-8 text-center group">
              <div className="w-24 h-24 bg-navy-700 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Users className="text-gold/50" size={36} />
              </div>
              <div className="text-white font-heading text-lg font-semibold">
                [Team Member Name — Placeholder]
              </div>
              <div className="text-gold text-sm mt-1">[Title / Designation]</div>
              <p className="text-white/40 text-xs mt-4 leading-relaxed">
                [Brief bio — to be provided by the client.]
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Why Choose Us ─────────────────────────────────────── */}
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="section-label">Why Nasar Consultant</span>
            <h2 className="section-title mt-2">Why Clients Choose Us</h2>
            <div className="gold-divider" />
            <ul className="mt-8 space-y-4">
              {WHY_US.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle className="text-gold flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-gray-600 text-sm leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-navy-50 p-10">
            <blockquote className="relative">
              <div className="text-gold font-heading text-8xl leading-none opacity-20 absolute -top-4 -left-2">"</div>
              <p className="text-navy-700 text-lg leading-relaxed relative z-10 pl-4">
                {/* PLACEHOLDER */}
                [Client testimonial — to be provided by the client once verified. Do not
                fabricate quotes or attribute them to real people without consent.]
              </p>
              <footer className="mt-6 pl-4">
                <div className="text-navy-800 font-semibold text-sm">[Client Name — Placeholder]</div>
                <div className="text-gray-400 text-xs mt-0.5">[Company / Title — Placeholder]</div>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>

    <CTASection />
  </>
);

export default About;
