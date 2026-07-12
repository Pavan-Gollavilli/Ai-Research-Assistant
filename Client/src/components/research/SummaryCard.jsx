import { Sparkles } from "lucide-react";
import Card from "../common/Card";

const SummaryCard = ({ summary }) => {
  if (!summary) return null;

  return (
    <Card border className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50 print:bg-white print:border-none print:shadow-none print:p-0">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
          <Sparkles size={20} />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Executive Summary
        </h2>
      </div>

      <div className="prose-content">
        <p className="text-base text-slate-700 leading-relaxed font-medium">
          {summary}
        </p>
      </div>
    </Card>
  );
};

export default SummaryCard;