/**
 * Card — Reusable container component.
 *
 * Props:
 *  hover    : boolean — enables lift + shadow on hover
 *  padding  : "none" | "sm" | "md" | "lg"
 *  border   : boolean — adds a border
 *  className: string
 */
const Card = ({
  children,
  hover     = false,
  padding   = "md",
  border    = false,
  className = "",
}) => {
  const paddings = {
    none: "",
    sm:   "p-4",
    md:   "p-6",
    lg:   "p-8",
  };

  return (
    <div
      className={[
        "rounded-2xl bg-white shadow-card",
        hover ? "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover cursor-pointer" : "",
        border ? "border border-slate-200" : "",
        paddings[padding] ?? paddings.md,
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
};

export default Card;