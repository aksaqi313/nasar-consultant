import { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Sparkles,
  Layout,
  Type,
  Palette,
  Save,
  Check,
  RotateCcw,
  Eye,
  TrendingUp,
  ExternalLink,
  Upload,
  Trash2,
  Link2,
} from 'lucide-react';
import { AdminDataAPI, INITIAL_HOME_CONTENT } from '../../utils/adminData';
import { SITE_NAME } from '../../utils/constants';

const GRADIENT_PRESETS = [
  {
    id: 'navy-classic',
    name: 'Classic Royal Navy',
    classes: 'from-navy-950 via-navy-800 to-navy-700',
    preview: 'linear-gradient(135deg, #0f1830 0%, #1e3163 50%, #253f7a 100%)',
  },
  {
    id: 'navy-dark',
    name: 'Deep Midnight Charcoal',
    classes: 'from-slate-950 via-navy-950 to-slate-900',
    preview: 'linear-gradient(135deg, #020617 0%, #0f1830 50%, #0f172a 100%)',
  },
  {
    id: 'midnight-sapphire',
    name: 'Midnight Sapphire',
    classes: 'from-blue-950 via-navy-900 to-indigo-950',
    preview: 'linear-gradient(135deg, #081d45 0%, #172448 50%, #1e1b4b 100%)',
  },
  {
    id: 'charcoal-gold',
    name: 'Executive Dark Bronze',
    classes: 'from-neutral-950 via-navy-950 to-stone-900',
    preview: 'linear-gradient(135deg, #0a0a0a 0%, #0f1830 60%, #1c1917 100%)',
  },
];

const AdminHomeEditor = () => {
  const [content, setContent] = useState(() => AdminDataAPI.getHomeContent());
  const [activeTab, setActiveTab] = useState('hero');
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imageSourceMode, setImageSourceMode] = useState(() => {
    const url = AdminDataAPI.getHomeContent()?.hero?.bgImageUrl || '';
    return url.startsWith('http') ? 'url' : 'upload';
  });
  const fileInputRef = useRef(null);

  const showFeedback = (msg) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  const handleHeroChange = (field, value) => {
    setContent((prev) => ({
      ...prev,
      hero: { ...prev.hero, [field]: value },
    }));
  };

  const processImageFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, JPEG, WEBP).');
      return;
    }

    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // High-definition compression scaling
        const MAX_WIDTH = 1920;
        const MAX_HEIGHT = 1080;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }
        if (height > MAX_HEIGHT) {
          width = Math.round((width * MAX_HEIGHT) / height);
          height = MAX_HEIGHT;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Compress to JPEG with 0.82 quality to fit safely in client storage
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);

        setContent((prev) => ({
          ...prev,
          hero: {
            ...prev.hero,
            bgImageUrl: compressedDataUrl,
            bgImageName: file.name,
            bgType: 'image',
          },
        }));

        setIsUploading(false);
        showFeedback(`Image "${file.name}" uploaded and optimized!`);
      };
      img.onerror = () => {
        setIsUploading(false);
        alert('Could not process this image file. Please try another image.');
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleRemoveImage = () => {
    setContent((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        bgImageUrl: '',
        bgImageName: '',
      },
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    showFeedback('Custom background image removed');
  };

  const handleAboutChange = (field, value) => {
    setContent((prev) => ({
      ...prev,
      about: { ...prev.about, [field]: value },
    }));
  };

  const handleCtaChange = (field, value) => {
    setContent((prev) => ({
      ...prev,
      cta: { ...prev.cta, [field]: value },
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    AdminDataAPI.updateHomeContent(content);
    showFeedback('Home page text and background styles updated successfully!');
  };

  const handleReset = () => {
    if (window.confirm('Reset Home page content to original factory defaults?')) {
      setContent(INITIAL_HOME_CONTENT);
      AdminDataAPI.updateHomeContent(INITIAL_HOME_CONTENT);
      showFeedback('Reset to default home content');
    }
  };

  const selectedGradient =
    GRADIENT_PRESETS.find((g) => g.id === content.hero.bgGradient) || GRADIENT_PRESETS[0];

  return (
    <div className="space-y-6 max-w-6xl pb-12">
      <Helmet>
        <title>Home Page Editor & Background | {SITE_NAME} Admin</title>
      </Helmet>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-2xl text-navy-950 flex items-center gap-2.5">
            <span>Home Page Content & Design</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-gold/15 text-gold-700 font-semibold border border-gold/30">
              Live Customizer
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Customize the hero headline, typography, background visuals, trust stats, and CTA banner
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors"
          >
            <Eye size={14} className="text-gold" />
            <span>View Live Home</span>
            <ExternalLink size={12} className="text-slate-400" />
          </a>
        </div>
      </div>

      {feedbackMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-4 py-2.5 rounded-lg flex items-center gap-2">
          <Check size={14} className="text-emerald-600" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 gap-2">
        {[
          { id: 'hero', label: 'Hero Headline & Text', icon: Type },
          { id: 'background', label: 'Background & Visuals', icon: Palette },
          { id: 'stats', label: 'Trust Stats & Numbers', icon: TrendingUp },
          { id: 'about', label: 'About Preview', icon: Layout },
          { id: 'cta', label: 'Bottom CTA Section', icon: Sparkles },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all -mb-[2px] ${
                activeTab === tab.id
                  ? 'border-gold text-navy-900 bg-white rounded-t-lg'
                  : 'border-transparent text-slate-500 hover:text-navy-900 hover:bg-slate-100/60'
              }`}
            >
              <Icon size={15} className={activeTab === tab.id ? 'text-gold' : 'text-slate-400'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Form Container */}
      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* ── TAB 1: HERO TEXT ──────────────────────────────── */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs p-6 space-y-4">
              <h2 className="font-heading font-bold text-sm text-navy-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                <Type size={16} className="text-gold" />
                Hero Headline & Typography
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-3">
                  <label className="block font-semibold text-navy-900 mb-1">
                    Top Badge / Eyebrow Text
                  </label>
                  <input
                    type="text"
                    value={content.hero.badge}
                    onChange={(e) => handleHeroChange('badge', e.target.value)}
                    placeholder="e.g. Nasar Consultant"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-gold focus:bg-white text-navy-950 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-navy-900 mb-1">
                    Headline Prefix
                  </label>
                  <input
                    type="text"
                    value={content.hero.headlinePrefix}
                    onChange={(e) => handleHeroChange('headlinePrefix', e.target.value)}
                    placeholder="e.g. Excellence in"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-gold focus:bg-white text-navy-950 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-navy-900 mb-1">
                    Highlighted Word (Gold Accent)
                  </label>
                  <input
                    type="text"
                    value={content.hero.headlineHighlight}
                    onChange={(e) => handleHeroChange('headlineHighlight', e.target.value)}
                    placeholder="e.g. Accounting"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-gold focus:bg-white text-gold-600 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-navy-900 mb-1">
                    Headline Suffix (Line 2)
                  </label>
                  <input
                    type="text"
                    value={content.hero.headlineSuffix}
                    onChange={(e) => handleHeroChange('headlineSuffix', e.target.value)}
                    placeholder="e.g. & Financial Advisory"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-gold focus:bg-white text-navy-950 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-navy-900 mb-1">
                  Subtitle / Mission Statement
                </label>
                <textarea
                  rows={3}
                  value={content.hero.subtitle}
                  onChange={(e) => handleHeroChange('subtitle', e.target.value)}
                  placeholder="Describe your firm's core proposition..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-gold focus:bg-white text-navy-950 leading-relaxed"
                />
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200/80 space-y-2">
                  <span className="font-semibold text-navy-900 block text-[11px] uppercase tracking-wider">
                    Primary CTA Button
                  </span>
                  <div>
                    <label className="block text-slate-500 text-[11px] mb-1">Button Label</label>
                    <input
                      type="text"
                      value={content.hero.primaryBtnText}
                      onChange={(e) => handleHeroChange('primaryBtnText', e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded text-navy-900 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 text-[11px] mb-1">Link Target</label>
                    <input
                      type="text"
                      value={content.hero.primaryBtnLink}
                      onChange={(e) => handleHeroChange('primaryBtnLink', e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded text-navy-900 font-mono text-[11px]"
                    />
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200/80 space-y-2">
                  <span className="font-semibold text-navy-900 block text-[11px] uppercase tracking-wider">
                    Secondary CTA Button
                  </span>
                  <div>
                    <label className="block text-slate-500 text-[11px] mb-1">Button Label</label>
                    <input
                      type="text"
                      value={content.hero.secondaryBtnText}
                      onChange={(e) => handleHeroChange('secondaryBtnText', e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded text-navy-900 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 text-[11px] mb-1">Link Target</label>
                    <input
                      type="text"
                      value={content.hero.secondaryBtnLink}
                      onChange={(e) => handleHeroChange('secondaryBtnLink', e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded text-navy-900 font-mono text-[11px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 2: BACKGROUND & VISUALS ───────────────────── */}
        {activeTab === 'background' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs p-6 space-y-5">
              <h2 className="font-heading font-bold text-sm text-navy-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                <Palette size={16} className="text-gold" />
                Hero Background Styling & Ambiance
              </h2>

              {/* Background Type Selector */}
              <div>
                <label className="block font-semibold text-navy-900 mb-2">
                  Background Style Mode
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => handleHeroChange('bgType', 'gradient')}
                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-semibold text-xs transition-all ${
                      content.hero.bgType === 'gradient'
                        ? 'border-gold bg-gold/10 text-navy-950 shadow-xs ring-1 ring-gold'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Palette size={16} className="text-gold" />
                    <span>Executive Gradient</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      handleHeroChange('bgType', 'image');
                      setImageSourceMode('upload');
                    }}
                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-semibold text-xs transition-all ${
                      content.hero.bgType === 'image' && imageSourceMode === 'upload'
                        ? 'border-gold bg-gold/10 text-navy-950 shadow-xs ring-1 ring-gold'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Upload size={16} className="text-emerald-600" />
                    <span>Upload Custom Image</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      handleHeroChange('bgType', 'image');
                      setImageSourceMode('url');
                    }}
                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-semibold text-xs transition-all ${
                      content.hero.bgType === 'image' && imageSourceMode === 'url'
                        ? 'border-gold bg-gold/10 text-navy-950 shadow-xs ring-1 ring-gold'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Link2 size={16} className="text-blue-600" />
                    <span>Web Image URL</span>
                  </button>
                </div>
              </div>

              {/* Gradient Presets */}
              {content.hero.bgType === 'gradient' && (
                <div className="space-y-2 pt-2">
                  <label className="block font-semibold text-navy-900">
                    Select Gradient Color Palette
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {GRADIENT_PRESETS.map((grad) => (
                      <div
                        key={grad.id}
                        onClick={() => handleHeroChange('bgGradient', grad.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                          content.hero.bgGradient === grad.id
                            ? 'border-gold ring-2 ring-gold/40 bg-slate-50'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div
                          className="w-12 h-10 rounded-lg shadow-inner shrink-0"
                          style={{ background: grad.preview }}
                        />
                        <div className="truncate">
                          <span className="font-semibold text-navy-900 block truncate">
                            {grad.name}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {grad.id}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom Image Upload Mode */}
              {content.hero.bgType === 'image' && imageSourceMode === 'upload' && (
                <div className="space-y-4 pt-2 bg-slate-50 p-5 rounded-xl border border-slate-200/80">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-navy-900 text-xs block">
                        Upload Hero Background Image
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Supports high-res PNG, JPG, JPEG, and WEBP photos (automatically optimized)
                      </span>
                    </div>

                    {content.hero.bgImageUrl && (
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="px-2.5 py-1 text-[11px] text-red-600 hover:bg-red-50 border border-red-200 rounded-md font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Trash2 size={12} />
                        <span>Remove Photo</span>
                      </button>
                    )}
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  {/* Preview or Dropzone */}
                  {content.hero.bgImageUrl ? (
                    <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col sm:flex-row items-center gap-4">
                      <div className="w-full sm:w-44 h-28 rounded-lg overflow-hidden border border-slate-200 relative shrink-0 bg-slate-900 shadow-xs">
                        <img
                          src={content.hero.bgImageUrl}
                          alt="Custom Background Preview"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-1 right-1 bg-navy-950/80 text-white text-[9px] px-1.5 py-0.5 rounded font-mono">
                          Active BG
                        </span>
                      </div>

                      <div className="space-y-1.5 flex-1 w-full">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span className="font-semibold text-navy-950 text-xs truncate max-w-xs block">
                            {content.hero.bgImageName || 'Custom Uploaded Image'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          Image is loaded and will render with the dark overlay on the public home page.
                        </p>
                        <div className="pt-2 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-900 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Upload size={13} className="text-gold" />
                            <span>Upload Different Image</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                        isDragging
                          ? 'border-gold bg-gold/10 scale-[1.01]'
                          : 'border-slate-300 hover:border-gold hover:bg-white bg-slate-100/50'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full bg-gold/10 text-gold flex items-center justify-center mx-auto mb-3">
                        <Upload size={22} />
                      </div>
                      <p className="font-semibold text-navy-900 text-xs">
                        {isUploading
                          ? 'Optimizing and loading your photo...'
                          : 'Click to choose an image from your computer, or drag & drop here'}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1">
                        High-resolution landscapes, architecture, or office interiors look best
                      </p>
                    </div>
                  )}

                  {/* Dark Overlay Opacity Slider */}
                  <div className="pt-2 border-t border-slate-200/80">
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="font-semibold text-navy-900">
                        Dark Overlay Opacity: {content.hero.bgOverlayOpacity || 85}%
                      </label>
                      <span className="text-[11px] text-slate-500">
                        Adjust to keep headline text crystal clear
                      </span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="95"
                      step="5"
                      value={content.hero.bgOverlayOpacity || 85}
                      onChange={(e) => handleHeroChange('bgOverlayOpacity', Number(e.target.value))}
                      className="w-full accent-gold cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* Web URL Mode */}
              {content.hero.bgType === 'image' && imageSourceMode === 'url' && (
                <div className="space-y-4 pt-2 bg-slate-50 p-5 rounded-xl border border-slate-200/80">
                  <div>
                    <label className="block font-semibold text-navy-900 mb-1">
                      Web Image URL
                    </label>
                    <input
                      type="url"
                      value={content.hero.bgImageUrl}
                      onChange={(e) => {
                        handleHeroChange('bgImageUrl', e.target.value);
                        handleHeroChange('bgImageName', 'Web URL Image');
                      }}
                      placeholder="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80"
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-lg focus:border-gold text-navy-950 font-mono text-xs"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      Paste a direct HTTPS image URL from Unsplash, Pexels, or your web server.
                    </p>
                  </div>

                  {/* Dark Overlay Opacity Slider */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="font-semibold text-navy-900">
                        Dark Overlay Opacity: {content.hero.bgOverlayOpacity || 85}%
                      </label>
                      <span className="text-[11px] text-slate-500">
                        Higher values guarantee text contrast
                      </span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="95"
                      step="5"
                      value={content.hero.bgOverlayOpacity || 85}
                      onChange={(e) => handleHeroChange('bgOverlayOpacity', Number(e.target.value))}
                      className="w-full accent-gold cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* Visual Effects Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
                <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200/70 cursor-pointer hover:bg-slate-100/70">
                  <input
                    type="checkbox"
                    checked={content.hero.showPattern}
                    onChange={(e) => handleHeroChange('showPattern', e.target.checked)}
                    className="w-4 h-4 text-gold rounded border-slate-300 focus:ring-gold"
                  />
                  <div>
                    <span className="font-semibold text-navy-900 block">Subtle Geometric Pattern</span>
                    <span className="text-[11px] text-slate-500">Adds an architectural watermark texture</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200/70 cursor-pointer hover:bg-slate-100/70">
                  <input
                    type="checkbox"
                    checked={content.hero.showGlowingOrbs}
                    onChange={(e) => handleHeroChange('showGlowingOrbs', e.target.checked)}
                    className="w-4 h-4 text-gold rounded border-slate-300 focus:ring-gold"
                  />
                  <div>
                    <span className="font-semibold text-navy-900 block">Ambient Gold Glow</span>
                    <span className="text-[11px] text-slate-500">Soft blurred lighting in corners</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 3: TRUST STATS ────────────────────────────── */}
        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs p-6 space-y-4">
              <h2 className="font-heading font-bold text-sm text-navy-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                <TrendingUp size={16} className="text-gold" />
                Hero Trust Badges / Quantitative Metrics
              </h2>
              <p className="text-slate-500 text-xs">
                These numbers appear directly below the main call-to-action buttons on the Home Hero banner.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {/* Stat 1 */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gold">Metric #1</span>
                  <div>
                    <label className="block text-slate-500 mb-1">Figure / Value</label>
                    <input
                      type="text"
                      value={content.hero.stat1Value}
                      onChange={(e) => handleHeroChange('stat1Value', e.target.value)}
                      placeholder="15+"
                      className="w-full p-2 bg-white border border-slate-200 rounded font-heading font-bold text-base text-navy-900"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1">Label Text</label>
                    <input
                      type="text"
                      value={content.hero.stat1Label}
                      onChange={(e) => handleHeroChange('stat1Label', e.target.value)}
                      placeholder="Years of Experience"
                      className="w-full p-2 bg-white border border-slate-200 rounded text-slate-800 font-medium"
                    />
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gold">Metric #2</span>
                  <div>
                    <label className="block text-slate-500 mb-1">Figure / Value</label>
                    <input
                      type="text"
                      value={content.hero.stat2Value}
                      onChange={(e) => handleHeroChange('stat2Value', e.target.value)}
                      placeholder="500+"
                      className="w-full p-2 bg-white border border-slate-200 rounded font-heading font-bold text-base text-navy-900"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1">Label Text</label>
                    <input
                      type="text"
                      value={content.hero.stat2Label}
                      onChange={(e) => handleHeroChange('stat2Label', e.target.value)}
                      placeholder="Clients Served"
                      className="w-full p-2 bg-white border border-slate-200 rounded text-slate-800 font-medium"
                    />
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gold">Metric #3</span>
                  <div>
                    <label className="block text-slate-500 mb-1">Figure / Value</label>
                    <input
                      type="text"
                      value={content.hero.stat3Value}
                      onChange={(e) => handleHeroChange('stat3Value', e.target.value)}
                      placeholder="50+"
                      className="w-full p-2 bg-white border border-slate-200 rounded font-heading font-bold text-base text-navy-900"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1">Label Text</label>
                    <input
                      type="text"
                      value={content.hero.stat3Label}
                      onChange={(e) => handleHeroChange('stat3Label', e.target.value)}
                      placeholder="Professional Staff"
                      className="w-full p-2 bg-white border border-slate-200 rounded text-slate-800 font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 4: ABOUT PREVIEW ──────────────────────────── */}
        {activeTab === 'about' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs p-6 space-y-4">
              <h2 className="font-heading font-bold text-sm text-navy-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                <Layout size={16} className="text-gold" />
                Home "Who We Are" Section
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-navy-900 mb-1">Section Label</label>
                  <input
                    type="text"
                    value={content.about.sectionLabel}
                    onChange={(e) => handleAboutChange('sectionLabel', e.target.value)}
                    placeholder="Who We Are"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-navy-900 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-navy-900 mb-1">Title Prefix</label>
                  <input
                    type="text"
                    value={content.about.titlePrefix}
                    onChange={(e) => handleAboutChange('titlePrefix', e.target.value)}
                    placeholder="A Trusted Partner for"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-navy-900 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-navy-900 mb-1">Title Highlight (Gold)</label>
                  <input
                    type="text"
                    value={content.about.titleHighlight}
                    onChange={(e) => handleAboutChange('titleHighlight', e.target.value)}
                    placeholder="Financial Excellence"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-gold-600 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-navy-900 mb-1">Primary Paragraph</label>
                <textarea
                  rows={3}
                  value={content.about.paragraph1}
                  onChange={(e) => handleAboutChange('paragraph1', e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-semibold text-navy-900 mb-1">Secondary Paragraph</label>
                <textarea
                  rows={3}
                  value={content.about.paragraph2}
                  onChange={(e) => handleAboutChange('paragraph2', e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-navy-900 mb-1">Button Text</label>
                  <input
                    type="text"
                    value={content.about.buttonText}
                    onChange={(e) => handleAboutChange('buttonText', e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-navy-900 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-navy-900 mb-1">Button Link</label>
                  <input
                    type="text"
                    value={content.about.buttonLink}
                    onChange={(e) => handleAboutChange('buttonLink', e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-navy-900 font-mono text-[11px]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 5: CTA BANNER ─────────────────────────────── */}
        {activeTab === 'cta' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs p-6 space-y-4">
              <h2 className="font-heading font-bold text-sm text-navy-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                <Sparkles size={16} className="text-gold" />
                Bottom Call-to-Action Section
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-navy-900 mb-1">Eyebrow Badge</label>
                  <input
                    type="text"
                    value={content.cta.badge}
                    onChange={(e) => handleCtaChange('badge', e.target.value)}
                    placeholder="Get Started Today"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-navy-900 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-navy-900 mb-1">Heading Prefix</label>
                  <input
                    type="text"
                    value={content.cta.titlePrefix}
                    onChange={(e) => handleCtaChange('titlePrefix', e.target.value)}
                    placeholder="Ready to Elevate Your"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-navy-900 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-navy-900 mb-1">Heading Highlight (Gold)</label>
                  <input
                    type="text"
                    value={content.cta.titleHighlight}
                    onChange={(e) => handleCtaChange('titleHighlight', e.target.value)}
                    placeholder="Financial Strategy?"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-gold-600 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-navy-900 mb-1">Subtitle</label>
                <textarea
                  rows={2}
                  value={content.cta.subtitle}
                  onChange={(e) => handleCtaChange('subtitle', e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-navy-900 mb-1">Primary CTA Button</label>
                  <input
                    type="text"
                    value={content.cta.primaryBtnText}
                    onChange={(e) => handleCtaChange('primaryBtnText', e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-navy-900 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-navy-900 mb-1">Secondary CTA Button</label>
                  <input
                    type="text"
                    value={content.cta.secondaryBtnText}
                    onChange={(e) => handleCtaChange('secondaryBtnText', e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-navy-900 font-medium"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── LIVE PREVIEW BANNER CARD ──────────────────────── */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-card p-6 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="font-heading font-bold text-sm text-navy-900 flex items-center gap-2">
              <Eye size={15} className="text-gold" />
              Real-time Hero Visual Preview
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              Mode: {content.hero.bgType === 'image' && content.hero.bgImageUrl ? 'Custom Image' : selectedGradient.name}
            </span>
          </div>

          <div
            className={`relative rounded-xl p-8 text-white overflow-hidden shadow-xl transition-all ${
              content.hero.bgType === 'gradient' ? `bg-gradient-to-br ${selectedGradient.classes}` : 'bg-navy-950'
            }`}
            style={
              content.hero.bgType === 'image' && content.hero.bgImageUrl
                ? {
                    backgroundImage: `url('${content.hero.bgImageUrl}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }
                : undefined
            }
          >
            {/* Dark overlay if image */}
            {content.hero.bgType === 'image' && content.hero.bgImageUrl && (
              <div
                className="absolute inset-0 bg-navy-950 pointer-events-none"
                style={{ opacity: (content.hero.bgOverlayOpacity || 85) / 100 }}
              />
            )}

            {/* Pattern */}
            {content.hero.showPattern && (
              <div
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
            )}

            {/* Glowing orb */}
            {content.hero.showGlowingOrbs && (
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-gold/15 rounded-full blur-2xl pointer-events-none" />
            )}

            <div className="relative z-10 max-w-xl space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-[2px] bg-gold" />
                <span className="text-gold font-semibold text-[10px] tracking-widest uppercase">
                  {content.hero.badge || 'Nasar Consultant'}
                </span>
              </div>

              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white leading-tight">
                {content.hero.headlinePrefix}{' '}
                <span className="text-gold font-extrabold">{content.hero.headlineHighlight}</span>{' '}
                <br />
                {content.hero.headlineSuffix}
              </h2>

              <p className="text-slate-300 text-xs leading-relaxed line-clamp-2 max-w-md">
                {content.hero.subtitle}
              </p>

              <div className="flex items-center gap-3 pt-2">
                <span className="px-3.5 py-1.5 rounded-lg bg-gold text-navy-950 font-bold text-[11px] shadow-sm">
                  {content.hero.primaryBtnText} &rarr;
                </span>
                <span className="px-3.5 py-1.5 rounded-lg border border-white/30 text-white font-medium text-[11px]">
                  {content.hero.secondaryBtnText}
                </span>
              </div>

              {/* Stats Preview */}
              <div className="flex items-center gap-6 pt-4 border-t border-white/10 text-xs">
                <div>
                  <span className="text-gold font-heading font-bold text-lg block leading-none">
                    {content.hero.stat1Value}
                  </span>
                  <span className="text-slate-400 text-[10px] uppercase tracking-wider">
                    {content.hero.stat1Label}
                  </span>
                </div>
                <div>
                  <span className="text-gold font-heading font-bold text-lg block leading-none">
                    {content.hero.stat2Value}
                  </span>
                  <span className="text-slate-400 text-[10px] uppercase tracking-wider">
                    {content.hero.stat2Label}
                  </span>
                </div>
                <div>
                  <span className="text-gold font-heading font-bold text-lg block leading-none">
                    {content.hero.stat3Value}
                  </span>
                  <span className="text-slate-400 text-[10px] uppercase tracking-wider">
                    {content.hero.stat3Label}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 bg-navy-800 hover:bg-navy-900 text-white font-semibold rounded-lg shadow-navy flex items-center justify-center gap-2 transition-colors cursor-pointer text-xs"
          >
            <Save size={15} className="text-gold" />
            <span>Save Home Page Customizations</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto px-4 py-2 border border-slate-300 text-slate-600 hover:bg-slate-100 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-xs"
          >
            <RotateCcw size={13} />
            <span>Reset to Default Layout</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminHomeEditor;
