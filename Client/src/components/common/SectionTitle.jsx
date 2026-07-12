const SectionTitle = ({
  title,
  subtitle,
}) => {
  return (
    <div className="mb-6">

      <h2 className="text-3xl font-bold">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-2 text-slate-500">
          {subtitle}
        </p>
      )}

    </div>
  );
};

export default SectionTitle;