import { Plus, History, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../common/Card";

const Action = ({ to, icon, title, description, colorClass }) => (
  <Link to={to} className="block group">
    <Card 
      hover 
      padding="sm" 
      className="flex items-center gap-4 transition-all duration-300"
    >
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110 group-hover:rotate-3 ${colorClass}`}>
        {icon}
      </div>
      
      <div className="flex-1 overflow-hidden">
        <h3 className="text-base font-semibold text-slate-800 flex items-center justify-between">
          {title}
          <ArrowRight size={14} className="text-slate-300 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-slate-600" />
        </h3>
        <p className="mt-0.5 text-xs text-slate-500 truncate">
          {description}
        </p>
      </div>
    </Card>
  </Link>
);

const QuickActions = () => {
  return (
    <section className="flex flex-col h-full rounded-2xl bg-white p-6 sm:p-8 shadow-card border border-slate-100">
      <h2 className="mb-6 text-xl font-bold text-slate-800">
        Quick Actions
      </h2>

      <div className="flex flex-col gap-4">
        <Action
          to="/research/create"
          icon={<Plus size={22} />}
          title="New Research"
          description="Generate an AI research report."
          colorClass="bg-blue-50 text-blue-600"
        />

        <Action
          to="/research/history"
          icon={<History size={22} />}
          title="Research History"
          description="Browse your past reports."
          colorClass="bg-indigo-50 text-indigo-600"
        />

        <Action
          to="/profile"
          icon={<User size={22} />}
          title="My Profile"
          description="Manage your account settings."
          colorClass="bg-emerald-50 text-emerald-600"
        />
      </div>
    </section>
  );
};

export default QuickActions;