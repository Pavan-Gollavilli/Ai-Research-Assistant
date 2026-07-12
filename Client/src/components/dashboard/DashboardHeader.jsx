import { Link } from "react-router-dom";
import { Plus, History } from "lucide-react";
import Button from "../common/Button";

const DashboardHeader = ({
  user,
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-brand p-8 text-white shadow-lg">

      {/* Decorative background shapes */}
      <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-20 h-48 w-48 rounded-full bg-blue-400/20 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">

        <div className="max-w-xl">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Welcome back, {user?.name?.split(" ")[0] ?? "User"} 👋
          </h1>
          <p className="mt-3 text-blue-100 leading-relaxed text-sm sm:text-base">
            Create AI-powered research reports, explore your history, and manage everything from one place.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link to="/research/create">
            <Button variant="custom" className="bg-white text-blue-700 hover:bg-blue-50 shadow-sm font-semibold" icon={<Plus size={18} />}>
              New Research
            </Button>
          </Link>

          <Link to="/research/history">
            <Button variant="custom" className="border border-blue-300 text-white hover:bg-white/10 hover:text-white" icon={<History size={18} />}>
              View History
            </Button>
          </Link>
        </div>

      </div>

    </div>
  );
};

export default DashboardHeader;