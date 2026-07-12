import StatCard from "../common/StatCard";
import { SkeletonGrid } from "../common/SkeletonCard";
import { FileText, CheckCircle2, Clock3, AlertCircle } from "lucide-react";

const StatsSection = ({ stats }) => {
  if (!stats) {
    return <SkeletonGrid count={4} cols={4} />;
  }

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Research"
        value={stats.total}
        color="blue"
        icon={<FileText size={24} />}
      />

      <StatCard
        title="Completed"
        value={stats.completed}
        color="emerald"
        icon={<CheckCircle2 size={24} />}
      />

      <StatCard
        title="Processing"
        value={stats.processing}
        color="amber"
        icon={<Clock3 size={24} />}
      />

      <StatCard
        title="Failed"
        value={stats.failed}
        color="red"
        icon={<AlertCircle size={24} />}
      />
    </div>
  );
};

export default StatsSection;