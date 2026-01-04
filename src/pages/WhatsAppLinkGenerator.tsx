import { useState, FormEvent } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Copy, Check, ExternalLink } from "lucide-react";
import {
  PhoneInput,
  validatePhoneNumber,
  formatPhoneForWhatsApp,
  getUserCountryCode,
} from "../components/ui/PhoneInput";
import { WhatsAppIcon } from "../components/ui/SocialIcons";

/**
 * WhatsAppLinkGenerator - Creates shareable WhatsApp links with pre-filled messages
 *
 * This tool allows users to generate wa.me links that open WhatsApp
 * with a specific phone number and optional pre-filled message.
 */
export function WhatsAppLinkGenerator() {
  const { isRTL } = useLanguage();

  const [generatedLink, setGeneratedLink] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [phoneError, setPhoneError] = useState<string>("");

  // Detect user's country for default phone input
  const userCountry = getUserCountryCode();

  const [formData, setFormData] = useState({
    phone: "",
    countryCode: userCountry,
    localNumber: "",
    message: "",
  });

  const texts = {
    he: {
      title: "יוצר קישור וואטסאפ",
      subtitle: "צור קישור שפותח שיחת וואטסאפ עם הודעה מוכנה לשליחה",
      phoneLabel: "מספר טלפון",
      phonePlaceholder: "501234567",
      phoneError: "יש להזין מספר טלפון תקין (לפחות 7 ספרות)",
      messageLabel: "הודעה מוכנה (אופציונלי)",
      messagePlaceholder: "הודעה שתופיע בתיבת השליחה...",
      generateButton: "צור קישור",
      generatedLink: "הקישור שנוצר:",
      copyButton: "העתק קישור",
      copiedButton: "הועתק!",
      testLink: "בדוק קישור",
    },
    en: {
      title: "WhatsApp Link Generator",
      subtitle:
        "Create a link that opens a WhatsApp chat with a pre-filled message",
      phoneLabel: "Phone number",
      phonePlaceholder: "501234567",
      phoneError: "Please enter a valid phone number (at least 7 digits)",
      messageLabel: "Pre-filled message (optional)",
      messagePlaceholder: "Message that will appear in the chat box...",
      generateButton: "Generate Link",
      generatedLink: "Generated link:",
      copyButton: "Copy Link",
      copiedButton: "Copied!",
      testLink: "Test Link",
    },
  };

  const t = isRTL ? texts.he : texts.en;

  const handlePhoneChange = (
    fullNumber: string,
    countryCode: string,
    localNumber: string
  ) => {
    setFormData({
      ...formData,
      phone: fullNumber,
      countryCode,
      localNumber,
    });
    setPhoneError("");
  };

  const handleGenerate = (e: FormEvent) => {
    e.preventDefault();

    // Validate phone
    if (!validatePhoneNumber(formData.localNumber)) {
      setPhoneError(t.phoneError);
      return;
    }

    setPhoneError("");

    // Format phone for WhatsApp (just digits, no +)
    const phoneNumber = formatPhoneForWhatsApp(formData.phone);

    let link = `https://wa.me/${phoneNumber}`;

    if (formData.message.trim()) {
      link += `?text=${encodeURIComponent(formData.message.trim())}`;
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
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <WhatsAppIcon size={32} />
          </div>
          <h1 className="font-heading text-3xl md:text-4xl text-text-dark mb-4">
            {t.title}
          </h1>
          <p className="text-text-light max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Form */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <form onSubmit={handleGenerate}>
              <div className="space-y-4">
                {/* Phone Input */}
                <PhoneInput
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  defaultCountry={userCountry}
                  isRTL={isRTL}
                  label={t.phoneLabel}
                  placeholder={t.phonePlaceholder}
                  required
                  error={phoneError}
                />

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-1">
                    {t.messageLabel}
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder={t.messagePlaceholder}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    dir={isRTL ? "rtl" : "ltr"}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-6 btn-primary py-3 flex items-center justify-center gap-2"
              >
                <WhatsAppIcon size={20} />
                {t.generateButton}
              </button>
            </form>
          </div>

          {/* Generated Link */}
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
                    copied ? "bg-secondary text-white" : "btn-primary"
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
