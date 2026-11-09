import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Building,
  Globe,
  Lock,
  Save,
  Check,
  RotateCcw,
} from 'lucide-react';
import { AdminDataAPI } from '../../utils/adminData';
import { SITE_NAME } from '../../utils/constants';

const AdminSettings = () => {
  const [settings, setSettings] = useState(AdminDataAPI.getSettings());
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setSettings(AdminDataAPI.getSettings());
  }, []);

  const showFeedback = (msg) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSocialChange = (network, value) => {
    setSettings((prev) => ({
      ...prev,
      social: { ...prev.social, [network]: value },
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    AdminDataAPI.updateSettings(settings);
    showFeedback('Settings and security credentials saved successfully');
  };

  const handleResetData = () => {
    if (
      window.confirm(
        'Warning: This will reset all demo inquiries, insights, job postings, applications, and settings to original defaults. Proceed?'
      )
    ) {
      AdminDataAPI.resetAllToDefault();
      setSettings(AdminDataAPI.getSettings());
      showFeedback('All administrative data reset to defaults');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <Helmet>
        <title>Firm Settings & Security | {SITE_NAME} Admin</title>
      </Helmet>

      {/* Header */}
      <div>
        <h1 className="font-heading font-bold text-2xl text-navy-950">
          Firm Profile & Settings
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage firm contact details, business hours, social profiles, and admin security credentials
        </p>
      </div>

      {feedbackMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-4 py-2.5 rounded-lg flex items-center gap-2">
          <Check size={14} className="text-emerald-600" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Card 1: Firm Contact & Location */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs p-6 space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 text-navy-900">
            <Building size={17} className="text-gold" />
            <h2 className="font-heading font-bold text-sm">Firm Public Profile</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-navy-900 mb-1">Company / Firm Name</label>
              <input
                type="text"
                value={settings.companyName || ''}
                onChange={(e) => handleChange('companyName', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-gold focus:bg-white text-navy-950 font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold text-navy-900 mb-1">Tagline</label>
              <input
                type="text"
                value={settings.tagline || ''}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-gold focus:bg-white text-navy-950"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-navy-900 mb-1">Official Contact Email</label>
              <input
                type="email"
                value={settings.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-gold focus:bg-white text-navy-950"
              />
            </div>

            <div>
              <label className="block font-semibold text-navy-900 mb-1">Office Telephone</label>
              <input
                type="text"
                value={settings.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-gold focus:bg-white text-navy-950"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-navy-900 mb-1">Office Address</label>
              <input
                type="text"
                value={settings.address || ''}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-gold focus:bg-white text-navy-950"
              />
            </div>

            <div>
              <label className="block font-semibold text-navy-900 mb-1">City & Country</label>
              <input
                type="text"
                value={settings.city || ''}
                onChange={(e) => handleChange('city', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-gold focus:bg-white text-navy-950"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-navy-900 mb-1">Business Hours</label>
            <input
              type="text"
              value={settings.officeHours || ''}
              onChange={(e) => handleChange('officeHours', e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-gold focus:bg-white text-navy-950"
            />
          </div>
        </div>

        {/* Card 2: Social Media Links */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs p-6 space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 text-navy-900">
            <Globe size={17} className="text-gold" />
            <h2 className="font-heading font-bold text-sm">Social Media Channels</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-navy-900 mb-1">LinkedIn Profile</label>
              <input
                type="text"
                value={settings.social?.linkedin || ''}
                onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                placeholder="https://linkedin.com/company/..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-gold focus:bg-white text-navy-950"
              />
            </div>

            <div>
              <label className="block font-semibold text-navy-900 mb-1">Twitter / X</label>
              <input
                type="text"
                value={settings.social?.twitter || ''}
                onChange={(e) => handleSocialChange('twitter', e.target.value)}
                placeholder="https://twitter.com/..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-gold focus:bg-white text-navy-950"
              />
            </div>

            <div>
              <label className="block font-semibold text-navy-900 mb-1">Facebook</label>
              <input
                type="text"
                value={settings.social?.facebook || ''}
                onChange={(e) => handleSocialChange('facebook', e.target.value)}
                placeholder="https://facebook.com/..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-gold focus:bg-white text-navy-950"
              />
            </div>

            <div>
              <label className="block font-semibold text-navy-900 mb-1">Instagram</label>
              <input
                type="text"
                value={settings.social?.instagram || ''}
                onChange={(e) => handleSocialChange('instagram', e.target.value)}
                placeholder="https://instagram.com/..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-gold focus:bg-white text-navy-950"
              />
            </div>
          </div>
        </div>

        {/* Card 3: Admin Security & Credentials */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs p-6 space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 text-navy-900">
            <Lock size={17} className="text-gold" />
            <h2 className="font-heading font-bold text-sm">Admin Access & Security</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-navy-900 mb-1">Administrator Email</label>
              <input
                type="email"
                required
                value={settings.adminEmail || ''}
                onChange={(e) => handleChange('adminEmail', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-gold focus:bg-white text-navy-950 font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold text-navy-900 mb-1">Admin Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={settings.adminPassword || ''}
                  onChange={(e) => handleChange('adminPassword', e.target.value)}
                  className="w-full p-2.5 pr-16 bg-slate-50 border border-slate-200 rounded-lg focus:border-gold focus:bg-white text-navy-950 font-mono font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[11px] text-slate-500 hover:text-navy-900 px-2 py-1 font-semibold"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Save & Reset Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 bg-navy-800 hover:bg-navy-900 text-white font-semibold rounded-lg shadow-navy flex items-center justify-center gap-2 transition-colors"
          >
            <Save size={15} className="text-gold" />
            <span>Save All Settings</span>
          </button>

          <button
            type="button"
            onClick={handleResetData}
            className="w-full sm:w-auto px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <RotateCcw size={14} />
            <span>Reset Demo Store to Factory Defaults</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
