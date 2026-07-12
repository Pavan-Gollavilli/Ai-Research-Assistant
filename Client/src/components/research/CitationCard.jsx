import { Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const CitationCard = ({ citation }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(citation.citation);
    setCopied(true);
    toast.success("Citation copied");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group flex flex-col sm:flex-row gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:border-slate-300 print:shadow-none print:border-b">
      
      <div className="flex-1">
        <h3 className="font-semibold text-slate-800">
          {citation.title || "Reference"}
        </h3>
        
        <p 
          className="mt-2 text-sm text-slate-600 leading-relaxed font-mono bg-slate-50 p-3 rounded-lg border border-slate-100"
          dangerouslySetInnerHTML={{ __html: citation.citation }}
        />

        {citation.url && (
          <a
            href={citation.url}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
          >
            Visit Source
          </a>
        )}
      </div>

      <div className="shrink-0 self-start sm:self-center">
        <button
          onClick={handleCopy}
          className="flex items-center justify-center h-10 w-10 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition disabled:opacity-50"
          aria-label="Copy citation"
          disabled={copied}
        >
          {copied ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Copy size={18} />}
        </button>
      </div>

    </div>
  );
};

export default CitationCard;