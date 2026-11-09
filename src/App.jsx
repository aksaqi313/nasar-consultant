import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdminAuthProvider } from './context/AdminAuthContext';

// ── Shared Layout Components ─────────────────────────────────
import Navbar        from './components/common/Navbar';
import Footer        from './components/common/Footer';
import ScrollToTop   from './components/common/ScrollToTop';

// ── Public Pages ─────────────────────────────────────────────
import Home          from './pages/Home';
import About         from './pages/About';
import Services      from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Industries    from './pages/Industries';
import Insights      from './pages/Insights';
import InsightDetail from './pages/InsightDetail';
import Careers       from './pages/Careers';
import JobDetail     from './pages/JobDetail';
import Contact       from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import NotFound      from './pages/NotFound';

// ── Admin Components (Lazy Loaded) ───────────────────────────
const AdminLogin        = lazy(() => import('./pages/admin/AdminLogin'));
const AdminLayout       = lazy(() => import('./components/admin/AdminLayout'));
const ProtectedRoute    = lazy(() => import('./components/admin/ProtectedRoute'));
const AdminDashboard    = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminMessages     = lazy(() => import('./pages/admin/AdminMessages'));
const AdminInsights     = lazy(() => import('./pages/admin/AdminInsights'));
const AdminCareers      = lazy(() => import('./pages/admin/AdminCareers'));
const AdminApplications = lazy(() => import('./pages/admin/AdminApplications'));
const AdminServices     = lazy(() => import('./pages/admin/AdminServices'));
const AdminHomeEditor   = lazy(() => import('./pages/admin/AdminHomeEditor'));
const AdminSettings     = lazy(() => import('./pages/admin/AdminSettings'));

// ── Loading Fallback Component ───────────────────────────────
const LoadingScreen = () => (
  <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
    <div className="w-10 h-10 border-3 border-navy-800 border-t-gold rounded-full animate-spin mb-3" />
    <span className="text-xs font-semibold text-navy-900 tracking-wider uppercase">
      Loading Admin Portal...
    </span>
  </div>
);

// ── Main Layout (Navbar + content + Footer) ──────────────────
const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <main id="main-content" role="main">
      {children}
    </main>
    <Footer />
  </>
);

// ── App ──────────────────────────────────────────────────────
const App = () => (
  <AdminAuthProvider>
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {/* ── Public Routes ──────────────────────────────── */}
          <Route
            path="/"
            element={<PublicLayout><Home /></PublicLayout>}
          />
          <Route
            path="/about"
            element={<PublicLayout><About /></PublicLayout>}
          />
          <Route
            path="/services"
            element={<PublicLayout><Services /></PublicLayout>}
          />
          <Route
            path="/services/:slug"
            element={<PublicLayout><ServiceDetail /></PublicLayout>}
          />
          <Route
            path="/industries"
            element={<PublicLayout><Industries /></PublicLayout>}
          />
          <Route
            path="/insights"
            element={<PublicLayout><Insights /></PublicLayout>}
          />
          <Route
            path="/insights/:slug"
            element={<PublicLayout><InsightDetail /></PublicLayout>}
          />
          <Route
            path="/careers"
            element={<PublicLayout><Careers /></PublicLayout>}
          />
          <Route
            path="/careers/:id"
            element={<PublicLayout><JobDetail /></PublicLayout>}
          />
          <Route
            path="/contact"
            element={<PublicLayout><Contact /></PublicLayout>}
          />
          <Route
            path="/privacy-policy"
            element={<PublicLayout><PrivacyPolicy /></PublicLayout>}
          />

          {/* ── Admin Login Route ───────────────────────────── */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* ── Protected Admin Routes ──────────────────────── */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="insights" element={<AdminInsights />} />
            <Route path="careers" element={<AdminCareers />} />
            <Route path="applications" element={<AdminApplications />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="home" element={<AdminHomeEditor />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* ── 404 Catch-All ──────────────────────────────── */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </AdminAuthProvider>
);

export default App;
