import { Brain } from "lucide-react";

/**
 * AuthLayout — Centered layout for Login and Register pages.
 * Features a centered logo and a footer section.
 */
const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      
      {/* ── Main Content Area ──────────────────────── */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Card Container */}
        <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/80 p-8 sm:p-10 relative overflow-hidden">
          
          {/* Subtle decorative background inside the card */}
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-blue-50/80 to-transparent pointer-events-none" />

          {/* Centered Logo */}
          <div className="relative mb-10 flex flex-col items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30 text-white ring-4 ring-white">
              <Brain size={28} />
            </div>
            <span className="font-extrabold text-slate-900 text-2xl tracking-tight">
              AI Research
            </span>
          </div>

          {/* Form Content */}
          <div className="relative w-full">
            {children}
          </div>
          
        </div>
        
      </div>
    </div>
  );
};

export default AuthLayout;
