import { Link } from "react-router-dom";
import { ArrowRight, FileText } from "lucide-react";
import ResearchCard from "./ResearchCard";
import EmptyState from "../common/EmptyState";

const RecentResearch = ({ research }) => {
  return (
    <section className="flex flex-col h-full rounded-2xl bg-white p-6 sm:p-8 shadow-card border border-slate-100">

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Recent Research
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Your latest generated reports
          </p>
        </div>
        
        {research?.length > 0 && (
          <Link 
            to="/research/history"
            className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition"
          >
            View All <ArrowRight size={16} />
          </Link>
        )}
      </div>

      {!research ? (
        <div className="flex-1 space-y-4">
          <div className="skeleton h-24 w-full rounded-xl" />
          <div className="skeleton h-24 w-full rounded-xl" />
          <div className="skeleton h-24 w-full rounded-xl" />
        </div>
      ) : research.length === 0 ? (
        <div className="flex-1 py-8">
          <EmptyState 
            icon={<FileText size={40} />}
            title="No research yet"
            description="You haven't generated any research reports. Create your first report to get started."
            action={
              <Link to="/research/create" className="text-blue-600 font-medium hover:underline">
                Create New Research
              </Link>
            }
          />
        </div>
      ) : (
        <div className="flex-1 flex flex-col gap-4">
          {research.map((item) => (
            <ResearchCard
              key={item._id}
              research={item}
            />
          ))}
        </div>
      )}

    </section>
  );
};

export default RecentResearch;