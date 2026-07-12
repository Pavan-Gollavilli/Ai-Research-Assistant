import { useParams } from "react-router-dom";

import useResearch from "../../hooks/useResearch";

import LoadingResearch from "../../components/research/LoadingResearch";
import ResearchHeader from "../../components/research/ResearchHeader";
import SummaryCard from "../../components/research/SummaryCard";
import ReportSection from "../../components/research/ReportSection";
import KeywordSection from "../../components/research/KeywordSection";
import SourceCard from "../../components/research/SourceCard";
import CitationCard from "../../components/research/CitationCard";

const ResearchDetails = () => {
  const { id } = useParams();

  const { research, loading, error } = useResearch(id);

  if (loading) {
    return <LoadingResearch />;
  }

  if (error) {
    return (
      <div className="rounded-2xl bg-red-50 p-8 text-center shadow">
        <h2 className="text-2xl font-bold text-red-600">
          Error
        </h2>

        <p className="mt-3 text-slate-600">
          {error}
        </p>
      </div>
    );
  }

  if (!research) {
    return (
      <div className="rounded-2xl bg-yellow-50 p-8 text-center shadow">
        <h2 className="text-2xl font-bold">
          Research Not Found
        </h2>
      </div>
    );
  }

  const report = research.report || {};
  const metadata = research.searchMetadata || {};
  const generatedBy = research.generatedBy || {};

  return (
    <div className="space-y-8">

      {/* Header */}

      <ResearchHeader research={research} />

      {/* Executive Summary */}

      <SummaryCard
        summary={report.executiveSummary}
      />

      {/* Report */}

      <ReportSection
        title="Introduction"
        content={report.introduction}
      />

      <ReportSection
        title="Background"
        content={report.background}
      />

      <ReportSection
        title="Current Trends"
        items={report.currentTrends}
      />

      <ReportSection
        title="Technologies"
        items={report.technologies}
      />

      <ReportSection
        title="Applications"
        items={report.applications}
      />

      <ReportSection
        title="Advantages"
        items={report.advantages}
      />

      <ReportSection
        title="Challenges"
        items={report.challenges}
      />

      <ReportSection
        title="Future Scope"
        content={report.futureScope}
      />

      <ReportSection
        title="Best Practices"
        items={report.bestPractices}
      />

      <ReportSection
        title="Conclusion"
        content={report.conclusion}
      />

      {/* Keywords */}

      <KeywordSection
        keywords={research.keywords}
      />

      {/* Articles */}

      {research.articles?.length > 0 && (
        <section className="space-y-5">

          <h2 className="text-2xl font-bold">
            Articles
          </h2>

          <div className="grid gap-5">

            {research.articles.map((article, index) => (
              <SourceCard
                key={index}
                title={article.title}
                subtitle={article.source}
                description={article.snippet}
                url={article.url}
              />
            ))}

          </div>

        </section>
      )}

      {/* Books */}

      {research.books?.length > 0 && (
        <section className="space-y-5">

          <h2 className="text-2xl font-bold">
            Books
          </h2>

          <div className="grid gap-5">

            {research.books.map((book, index) => (
              <SourceCard
                key={index}
                title={book.title}
                subtitle={book.authors?.join(", ")}
                description={book.description}
                image={book.thumbnail}
                url={book.infoLink}
              />
            ))}

          </div>

        </section>
      )}

      {/* References */}

      {research.sources?.length > 0 && (
        <section className="space-y-5">

          <h2 className="text-2xl font-bold">
            References
          </h2>

          <div className="space-y-4">

            {research.sources.map((source, index) => (
              <CitationCard
                key={index}
                citation={source}
              />
            ))}

          </div>

        </section>
      )}

      {/* Research Metadata */}

      <section className="rounded-2xl bg-white p-6 shadow-md">

        <h2 className="mb-6 text-2xl font-bold">
          Research Information
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          <div>
            <p className="text-sm text-slate-500">
              Category
            </p>

            <p className="font-semibold">
              {research.category}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Language
            </p>

            <p className="font-semibold">
              {research.language}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Difficulty
            </p>

            <p className="font-semibold">
              {research.difficulty}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Citation Style
            </p>

            <p className="font-semibold">
              {research.citationStyle}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              AI Provider
            </p>

            <p className="font-semibold">
              {generatedBy.provider}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              AI Model
            </p>

            <p className="font-semibold">
              {generatedBy.model}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Articles Found
            </p>

            <p className="font-semibold">
              {metadata.totalArticles}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Books Found
            </p>

            <p className="font-semibold">
              {metadata.totalBooks}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Sources
            </p>

            <p className="font-semibold">
              {metadata.totalSources}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Processing Time
            </p>

            <p className="font-semibold">
              {research.processingTime} sec
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Generated At
            </p>

            <p className="font-semibold">
              {metadata.generatedAt
                ? new Date(
                    metadata.generatedAt
                  ).toLocaleString()
                : "-"}
            </p>
          </div>

        </div>

      </section>

    </div>
  );
};

export default ResearchDetails;