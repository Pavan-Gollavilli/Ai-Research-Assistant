import { FileSearch } from "lucide-react";

/**
 * EmptyState — Full-section empty data state.
 *
 * Props:
 *  icon        : ReactNode  — override default icon
 *  title       : string
 *  description : string
 *  action      : ReactNode  — CTA button / link
 */
const EmptyState = ({
  icon,
  title,
  description,
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-white px-8 py-16 text-center shadow-card border border-slate-100 animate-fade-in-up">

      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50 text-blue-400">
        {icon ?? <FileSearch size={38} />}
      </div>

      <h3 className="text-xl font-semibold text-slate-800">
        {title}
      </h3>

      {description && (
        <p className="mt-2 max-w-sm text-sm text-slate-500 leading-relaxed">
          {description}
        </p>
      )}

      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}

    </div>
  );
};

export default EmptyState;