/**
 * SkeletonTable — Animated shimmer row list for table/list views.
 *
 * Props:
 *  rows    : number — number of skeleton rows
 *  columns : number — number of columns per row
 */
const SkeletonTable = ({
  rows    = 5,
  columns = 4,
}) => {
  return (
    <div className="rounded-2xl bg-white shadow-card border border-slate-100 overflow-hidden">
      {/* Header row */}
      <div className="flex items-center gap-4 border-b border-slate-100 px-6 py-4">
        {Array.from({ length: columns }).map((_, i) => (
          <div
            key={i}
            className="skeleton h-3 rounded"
            style={{ flex: i === 0 ? 2 : 1 }}
          />
        ))}
      </div>

      {/* Data rows */}
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div
          key={rowIdx}
          className="flex items-center gap-4 border-b border-slate-50 px-6 py-4 last:border-b-0"
        >
          {Array.from({ length: columns }).map((_, colIdx) => (
            <div
              key={colIdx}
              className="skeleton h-4 rounded"
              style={{
                flex:  colIdx === 0 ? 2 : 1,
                width: colIdx === columns - 1 ? "60%" : undefined,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SkeletonTable;
