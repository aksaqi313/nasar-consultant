import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-navy text-white">
    <div className="text-center px-4">
      <p className="text-gold font-heading text-[8rem] md:text-[12rem] font-bold leading-none opacity-20 select-none">
        404
      </p>
      <div className="-mt-8 relative z-10">
        <span className="section-label">Page Not Found</span>
        <h1 className="text-white font-heading text-3xl md:text-5xl font-bold mt-2">
          Oops! This page doesn&apos;t exist.
        </h1>
        <p className="text-white/60 text-lg mt-4 mb-8 max-w-md mx-auto">
          The page you are looking for may have been moved, deleted, or never existed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary">
            <Home size={16} /> Back to Home
          </Link>
          <button onClick={() => window.history.back()} className="btn-secondary">
            <ArrowLeft size={16} /> Go Back
          </button>
        </div>
      </div>
    </div>
  </div>
);
export default NotFound;
