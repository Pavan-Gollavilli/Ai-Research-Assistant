/**
 * PageHeader — Top section of every page with title, subtitle, and optional action.
 *
 * Props:
 *  title    : string
 *  subtitle : string
 *  action   : ReactNode  — right-aligned CTA
 *  border   : boolean    — adds a bottom border
 */
const PageHeader = ({
  title,
  subtitle,
  action,
  border = false,
}) => {
  return (
    <div
      className={[
        "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
        border ? "border-b border-slate-200 pb-6 mb-2" : "mb-0",
      ].join(" ")}
    >
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-1.5 text-sm text-slate-500 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <div className="shrink-0">
          {action}
        </div>
      )}
    </div>
  );
};

export default PageHeader;