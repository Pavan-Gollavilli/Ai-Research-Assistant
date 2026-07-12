const InputField = ({ label, name, register, errors, placeholder }) => {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        id={name}
        {...register(name, {
          required: `${label} is required`,
        })}
        placeholder={placeholder}
        className={[
          "w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-900",
          "placeholder:text-slate-400 transition outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
          errors[name] ? "border-red-400 bg-red-50" : "border-slate-200",
        ].join(" ")}
      />

      {errors[name] && (
        <p className="text-xs font-medium text-red-500 mt-1">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};

export default InputField;