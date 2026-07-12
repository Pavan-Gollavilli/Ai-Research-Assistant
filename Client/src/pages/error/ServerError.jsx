import { Link } from "react-router-dom";
import { ServerCrash, Home, RefreshCw } from "lucide-react";
import Button from "../../components/common/Button";

const ServerError = ({ error, resetErrorBoundary }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6">
      <div className="max-w-md w-full text-center space-y-6 animate-fade-in-up">
        
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-red-100 text-red-600 shadow-sm">
          <ServerCrash size={48} />
        </div>
        
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Something went wrong
          </h1>
          <p className="text-slate-500 leading-relaxed">
            We experienced an unexpected error. Please try again later or contact support if the issue persists.
          </p>
          
          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-600 text-sm font-mono text-left rounded-xl border border-red-100 overflow-auto max-h-32">
              {error.message || error.toString()}
            </div>
          )}
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          {resetErrorBoundary && (
            <Button
              variant="outline"
              onClick={resetErrorBoundary}
              icon={<RefreshCw size={16} />}
              className="w-full sm:w-auto text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
            >
              Try Again
            </Button>
          )}

          <Link to="/dashboard" className="w-full sm:w-auto">
            <Button
              className="w-full sm:w-auto"
              icon={<Home size={16} />}
            >
              Back to Dashboard
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ServerError;
