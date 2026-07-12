const FilterBar = ({ value, onChange }) => {
  return (
    <div className="relative shrink-0">
      <select
        value={value}
        onChange={onChange}
        className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-4 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:w-48"
      >
        <option value="all">All Status</option>
        <option value="completed">Completed</option>
        <option value="processing">Processing</option>
        <option value="failed">Failed</option>
      </select>
      
      {/* Custom Dropdown Arrow */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default FilterBar;