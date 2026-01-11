import { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";

interface GeneratedLinkResultProps {
  /** The generated link URL to display */
  link: string;
}

/**
 * GeneratedLinkResult - Displays a generated link with copy and test buttons
 * 
 * This component is used by link generator tools to show the result
 * with options to copy the link or test it in a new tab.
 */
export function GeneratedLinkResult({ link }: GeneratedLinkResultProps) {
  const txt = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 animate-fade-in">
      <h3 className="font-heading text-lg mb-4">
        {txt.tools?.generatedLink || "Generated link:"}
      </h3>
      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        <code className="text-sm break-all text-text-dark" dir="ltr">
          {link}
        </code>
      </div>
      <div className="flex gap-3">
        <button
          onClick={handleCopy}
          className={`flex-1 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
            copied ? "bg-secondary text-white" : "btn-primary"
          }`}
        >
          {copied ? (
            <>
              <Check className="w-5 h-5" />
              {txt.tools?.copiedButton || "Copied!"}
            </>
          ) : (
            <>
              <Copy className="w-5 h-5" />
              {txt.tools?.copyButton || "Copy Link"}
            </>
          )}
        </button>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 rounded-xl font-medium border-2 border-primary text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
        >
          <ExternalLink className="w-5 h-5" />
          {txt.tools?.testLink || "Test Link"}
        </a>
      </div>
    </div>
  );
}
