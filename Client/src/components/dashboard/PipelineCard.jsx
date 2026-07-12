import {
  Search,
  BookOpen,
  Brain,
  FileText,
  ArrowDown,
} from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Web Search Agent",
    description: "Collects articles using Serper API",
    color: "bg-blue-500",
  },
  {
    icon: BookOpen,
    title: "Google Books Agent",
    description: "Finds relevant books and references",
    color: "bg-green-500",
  },
  {
    icon: Brain,
    title: "Gemini Research Agent",
    description: "Generates AI-powered research report",
    color: "bg-purple-500",
  },
  {
    icon: FileText,
    title: "Structured Report",
    description: "Creates final research with citations",
    color: "bg-orange-500",
  },
];

const PipelineCard = () => {
  return (
    <div className="rounded-2xl bg-white shadow-md p-6">

      <h2 className="text-2xl font-bold mb-6">
        🤖 AI Research Pipeline
      </h2>

      <div className="space-y-5">

        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div key={step.title}>

              <div className="flex items-center gap-5">

                <div
                  className={`h-14 w-14 rounded-xl ${step.color} flex items-center justify-center text-white`}
                >
                  <Icon size={26} />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    {step.title}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {step.description}
                  </p>
                </div>

              </div>

              {index !== steps.length - 1 && (
                <div className="ml-6 my-3">
                  <ArrowDown
                    className="text-slate-400"
                    size={20}
                  />
                </div>
              )}

            </div>
          );
        })}

      </div>

    </div>
  );
};

export default PipelineCard;