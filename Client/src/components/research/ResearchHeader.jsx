import { Calendar, Clock, Tag, BookOpen, CheckCircle, Loader2, XCircle } from "lucide-react";
import Badge from "../common/Badge";
import { formatDateTime } from "../../utils/formatters";

const statusStyles = {
  completed: {
    color: "emerald",
    icon: CheckCircle,
  },
  processing: {
    color: "amber",
    icon: Loader2,
  },
  failed: {
    color: "red",
    icon: XCircle,
  },
};

const ResearchHeader = ({ research }) => {
  const statusName = research.status?.toLowerCase() || "processing";
  const status = statusStyles[statusName] || statusStyles.processing;
  const StatusIcon = status.icon;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col justify-between gap-6 lg:flex-row">
        
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge color="blue" size="md">
              <span className="flex items-center gap-1.5">
                <BookOpen size={14} /> {research.category}
              </span>
            </Badge>

            <Badge color="purple" size="md">
              <span className="flex items-center gap-1.5">
                <Tag size={14} /> {research.difficulty}
              </span>
            </Badge>

            <Badge color={status.color} size="md" dot>
              <span className="flex items-center gap-1.5 capitalize">
                {statusName === "processing" && <StatusIcon size={14} className="animate-spin" />}
                {statusName !== "processing" && <StatusIcon size={14} />}
                {statusName}
              </span>
            </Badge>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {research.title}
          </h1>

          <p className="text-base text-slate-500 max-w-3xl leading-relaxed">
            {research.topic}
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-3 pt-2 lg:items-end">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <Calendar size={16} />
            {formatDateTime(research.createdAt)}
          </div>
          
          {research.processingTime && (
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <Clock size={16} />
              {research.processingTime} sec
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default ResearchHeader;