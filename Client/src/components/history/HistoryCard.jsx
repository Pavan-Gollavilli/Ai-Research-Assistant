import { Calendar, Trash2, ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import Badge from "../common/Badge";
import Button from "../common/Button";
import { formatDateTime, truncate } from "../../utils/formatters";

const HistoryCard = ({ research, onDelete }) => {
  const statusColorMap = {
    completed: "emerald",
    processing: "amber",
    failed: "red"
  };

  const statusName = research.status?.toLowerCase() || "processing";
  const badgeColor = statusColorMap[statusName] || "blue";

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center gap-2 mb-2">
            <Badge color="indigo" size="sm" className="shrink-0">{research.category}</Badge>
            <Badge color={badgeColor} size="sm" dot className="shrink-0 capitalize">{statusName}</Badge>
          </div>
          
          <h3 className="text-xl font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {research.title}
          </h3>
          
          <p className="mt-2 text-sm text-slate-500 line-clamp-2 leading-relaxed">
            {truncate(research.topic, 150)}
          </p>
        </div>

      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5">
        <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            {formatDateTime(research.createdAt)}
          </div>
          {research.processingTime && (
            <div className="flex items-center gap-2 hidden sm:flex">
              <Clock size={16} />
              {research.processingTime}s
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={() => onDelete(research)}
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
            icon={<Trash2 size={16} />}
          >
            Delete
          </Button>
          
          <Link to={`/research/${research._id}`}>
            <Button
              variant="secondary"
              className="group-hover:bg-blue-600 group-hover:text-white transition-colors"
            >
              View Report <ArrowRight size={16} className="ml-1" />
            </Button>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default HistoryCard;