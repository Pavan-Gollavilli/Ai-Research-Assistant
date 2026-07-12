import { Loader2 } from "lucide-react";

/**
 * Button — Primary reusable button component.
 *
 * Props:
 *  variant  : "primary" | "secondary" | "danger" | "success" | "outline" | "ghost"
 *  size     : "sm" | "md" | "lg"
 *  loading  : boolean — shows spinner and disables button
 *  disabled : boolean
 *  icon     : ReactNode — icon displayed before children
 *  fullWidth: boolean
 *  type     : "button" | "submit" | "reset"
 */
const Button = ({
  children,
  type      = "button",
  variant   = "primary",
  size      = "md",
  onClick,
  disabled  = false,
  loading   = false,
  icon      = null,
  fullWidth = false,
  className = "",
}) => {
  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-sm hover:shadow-md",
    secondary:
      "bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800",
    danger:
      "bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-sm hover:shadow-md",
    success:
      "bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white shadow-sm hover:shadow-md",
    outline:
      "border border-slate-300 hover:bg-slate-50 active:bg-slate-100 text-slate-700 bg-white",
    ghost:
      "hover:bg-slate-100 active:bg-slate-200 text-slate-700",
    custom: "",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5",
  };

  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      className={[
        "inline-flex items-center justify-center font-medium rounded-btn transition-all duration-200",
        "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant] ?? variants.primary,
        sizes[size]       ?? sizes.md,
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin shrink-0" />
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      {children}
    </button>
  );
};

export default Button;