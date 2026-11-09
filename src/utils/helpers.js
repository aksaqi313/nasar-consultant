// ─────────────────────────────────────────────────────────────
// NASAR CONSULTANT — Helper Utilities
// ─────────────────────────────────────────────────────────────

/**
 * Format a date string into a readable format.
 * @param {string|Date} date
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string}
 */
export const formatDate = (date, options = {}) => {
  const defaults = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat('en-US', { ...defaults, ...options }).format(
    new Date(date)
  );
};

/**
 * Truncate a string to a given length, appending ellipsis.
 * @param {string} str
 * @param {number} maxLength
 * @returns {string}
 */
export const truncate = (str, maxLength = 150) => {
  if (!str || str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + '…';
};

/**
 * Convert a string to a URL-friendly slug.
 * @param {string} str
 * @returns {string}
 */
export const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

/**
 * Scroll to the top of the page.
 */
export const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

/**
 * Validate an email address format.
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/**
 * Validate a phone number (basic international format).
 * @param {string} phone
 * @returns {boolean}
 */
export const isValidPhone = (phone) =>
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone);

/**
 * Capitalize the first letter of each word in a string.
 * @param {string} str
 * @returns {string}
 */
export const titleCase = (str) =>
  str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

/**
 * Generate a random ID string.
 * @returns {string}
 */
export const generateId = () => Math.random().toString(36).slice(2, 11);

/**
 * Clamp a number between a min and max.
 * @param {number} num
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
