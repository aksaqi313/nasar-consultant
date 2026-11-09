import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users, Shield } from 'lucide-react';
import { AdminDataAPI, INITIAL_HOME_CONTENT } from '../../utils/adminData';

const HIGHLIGHTS = [
  {
    icon: Award,
    title: 'Professional Expertise',
    text: 'A team of qualified professionals with deep expertise in accounting, taxation, and financial advisory.',
  },
  {
    icon: Users,
    title: 'Client-Centric Approach',
    text: 'We tailor our solutions to meet the unique needs and goals of each client we serve.',
  },
  {
    icon: Shield,
    title: 'Compliance & Integrity',
    text: 'We uphold the highest standards of accuracy, transparency, and regulatory compliance.',
  },
];

const AboutPreview = () => {
  const [about, setAbout] = useState(() => {
    try {
      return AdminDataAPI.getHomeContent()?.about || INITIAL_HOME_CONTENT.about;
    } catch {
      return INITIAL_HOME_CONTENT.about;
    }
  });

  useEffect(() => {
    try {
      const live = AdminDataAPI.getHomeContent()?.about;
      if (live) setAbout(live);
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <section id="about-preview" className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* ── Left: Text Content ───────────────────────────── */}
          <div>
            <span className="section-label">{about.sectionLabel || 'Who We Are'}</span>
            <h2 className="section-title mt-2">
              {about.titlePrefix || 'A Trusted Partner for'}{' '}
              <span className="text-gradient-gold">{about.titleHighlight || 'Financial Excellence'}</span>
            </h2>
            <div className="gold-divider" />

            <p className="text-gray-500 text-base leading-relaxed mt-6 mb-4">
              {about.paragraph1 ||
                'Nasar Consultant is a professional consultancy firm specializing in accounting, taxation, and financial advisory services. We are committed to helping businesses navigate complex financial landscapes with clarity and confidence.'}
            </p>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              {about.paragraph2 ||
                'Our team of experienced professionals brings together expertise across multiple disciplines to deliver comprehensive solutions tailored to your business needs.'}
            </p>

            <Link to={about.buttonLink || '/about'} className="btn-outline-navy">
              {about.buttonText || 'Learn More About Us'}
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* ── Right: Highlight Cards ──────────────────────── */}
          <div className="space-y-5">
            {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="card-gold-accent p-6 flex items-start gap-5
                           hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-navy-800 flex items-center justify-center flex-shrink-0">
                  <Icon size={22} className="text-gold" />
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-navy-800 text-base mb-1">
                    {title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
