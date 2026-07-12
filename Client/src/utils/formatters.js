/**
 * ==========================================
 * Formatting Utilities
 * ==========================================
 */

/**
 * Format a date string to a readable locale date.
 * @param {string|Date} dateStr
 * @returns {string}  e.g. "Jul 11, 2026"
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year:  "numeric",
    month: "short",
    day:   "numeric",
  });
};

/**
 * Format a date string to a readable locale date + time.
 * @param {string|Date} dateStr
 * @returns {string}  e.g. "Jul 11, 2026, 6:30 PM"
 */
export const formatDateTime = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleString("en-US", {
    year:   "numeric",
    month:  "short",
    day:    "numeric",
    hour:   "2-digit",
    minute: "2-digit",
  });
};

/**
 * Get time-based greeting.
 * @returns {string}  "Good morning" | "Good afternoon" | "Good evening"
 */
export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

/**
 * Get Tailwind CSS classes for a research status.
 * @param {"completed"|"processing"|"failed"} status
 * @returns {{ bg: string, text: string, dot: string }}
 */
export const getStatusClasses = (status) => {
  const map = {
    completed:  { bg: "bg-emerald-50",  text: "text-emerald-700", dot: "bg-emerald-500",  border: "border-emerald-200" },
    processing: { bg: "bg-amber-50",    text: "text-amber-700",   dot: "bg-amber-500",    border: "border-amber-200"   },
    failed:     { bg: "bg-red-50",      text: "text-red-700",     dot: "bg-red-500",      border: "border-red-200"     },
  };
  return map[status] ?? map.processing;
};

/**
 * Get initials from a full name string.
 * @param {string} name
 * @returns {string}  e.g. "Pavan Gollavilli" → "PG"
 */
export const getInitials = (name = "") => {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .slice(0, 2)
    .join("");
};

/**
 * Truncate a string to a maximum length, appending "…".
 * @param {string} str
 * @param {number} maxLen
 * @returns {string}
 */
export const truncate = (str = "", maxLen = 80) => {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen).trimEnd() + "…";
};

/**
 * Format a duration in seconds to a human-readable string.
 * @param {number} seconds
 * @returns {string}  e.g. "2m 30s" or "45s"
 */
export const formatDuration = (seconds) => {
  if (!seconds && seconds !== 0) return "—";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
};

/**
 * Build a UI Avatars URL from a name string.
 * @param {string} name
 * @param {number} size
 * @returns {string}
 */
export const getAvatarUrl = (name = "User", size = 128) => {
  const encoded = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${encoded}&size=${size}&background=dbeafe&color=1d4ed8&bold=true`;
};
