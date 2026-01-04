import { useState, FormEvent } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Mail, Copy, Check, AlertCircle, ExternalLink } from "lucide-react";

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
  
  const [generatedLink, setGeneratedLink] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<{ to?: string; subject?: string; body?: string }>({});
  const [provider, setProvider] = useState<EmailProvider>("gmail");
  
  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    body: "",
  });

  const texts = {
    he: {
      title: "יוצר קישור מייל",
      subtitle: "צור קישור שפותח הודעת מייל חדשה עם תוכן מוכן",
      providerLabel: "סוג הקישור",
      providers: {
        gmail: "Gmail (בדפדפן)",
        outlook: "Outlook (בדפדפן)",
        mailto: "תוכנת מייל (ברירת מחדל)",
      },
      providerNote: "Gmail ו-Outlook יפתחו בדפדפן. השולח יהיה מי שמחובר לחשבון.",
      toLabel: "כתובת מייל של הנמען (אליו תישלח ההודעה)",
      toPlaceholder: "example@email.com",
      toRequired: "כתובת מייל היא שדה חובה",
      toInvalid: "כתובת מייל לא תקינה",
      subjectLabel: "נושא ההודעה",
      subjectPlaceholder: "נושא ההודעה",
      subjectRequired: "נושא הוא שדה חובה",
      bodyLabel: "תוכן ההודעה",
      bodyPlaceholder: "תוכן ההודעה...",
      bodyRequired: "תוכן ההודעה הוא שדה חובה",
      generateButton: "צור קישור",
      generatedLink: "הקישור שנוצר:",
      copyButton: "העתק קישור",
      copiedButton: "הועתק!",
      testLink: "בדוק קישור",
    },
    en: {
      title: "Email Link Generator",
      subtitle: "Create a link that opens a new email with pre-filled content",
      providerLabel: "Link type",
      providers: {
        gmail: "Gmail (in browser)",
        outlook: "Outlook (in browser)",
        mailto: "Email app (default)",
      },
      providerNote: "Gmail and Outlook will open in browser. Sender will be whoever is logged in.",
      toLabel: "Recipient email address (who will receive the email)",
      toPlaceholder: "example@email.com",
      toRequired: "Email address is required",
      toInvalid: "Invalid email address",
      subjectLabel: "Email subject",
      subjectPlaceholder: "Message subject",
      subjectRequired: "Subject is required",
      bodyLabel: "Email body",
      bodyPlaceholder: "Message content...",
      bodyRequired: "Message body is required",
      generateButton: "Generate Link",
      generatedLink: "Generated link:",
      copyButton: "Copy Link",
      copiedButton: "Copied!",
      testLink: "Test Link",
    },
  };

  const t = isRTL ? texts.he : texts.en;

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const generateGmailLink = (): string => {
    let url = "https://mail.google.com/mail/?view=cm&fs=1";
    url += `&to=${encodeURIComponent(formData.to.trim())}`;
    url += `&su=${encodeURIComponent(formData.subject.trim())}`;
    url += `&body=${encodeURIComponent(formData.body.trim())}`;
    return url;
  };

  const generateOutlookLink = (): string => {
    let url = "https://outlook.live.com/mail/0/deeplink/compose";
    const params: string[] = [];
    params.push(`to=${encodeURIComponent(formData.to.trim())}`);
    params.push(`subject=${encodeURIComponent(formData.subject.trim())}`);
    params.push(`body=${encodeURIComponent(formData.body.trim())}`);
    return url + "?" + params.join("&");
  };

  const generateMailtoLink = (): string => {
    let link = `mailto:${encodeURIComponent(formData.to.trim())}`;
    const params: string[] = [];
    params.push(`subject=${encodeURIComponent(formData.subject.trim())}`);
    params.push(`body=${encodeURIComponent(formData.body.trim())}`);
    return link + "?" + params.join("&");
  };

  const handleGenerate = (e: FormEvent) => {
    e.preventDefault();
    
    const newErrors: { to?: string; subject?: string; body?: string } = {};
    
    if (!formData.to.trim()) {
      newErrors.to = t.toRequired;
    } else if (!validateEmail(formData.to.trim())) {
      newErrors.to = t.toInvalid;
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = t.subjectRequired;
    }
    
    if (!formData.body.trim()) {
      newErrors.body = t.bodyRequired;
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
    setCopied(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <main className="min-h-screen py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-heading text-3xl md:text-4xl text-text-dark mb-4">
            {t.title}
          </h1>
          <p className="text-text-light max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <form onSubmit={handleGenerate}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">
                    {t.providerLabel}
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(["gmail", "outlook", "mailto"] as EmailProvider[]).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setProvider(p)}
                        className={`px-4 py-3 rounded-xl border-2 transition-all text-sm font-medium ${
                          provider === p
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-gray-200 hover:border-primary/50 text-text-dark"
                        }`}
                      >
                        {t.providers[p]}
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-text-light">
                    {t.providerNote}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-1">
                    {t.toLabel} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.to}
                    onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                    placeholder={t.toPlaceholder}
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
                
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-1">
                    {t.subjectLabel} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder={t.subjectPlaceholder}
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
                
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-1">
                    {t.bodyLabel} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.body}
                    onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                    placeholder={t.bodyPlaceholder}
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
                {t.generateButton}
              </button>
            </form>
          </div>

          {generatedLink && (
            <div className="bg-white rounded-2xl shadow-sm p-6 animate-fade-in">
              <h3 className="font-heading text-lg mb-4">{t.generatedLink}</h3>
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <code className="text-sm break-all text-text-dark" dir="ltr">
                  {generatedLink}
                </code>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleCopy}
                  className={`flex-1 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                    copied
                      ? "bg-secondary text-white"
                      : "btn-primary"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5" />
                      {t.copiedButton}
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      {t.copyButton}
                    </>
                  )}
                </button>
                <a
                  href={generatedLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-xl font-medium border-2 border-primary text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-5 h-5" />
                  {t.testLink}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
