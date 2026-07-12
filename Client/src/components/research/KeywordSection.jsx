import Card from "../common/Card";
import Badge from "../common/Badge";

const KeywordSection = ({ keywords }) => {
  if (!keywords) return null;

  return (
    <Card border padding="lg" className="print:shadow-none print:border-none print:p-0">
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-800">
        Keywords & Tags
      </h2>

      <div className="space-y-6">
        {keywords.primary?.length > 0 && (
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">
              Primary Keywords
            </h3>
            <div className="flex flex-wrap gap-2">
              {keywords.primary.map((keyword, index) => (
                <Badge key={index} color="blue">{keyword}</Badge>
              ))}
            </div>
          </div>
        )}

        {keywords.secondary?.length > 0 && (
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">
              Secondary Keywords
            </h3>
            <div className="flex flex-wrap gap-2">
              {keywords.secondary.map((keyword, index) => (
                <Badge key={index} color="emerald">{keyword}</Badge>
              ))}
            </div>
          </div>
        )}

        {keywords.tags?.length > 0 && (
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">
              Related Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {keywords.tags.map((tag, index) => (
                <Badge key={index} color="purple">#{tag}</Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default KeywordSection;