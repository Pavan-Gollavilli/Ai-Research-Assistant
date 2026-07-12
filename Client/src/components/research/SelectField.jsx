const SelectField = ({ label, name, register, errors, options }) => {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-sm font-medium text-slate-700">
        {label}
      </label>

      <div className="relative">
        <select
          id={name}
          {...register(name, {
            required: `${label} is required`,
          })}
          className={[
            "w-full appearance-none rounded-xl border bg-slate-50 pl-4 pr-10 py-3 text-sm text-slate-900",
            "transition outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
            errors[name] ? "border-red-400 bg-red-50" : "border-slate-200",
          ].join(" ")}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        
        {/* Custom Dropdown Arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {errors[name] && (
        <p className="text-xs font-medium text-red-500 mt-1">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};

export default SelectField;