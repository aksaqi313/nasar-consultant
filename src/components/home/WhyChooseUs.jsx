import {
  Target, Clock, ShieldCheck, Award,
  Users, Lightbulb, BarChart3, Headphones,
} from 'lucide-react';

const FEATURES = [
  {
    icon: Target,
    title: 'Tailored Solutions',
    text: 'Customized services designed to address your specific business challenges and goals.',
  },
  {
    icon: ShieldCheck,
    title: 'Regulatory Compliance',
    text: 'Ensuring your business stays compliant with all applicable laws, standards, and regulations.',
  },
  {
    icon: Award,
    title: 'Qualified Professionals',
    text: 'A team of experienced and qualified chartered accountants and financial experts.',
  },
  {
    icon: Clock,
    title: 'Timely Delivery',
    text: 'We understand the importance of deadlines and consistently deliver on time.',
  },
  {
    icon: Lightbulb,
    title: 'Strategic Insight',
    text: 'Data-driven insights that empower you to make informed business decisions.',
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    text: 'A responsive and dedicated team that is always available when you need guidance.',
  },
];

const STATS = [
  { value: '[X]+', label: 'Years of Experience' },
  { value: '[X]+', label: 'Clients Served' },
  { value: '[X]+', label: 'Professional Staff' },
  { value: '[X]%', label: 'Client Satisfaction' },
];

const WhyChooseUs = () => (
  <section className="relative overflow-hidden">
    {/* ── Stats Bar ────────────────────────────────────────── */}
    <div className="bg-gold-pattern">
      <div className="container-custom py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="font-heading text-navy-900 text-4xl md:text-5xl font-bold mb-1">
                {stat.value}
              </p>
              <p className="text-navy-900/60 text-sm uppercase tracking-wider font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* ── Features Grid ─────────────────────────────────────── */}
    <div className="bg-gradient-navy text-white section-padding relative">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-gold font-semibold text-xs tracking-[0.2em] uppercase mb-3 block">
            Why Choose Us
          </span>
          <h2 className="font-heading text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mt-2">
            What Sets Us{' '}
            <span className="text-gradient-gold">Apart</span>
          </h2>
          <div className="gold-divider mx-auto" />
          <p className="text-white/50 text-lg leading-relaxed mt-4">
            We combine technical excellence with a genuine commitment to your success,
            delivering value that goes beyond numbers.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="glass-white p-7 group
                         hover:bg-white/15 hover:-translate-y-1
                         transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gold/10 border border-gold/20 flex items-center justify-center
                              mb-5 group-hover:bg-gold group-hover:border-gold
                              transition-all duration-300">
                <Icon
                  size={22}
                  className="text-gold group-hover:text-navy-900
                             transition-colors duration-300"
                />
              </div>
              <h3 className="font-sans font-semibold text-white text-base mb-2">{title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
