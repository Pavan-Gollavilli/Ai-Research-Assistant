const Info = ({ label, value }) => (
  <div>
    <p className="text-sm text-slate-500">
      {label}
    </p>

    <p className="font-semibold">
      {value || "-"}
    </p>
  </div>
);

const ResearchInfo = ({ research }) => {
  const metadata = research.searchMetadata || {};
  const ai = research.generatedBy || {};

  return (
    <section className="rounded-2xl bg-white p-8 shadow-md">

      <h2 className="mb-6 text-3xl font-bold">
        Research Information
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        <Info label="Category" value={research.category} />
        <Info label="Language" value={research.language} />
        <Info label="Difficulty" value={research.difficulty} />
        <Info label="Citation Style" value={research.citationStyle} />
        <Info label="AI Provider" value={ai.provider} />
        <Info label="AI Model" value={ai.model} />
        <Info label="Articles" value={metadata.totalArticles} />
        <Info label="Books" value={metadata.totalBooks} />
        <Info label="Sources" value={metadata.totalSources} />
        <Info label="Processing Time" value={`${research.processingTime} sec`} />
        <Info
          label="Generated At"
          value={
            metadata.generatedAt
              ? new Date(metadata.generatedAt).toLocaleString()
              : "-"
          }
        />

      </div>

    </section>
  );
};

export default ResearchInfo;