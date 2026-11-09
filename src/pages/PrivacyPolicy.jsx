import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import PageHero from '../components/ui/PageHero';
import { SITE_NAME, CONTACT, CURRENT_YEAR } from '../utils/constants';

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="font-heading text-navy-800 text-xl font-bold mb-4">{title}</h2>
    <div className="text-gray-600 text-sm leading-relaxed space-y-3">{children}</div>
  </div>
);

const PrivacyPolicy = () => (
  <>
    <Helmet>
      <title>Privacy Policy — {SITE_NAME}</title>
      <meta
        name="description"
        content={`Read the privacy policy of ${SITE_NAME} to understand how we collect, use, and protect your personal information.`}
      />
    </Helmet>

    <PageHero
      label="Legal"
      title="Privacy Policy"
      subtitle={`Last updated: [Date — to be confirmed] · Effective date: [Date — to be confirmed]`}
      breadcrumb={[{ label: 'Privacy Policy' }]}
    />

    <section className="section-padding bg-white">
      <div className="container-custom max-w-3xl">

        <div className="bg-gold/10 border border-gold/20 p-6 mb-10">
          <p className="text-navy-700 text-sm leading-relaxed">
            <strong>Important:</strong> This privacy policy is a template. It must be reviewed by
            a qualified legal professional before publication and updated to reflect the actual data
            processing practices of {SITE_NAME}. All sections marked <em>[Placeholder]</em> must be
            completed with verified information.
          </p>
        </div>

        <Section title="1. Introduction">
          <p>
            {SITE_NAME} ("<strong>we</strong>", "<strong>us</strong>", "<strong>our</strong>") is
            committed to protecting your personal information and your right to privacy. This Privacy
            Policy explains how we collect, use, disclose, and safeguard your information when you
            visit our website or engage with our services.
          </p>
          <p>
            If you have any questions or concerns, please contact us at{' '}
            <a href={`mailto:${CONTACT.email}`} className="text-gold hover:underline">
              {CONTACT.email}
            </a>.
          </p>
        </Section>

        <Section title="2. Information We Collect">
          <p>We may collect the following categories of personal information:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li><strong>Identity Data:</strong> Name, CNIC number, and similar identifiers.</li>
            <li><strong>Contact Data:</strong> Email address, telephone number, and postal address.</li>
            <li><strong>Financial Data:</strong> Tax identification numbers and financial information relevant to the services you engage us for.</li>
            <li><strong>Technical Data:</strong> IP address, browser type, time zone, and other technology data collected automatically when you visit our website.</li>
            <li><strong>Usage Data:</strong> Information about how you use our website.</li>
            <li><strong>Communications Data:</strong> Messages and correspondence you send us.</li>
          </ul>
        </Section>

        <Section title="3. How We Use Your Information">
          <p>We use your personal information for the following purposes:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>To provide professional accounting, taxation, and advisory services.</li>
            <li>To respond to your inquiries and manage our relationship with you.</li>
            <li>To send you relevant updates, insights, and service information (with your consent).</li>
            <li>To comply with our legal and regulatory obligations.</li>
            <li>To improve our website and services.</li>
          </ul>
        </Section>

        <Section title="4. Legal Basis for Processing">
          <p>
            We process your personal data under one or more of the following legal bases:
            performance of a contract, compliance with a legal obligation, your consent, or our
            legitimate interests. [PLACEHOLDER — confirm legal basis under applicable Pakistani
            data protection law once enacted / applicable.]
          </p>
        </Section>

        <Section title="5. Sharing Your Information">
          <p>
            We do not sell your personal information. We may share it with:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Regulatory bodies such as FBR or SECP where required by law.</li>
            <li>Professional service providers who assist us in delivering services (e.g., cloud storage, accounting software).</li>
            <li>Other parties with your explicit consent.</li>
          </ul>
        </Section>

        <Section title="6. Data Retention">
          <p>
            [PLACEHOLDER — Insert the firm's specific data retention periods for different categories
            of client data, in line with professional obligations and applicable law.]
          </p>
        </Section>

        <Section title="7. Data Security">
          <p>
            We implement appropriate technical and organisational security measures to protect your
            personal information against unauthorised access, alteration, disclosure, or destruction.
            However, no method of electronic transmission or storage is 100% secure.
          </p>
        </Section>

        <Section title="8. Cookies">
          <p>
            Our website may use cookies to improve user experience. [PLACEHOLDER — Insert a full
            cookie policy once the website's cookie usage has been audited.]
          </p>
        </Section>

        <Section title="9. Your Rights">
          <p>You may have the right to:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Access the personal information we hold about you.</li>
            <li>Request correction of inaccurate information.</li>
            <li>Request deletion of your personal information in certain circumstances.</li>
            <li>Object to or restrict processing of your personal information.</li>
            <li>Withdraw consent where processing is based on consent.</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at{' '}
            <a href={`mailto:${CONTACT.email}`} className="text-gold hover:underline">
              {CONTACT.email}
            </a>.
          </p>
        </Section>

        <Section title="10. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. The revised policy will be posted
            on this page with an updated date. We encourage you to review this page periodically.
          </p>
        </Section>

        <Section title="11. Contact Us">
          <p>If you have any questions about this Privacy Policy, please contact:</p>
          <address className="not-italic bg-gray-50 p-5 mt-3 text-sm space-y-1">
            <p className="font-semibold text-navy-800">{SITE_NAME}</p>
            <p>{CONTACT.address}</p>
            <p>{CONTACT.city}</p>
            <p>
              <a href={`mailto:${CONTACT.email}`} className="text-gold hover:underline">
                {CONTACT.email}
              </a>
            </p>
          </address>
        </Section>

        <p className="text-gray-400 text-xs mt-10">
          © {CURRENT_YEAR} {SITE_NAME}. All rights reserved.
        </p>

        <div className="mt-6">
          <Link to="/" className="text-gold text-sm hover:underline">← Back to Home</Link>
        </div>
      </div>
    </section>
  </>
);

export default PrivacyPolicy;
