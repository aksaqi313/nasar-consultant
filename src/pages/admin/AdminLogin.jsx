import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowLeft, KeyRound, AlertCircle } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { SITE_NAME } from '../../utils/constants';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please provide an admin email or username.');
      return;
    }
    if (!password) {
      setError('Please provide your admin password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const res = login(email, password);
      setIsLoading(false);
      if (res.success) {
        navigate(from, { replace: true });
      } else {
        setError(res.error || 'Authentication failed. Please verify credentials.');
      }
    }, 400);
  };

  const handleFillDemo = () => {
    setEmail('admin@nasarconsultant.com');
    setPassword('admin');
    setError('');
  };

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans">
      <Helmet>
        <title>Admin Portal Login | {SITE_NAME}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-navy-800/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gold/5 blur-[90px] rounded-full pointer-events-none" />

      {/* Back to Site link */}
      <div className="w-full max-w-md mb-6 z-10 flex justify-between items-center">
        <Link
          to="/"
          className="text-xs text-slate-400 hover:text-gold flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Public Website
        </Link>
        <span className="text-[11px] text-slate-500 font-medium">Nasar Consultant Portal</span>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-10 relative">
        {/* Card Header */}
        <div className="bg-navy-900 px-8 py-8 text-center border-b border-navy-800 relative">
          <div className="inline-flex w-14 h-14 bg-gold rounded-xl items-center justify-center text-navy-950 font-heading font-bold text-2xl shadow-lg shadow-gold/20 mb-3.5">
            N
          </div>
          <h1 className="font-heading font-bold text-2xl text-white">
            {SITE_NAME}
          </h1>
          <p className="text-gold-300 text-xs font-semibold uppercase tracking-widest mt-1">
            Executive Admin Portal
          </p>
        </div>

        {/* Card Body */}
        <div className="p-8">
          {/* Demo Credentials Helper Pill */}
          <div className="mb-6 bg-amber-50/80 border border-amber-200/60 rounded-xl p-3.5 text-xs text-amber-900 flex items-start justify-between gap-3">
            <div className="flex gap-2">
              <KeyRound size={16} className="text-amber-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-900">Demo Access Credentials</p>
                <p className="text-[11px] text-amber-800/80 mt-0.5">
                  Email: <span className="font-mono font-bold">admin@nasarconsultant.com</span>
                </p>
                <p className="text-[11px] text-amber-800/80">
                  Password: <span className="font-mono font-bold">admin</span>
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[11px] font-bold text-navy-900 bg-gold/80 hover:bg-gold px-2.5 py-1 rounded shadow-xs transition-colors shrink-0"
            >
              Fill Demo
            </button>
          </div>

          {error && (
            <div className="mb-5 bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-lg flex items-center gap-2">
              <AlertCircle size={15} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-navy-900 uppercase tracking-wider mb-1.5">
                Admin Email / Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail size={16} />
                </div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@nasarconsultant.com"
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-gold focus:bg-white text-navy-900 placeholder:text-slate-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-900 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock size={16} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-gold focus:bg-white text-navy-900 placeholder:text-slate-400 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-navy-800 hover:bg-navy-900 text-white font-semibold py-2.5 px-4 rounded-lg shadow-navy transition-all duration-200 flex items-center justify-center gap-2 text-sm disabled:opacity-60 cursor-pointer"
              >
                {isLoading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <ShieldCheck size={18} className="text-gold" />
                    <span>Sign In to Dashboard</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Card Footer */}
        <div className="bg-slate-50 px-8 py-3.5 border-t border-slate-100 text-center text-xs text-slate-500">
          Authorized personnel only. All access attempts are recorded.
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

