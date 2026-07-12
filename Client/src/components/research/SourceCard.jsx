import { ExternalLink, Image as ImageIcon } from "lucide-react";
import Card from "../common/Card";

const SourceCard = ({ title, subtitle, description, image, url }) => {
  return (
    <Card border padding="sm" className="group overflow-hidden">
      <div className="flex flex-col sm:flex-row gap-5 p-2">
        
        {image !== undefined ? (
          <div className="shrink-0">
            {image ? (
              <img
                src={image}
                alt={title}
                className="h-32 w-full sm:w-24 rounded-lg object-cover border border-slate-100 shadow-sm"
              />
            ) : (
              <div className="flex h-32 w-full sm:w-24 items-center justify-center rounded-lg bg-slate-50 border border-slate-100 text-slate-300">
                <ImageIcon size={24} />
              </div>
            )}
          </div>
        ) : null}

        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-lg font-semibold text-slate-800 line-clamp-2 leading-snug">
            {title}
          </h3>

          {subtitle && (
            <p className="mt-1.5 text-xs font-medium text-slate-500 uppercase tracking-wider">
              {subtitle}
            </p>
          )}

          {description && (
            <p className="mt-2.5 line-clamp-2 text-sm text-slate-600 leading-relaxed">
              {description}
            </p>
          )}

          {url && (
            <div className="mt-3">
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition"
              >
                Open Source
                <ExternalLink size={14} />
              </a>
            </div>
          )}
        </div>

      </div>
    </Card>
  );
};

export default SourceCard;