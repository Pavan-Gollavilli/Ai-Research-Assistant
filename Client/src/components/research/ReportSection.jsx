import Card from "../common/Card";

const ReportSection = ({ title, content, items }) => {
  if (!content && (!items || items.length === 0)) return null;

  return (
    <Card border padding="lg" className="print:shadow-none print:border-none print:p-0">
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-800">
        {title}
      </h2>

      {content && (
        <div className="prose-content">
          <p>{content}</p>
        </div>
      )}

      {items?.length > 0 && (
        <div className="prose-content mt-4">
          <ul className="space-y-3">
            {items.map((item, index) => (
              <li key={index}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
};

export default ReportSection;