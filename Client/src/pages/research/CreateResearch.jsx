import ResearchForm from "../../components/research/ResearchForm";
import PageHeader from "../../components/common/PageHeader";
import Card from "../../components/common/Card";

const CreateResearch = () => {
  return (
    <div className="mx-auto max-w-4xl space-y-6 sm:space-y-8 animate-fade-in-up">
      <PageHeader
        title="AI Research Generator"
        subtitle="Generate comprehensive AI-powered research reports using live articles, verified books, and Gemini AI."
      />

      <Card padding="lg">
        <ResearchForm />
      </Card>
    </div>
  );
};

export default CreateResearch;