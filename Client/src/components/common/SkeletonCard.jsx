/**
 * SkeletonCard — Animated shimmer placeholder matching card layouts.
 *
 * Props:
 *  lines   : number  — number of text skeleton lines
 *  avatar  : boolean — show circular avatar placeholder
 *  header  : boolean — show a header bar placeholder
 */
const SkeletonCard = ({
  lines  = 3,
  avatar = false,
  header = true,
}) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-card border border-slate-100">
      {avatar && (
        <div className="mb-5 flex items-center gap-4">
          <div className="skeleton h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="skeleton h-4 w-2/3 rounded" />
            <div className="skeleton h-3 w-1/3 rounded" />
          </div>
        </div>
      )}

      {header && !avatar && (
        <div className="skeleton mb-4 h-5 w-1/2 rounded" />
      )}

      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="skeleton h-4 rounded"
            style={{ width: i === lines - 1 ? "60%" : "100%" }}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * SkeletonGrid — Grid of SkeletonCards.
 */
export const SkeletonGrid = ({ count = 3, cols = 3, ...props }) => (
  <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-${cols}`}>
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} {...props} />
    ))}
  </div>
);

export default SkeletonCard;
