import { AlertTriangle, RefreshCw } from "lucide-react";
import Button from "./Button";

/**
 * ErrorState — Error message display with retry capability.
 *
 * Props:
 *  title   : string
 *  message : string
 *  onRetry : () => void  — if provided, shows a Retry button
 */
const ErrorState = ({
  title   = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-white px-8 py-16 text-center shadow-card border border-slate-100 animate-fade-in-up">

      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50 text-red-400">
        <AlertTriangle size={38} />
      </div>

      <h3 className="text-xl font-semibold text-slate-800">
        {title}
      </h3>

      <p className="mt-2 max-w-sm text-sm text-slate-500 leading-relaxed">
        {message}
      </p>

      {onRetry && (
        <div className="mt-6">
          <Button
            variant="outline"
            size="md"
            onClick={onRetry}
            icon={<RefreshCw size={15} />}
          >
            Try Again
          </Button>
        </div>
      )}

    </div>
  );
};

export default ErrorState;
