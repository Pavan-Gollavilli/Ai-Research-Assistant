const ResearchSummary = ({ summary }) => {
  if (!summary) return null;

  return (
    <section className="rounded-2xl bg-white p-8 shadow-md">

      <h2 className="mb-6 text-3xl font-bold">
        Research Summary
      </h2>

      {/* Overview */}

      {summary.overview && (
        <div className="mb-8">
          <h3 className="mb-3 text-xl font-semibold">
            Overview
          </h3>

          <p className="leading-8 text-slate-700">
            {summary.overview}
          </p>
        </div>
      )}

      {/* Key Points */}

      {summary.keyPoints?.length > 0 && (
        <div className="mb-8">
          <h3 className="mb-3 text-xl font-semibold">
            Key Points
          </h3>

          <ul className="list-disc space-y-2 pl-6 text-slate-700">
            {summary.keyPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Important Facts */}

      {summary.importantFacts?.length > 0 && (
        <div className="mb-8">
          <h3 className="mb-3 text-xl font-semibold">
            Important Facts
          </h3>

          <ul className="list-disc space-y-2 pl-6 text-slate-700">
            {summary.importantFacts.map((fact, index) => (
              <li key={index}>{fact}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendations */}

      {summary.recommendations?.length > 0 && (
        <div className="mb-8">
          <h3 className="mb-3 text-xl font-semibold">
            Recommendations
          </h3>

          <ul className="list-disc space-y-2 pl-6 text-slate-700">
            {summary.recommendations.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Limitations */}

      {summary.limitations?.length > 0 && (
        <div className="mb-8">
          <h3 className="mb-3 text-xl font-semibold">
            Limitations
          </h3>

          <ul className="list-disc space-y-2 pl-6 text-slate-700">
            {summary.limitations.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Conclusion */}

      {summary.conclusion && (
        <div>
          <h3 className="mb-3 text-xl font-semibold">
            Conclusion
          </h3>

          <p className="leading-8 text-slate-700">
            {summary.conclusion}
          </p>
        </div>
      )}

    </section>
  );
};

export default ResearchSummary;