import { useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import useResearchHistory from "../../hooks/useResearchHistory";
import Loader from "../../components/common/Loader";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatsSection from "../../components/dashboard/StatsSection";
import RecentResearch from "../../components/dashboard/RecentResearch";
import QuickActions from "../../components/dashboard/QuickActions";

const Dashboard = () => {
  const { currentUser } = useAuth();

  const {
    loading,
    research,
  } = useResearchHistory();

  const stats = useMemo(() => {
    return {
      total: research.length,

      completed: research.filter(
        (item) => item.status === "completed"
      ).length,

      processing: research.filter(
        (item) => item.status === "processing"
      ).length,

      failed: research.filter(
        (item) => item.status === "failed"
      ).length,
    };
  }, [research]);

  if (loading) {
    return (
      <Loader
        text="Loading dashboard data..."
      />
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in-up">

      <DashboardHeader
        user={currentUser}
      />

      <StatsSection
        stats={stats}
      />

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentResearch
            research={research.slice(0, 5)}
          />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>

    </div>
  );
};

export default Dashboard;