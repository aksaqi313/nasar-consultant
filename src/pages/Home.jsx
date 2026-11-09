import { Helmet } from 'react-helmet-async';
import HeroSection       from '../components/home/HeroSection';
import AboutPreview      from '../components/home/AboutPreview';
import ServicesOverview  from '../components/home/ServicesOverview';
import WhyChooseUs       from '../components/home/WhyChooseUs';
import IndustriesSection from '../components/home/IndustriesSection';
import LatestInsights    from '../components/home/LatestInsights';
import CTASection        from '../components/home/CTASection';

// ─────────────────────────────────────────────────────────────────
//  Home Page — Phase 3 Complete
//  Sections (top → bottom):
//    1. HeroSection        — Full-screen hero with headline & CTAs
//    2. AboutPreview       — Who we are, highlight cards
//    3. ServicesOverview   — 6-service card grid
//    4. WhyChooseUs        — Stats bar + 6-feature grid
//    5. IndustriesSection  — 8-industry icon grid
//    6. LatestInsights     — 3 latest article cards
//    7. CTASection         — Final CTA with dark background
// ─────────────────────────────────────────────────────────────────

const Home = () => {
  return (
    <>
      {/* ── Page-level SEO (react-helmet-async) ──────────────── */}
      {/* NOTE: react-helmet-async is optional; meta is also set
          in index.html. Install with: npm i react-helmet-async  */}

      {/* ── 1. Hero ──────────────────────────────────────────── */}
      <HeroSection />

      {/* ── 2. About Preview ─────────────────────────────────── */}
      <AboutPreview />

      {/* ── 3. Services Overview ─────────────────────────────── */}
      <ServicesOverview />

      {/* ── 4. Why Choose Us + Stats Bar ─────────────────────── */}
      <WhyChooseUs />

      {/* ── 5. Industries We Serve ───────────────────────────── */}
      <IndustriesSection />

      {/* ── 6. Latest Insights ───────────────────────────────── */}
      <LatestInsights />

      {/* ── 7. Final CTA ─────────────────────────────────────── */}
      <CTASection />
    </>
  );
};

export default Home;
