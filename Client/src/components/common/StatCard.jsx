import { TrendingUp, TrendingDown } from "lucide-react";

/**
 * StatCard — KPI metric card with icon and optional trend indicator.
 *
 * Props:
 *  title  : string
 *  value  : string | number
 *  icon   : ReactNode
 *  color  : "blue" | "green" | "emerald" | "yellow" | "amber" | "red" | "purple" | "indigo"
 *  trend  : number  — percentage change (positive = up, negative = down)
 */
const StatCard = ({
  title,
  value,
  icon,
  color = "blue",
  trend,
}) => {
  const colorMap = {
    blue:    { bg: "bg-blue-50",    icon: "text-blue-600",    iconBg: "bg-blue-100"   },
    green:   { bg: "bg-green-50",   icon: "text-green-600",   iconBg: "bg-green-100"  },
    emerald: { bg: "bg-emerald-50", icon: "text-emerald-600", iconBg: "bg-emerald-100"},
    yellow:  { bg: "bg-yellow-50",  icon: "text-yellow-600",  iconBg: "bg-yellow-100" },
    amber:   { bg: "bg-amber-50",   icon: "text-amber-600",   iconBg: "bg-amber-100"  },
    red:     { bg: "bg-red-50",     icon: "text-red-600",     iconBg: "bg-red-100"    },
    purple:  { bg: "bg-purple-50",  icon: "text-purple-600",  iconBg: "bg-purple-100" },
    indigo:  { bg: "bg-indigo-50",  icon: "text-indigo-600",  iconBg: "bg-indigo-100" },
  };

  const c = colorMap[color] ?? colorMap.blue;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-card border border-slate-100 transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900 tabular-nums">
            {value ?? 0}
          </p>

          {trend !== undefined && (
            <div className={`mt-2 flex items-center gap-1 text-xs font-medium ${trend >= 0 ? "text-emerald-600" : "text-red-500"}`}>
              {trend >= 0
                ? <TrendingUp size={13} />
                : <TrendingDown size={13} />
              }
              {Math.abs(trend)}% vs last month
            </div>
          )}
        </div>

        {icon && (
          <div className={`rounded-xl p-3 ${c.iconBg} ${c.icon} shrink-0`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;