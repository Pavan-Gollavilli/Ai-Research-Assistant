import { Brain } from "lucide-react";

/**
 * Loader — Full-section or full-screen loading state.
 *
 * Props:
 *  text       : string — message below spinner
 *  fullScreen : boolean — centers in the full viewport height
 */
const Loader = ({
  text       = "Loading...",
  fullScreen = false,
}) => {
  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen ? "min-h-screen" : "min-h-[300px]"
      }`}
    >
      <div className="flex flex-col items-center gap-5">
        {/* Branded animated spinner */}
        <div className="relative">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Brain size={22} className="text-blue-600" />
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm font-medium text-slate-700">{text}</p>
          <p className="mt-1 text-xs text-slate-400">Please wait a moment…</p>
        </div>
      </div>
    </div>
  );
};

export default Loader;