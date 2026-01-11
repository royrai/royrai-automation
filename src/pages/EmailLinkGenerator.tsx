import { useState, FormEvent } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "../hooks/useTranslation";
import { Mail, AlertCircle } from "lucide-react";
import { validateEmail, validateRequired } from "../utils/validation";
import { InnerPageLayout } from "../components/common/InnerPageLayout";
import { InnerPageHeader } from "../components/common/InnerPageHeader";
import { GeneratedLinkResult } from "../components/ui/GeneratedLinkResult";
import { constants } from "../constants";

type EmailProvider = "gmail" | "outlook" | "mailto";

/**
 * EmailLinkGenerator - Creates shareable email links with pre-filled content
 * 
 * This tool allows users to generate links that open email clients
 * with pre-filled recipient, subject, and body.
 * 
 * Supports:
 * - Gmail (opens in browser)
 * - Outlook (opens in browser)
 * - mailto (opens default email app)
 */
export function EmailLinkGenerator() {
  const { isRTL } = useLanguage();
  const txt = useTranslation();
  
  const [generatedLink, setGeneratedLink] = useState<string>("");
  const [errors, setErrors] = useState<{ to?: string; subject?: string; body?: string }>({});
  const [provider, setProvider] = useState<EmailProvider>("gmail");
  
  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    body: "",
  });

  // Get translations
  const toolsT = txt.tools;
  const emailT = toolsT?.emailLink;

  const generateGmailLink = (): string => {
    let url = constants.urls.email.gmail;
    url += `&to=${encodeURIComponent(formData.to.trim())}`;
    url += `&su=${encodeURIComponent(formData.subject.trim())}`;
    url += `&body=${encodeURIComponent(formData.body.trim())}`;
    return url;
  };

  const generateOutlookLink = (): string => {
    let url = constants.urls.email.outlook;
    const params: string[] = [];
    params.push(`to=${encodeURIComponent(formData.to.trim())}`);
    params.push(`subject=${encodeURIComponent(formData.subject.trim())}`);
    params.push(`body=${encodeURIComponent(formData.body.trim())}`);
    return url + "?" + params.join("&");
  };

  const generateMailtoLink = (): string => {
    let link = constants.urls.email.mailto(formData.to.trim());
    const params: string[] = [];
    params.push(`subject=${encodeURIComponent(formData.subject.trim())}`);
    params.push(`body=${encodeURIComponent(formData.body.trim())}`);
    return link + "?" + params.join("&");
  };

  const handleGenerate = (e: FormEvent) => {
    e.preventDefault();
    
    const newErrors: { to?: string; subject?: string; body?: string } = {};
    
    if (!validateRequired(formData.to)) {
      newErrors.to = emailT?.toRequired || "Email address is required";
    } else if (!validateEmail(formData.to.trim())) {
      newErrors.to = emailT?.toInvalid || "Invalid email address";
    }
    
    if (!validateRequired(formData.subject)) {
      newErrors.subject = emailT?.subjectRequired || "Subject is required";
    }
    
    if (!validateRequired(formData.body)) {
      newErrors.body = emailT?.bodyRequired || "Message body is required";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    
    let link: string;
    switch (provider) {
      case "gmail":
        link = generateGmailLink();
        break;
      case "outlook":
        link = generateOutlookLink();
        break;
      default:
        link = generateMailtoLink();
    }
    
    setGeneratedLink(link);
  };

  const providerOptions: { key: EmailProvider; label: string }[] = [
    { key: "gmail", label: emailT?.providers?.gmail || "Gmail (in browser)" },
    { key: "outlook", label: emailT?.providers?.outlook || "Outlook (in browser)" },
    { key: "mailto", label: emailT?.providers?.mailto || "Email app (default)" },
  ];

  return (
    <InnerPageLayout>
      <InnerPageHeader
        title={emailT?.title || "Email Link Generator"}
        subtitle={emailT?.subtitle || "Create a link that opens a new email with pre-filled content"}
        icon={<Mail className="w-8 h-8 text-primary" />}
      />

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <form onSubmit={handleGenerate}>
            <div className="space-y-4">
              {/* Provider Selection */}
              <div>
                <label className="block text-sm font-medium text-text-dark mb-2">
                  {emailT?.providerLabel || "Link type"}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {providerOptions.map((p) => (
                    <button
                      key={p.key}
                      type="button"
                      onClick={() => setProvider(p.key)}
                      className={`px-4 py-3 rounded-xl border-2 transition-all text-sm font-medium ${
                        provider === p.key
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-gray-200 hover:border-primary/50 text-text-dark"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-xs text-text-light">
                  {emailT?.providerNote || "Gmail and Outlook will open in browser. Sender will be whoever is logged in."}
                </p>
              </div>
              
              {/* To Field */}
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">
                  {emailT?.toLabel || "Recipient email address"} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.to}
                  onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                  placeholder={emailT?.toPlaceholder || "example@email.com"}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                    errors.to ? "border-red-500" : "border-gray-200"
                  }`}
                  dir="ltr"
                />
                {errors.to && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.to}
                  </p>
                )}
              </div>
              
              {/* Subject Field */}
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">
                  {emailT?.subjectLabel || "Email subject"} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder={emailT?.subjectPlaceholder || "Message subject"}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                    errors.subject ? "border-red-500" : "border-gray-200"
                  }`}
                  dir={isRTL ? "rtl" : "ltr"}
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.subject}
                  </p>
                )}
              </div>
              
              {/* Body Field */}
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">
                  {emailT?.bodyLabel || "Email body"} <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.body}
                  onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                  placeholder={emailT?.bodyPlaceholder || "Message content..."}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none ${
                    errors.body ? "border-red-500" : "border-gray-200"
                  }`}
                  dir={isRTL ? "rtl" : "ltr"}
                />
                {errors.body && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.body}
                  </p>
                )}
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full mt-6 btn-primary py-3 flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              {toolsT?.generateButton || "Generate Link"}
            </button>
          </form>
        </div>

        {generatedLink && <GeneratedLinkResult link={generatedLink} />}
      </div>
    </InnerPageLayout>
  );
}
