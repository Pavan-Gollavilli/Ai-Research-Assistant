import { Link } from "react-router-dom";
import { SearchX, Home, ArrowLeft } from "lucide-react";
import Button from "../../components/common/Button";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6">
      <div className="max-w-md w-full text-center space-y-6 animate-fade-in-up">
        
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-100 text-blue-600 shadow-sm">
          <SearchX size={48} />
        </div>
        
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            404
          </h1>
          <h2 className="text-xl font-semibold text-slate-800">
            Page Not Found
          </h2>
          <p className="text-slate-500 leading-relaxed">
            We couldn't find the page you were looking for. It might have been moved, deleted, or perhaps the URL is incorrect.
          </p>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            icon={<ArrowLeft size={16} />}
            className="w-full sm:w-auto"
          >
            Go Back
          </Button>

          <Link to="/dashboard" className="w-full sm:w-auto">
            <Button
              className="w-full sm:w-auto"
              icon={<Home size={16} />}
            >
              Dashboard
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default NotFound;
