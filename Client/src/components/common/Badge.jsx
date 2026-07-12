/**
 * Badge — Status / category label pill.
 *
 * Props:
 *  color  : "blue"|"green"|"yellow"|"red"|"purple"|"gray"|"indigo"|"orange"|"emerald"
 *  size   : "sm" | "md"
 *  dot    : boolean — shows a colored status dot before text
 */
const Badge = ({
  children,
  color    = "blue",
  size     = "md",
  dot      = false,
  className = "",
}) => {
  const colors = {
    blue:    "bg-blue-50   text-blue-700   border-blue-200",
    green:   "bg-green-50  text-green-700  border-green-200",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
    yellow:  "bg-yellow-50 text-yellow-700 border-yellow-200",
    amber:   "bg-amber-50  text-amber-700  border-amber-200",
    red:     "bg-red-50    text-red-700    border-red-200",
    purple:  "bg-purple-50 text-purple-700 border-purple-200",
    gray:    "bg-slate-100 text-slate-600  border-slate-200",
    indigo:  "bg-indigo-50 text-indigo-700 border-indigo-200",
    orange:  "bg-orange-50 text-orange-700 border-orange-200",
  };

  const dots = {
    blue:    "bg-blue-500",
    green:   "bg-green-500",
    emerald: "bg-emerald-500",
    yellow:  "bg-yellow-500",
    amber:   "bg-amber-500",
    red:     "bg-red-500",
    purple:  "bg-purple-500",
    gray:    "bg-slate-400",
    indigo:  "bg-indigo-500",
    orange:  "bg-orange-500",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs",
  };

  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full border font-medium",
        colors[color] ?? colors.blue,
        sizes[size]   ?? sizes.md,
        className,
      ].join(" ")}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${dots[color] ?? dots.blue}`}
        />
      )}
      {children}
    </span>
  );
};

export default Badge;