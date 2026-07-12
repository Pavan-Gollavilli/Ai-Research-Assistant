import { Calendar, ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import Badge from "../common/Badge";
import { formatDateTime, getStatusClasses, truncate } from "../../utils/formatters";

const ResearchCard = ({ research }) => {
  const statusColorMap = {
    completed: "emerald",
    processing: "amber",
    failed: "red"
  };

  const statusName = research.status?.toLowerCase() || "processing";
  const badgeColor = statusColorMap[statusName] || "blue";

  return (
    <div className="group rounded-xl border border-slate-100 bg-slate-50 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-card hover:border-slate-200">

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center gap-2 mb-2">
            <Badge color="indigo" size="sm" className="shrink-0">{research.category}</Badge>
            <Badge color={badgeColor} size="sm" dot className="shrink-0 capitalize">{statusName}</Badge>
          </div>
          
          <h3 className="text-lg font-semibold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {research.title}
          </h3>
          
          <p className="mt-1.5 text-sm text-slate-500 line-clamp-2 leading-relaxed">
            {truncate(research.topic, 100)}
          </p>
        </div>

      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} />
            {formatDateTime(research.createdAt)}
          </div>
          {research.processingTime && (
            <div className="flex items-center gap-1.5 hidden sm:flex">
              <Clock size={14} />
              {research.processingTime}s
            </div>
          )}
        </div>

        <Link
          to={`/research/${research._id}`}
          className="flex items-center gap-1.5 text-sm font-medium text-blue-600 transition-all hover:gap-2 hover:text-blue-700"
        >
          View Report <ArrowRight size={16} />
        </Link>
      </div>

    </div>
  );
};

export default ResearchCard;