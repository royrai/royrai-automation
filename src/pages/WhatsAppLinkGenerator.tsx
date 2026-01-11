import { useState, FormEvent } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "../hooks/useTranslation";
import {
  PhoneInput,
  formatPhoneForWhatsApp,
  getUserCountryCode,
} from "../components/ui/PhoneInput";
import { validatePhoneNumber } from "../utils/validation";
import { WhatsAppIcon } from "../components/ui/SocialIcons";
import { InnerPageLayout } from "../components/common/InnerPageLayout";
import { InnerPageHeader } from "../components/common/InnerPageHeader";
import { GeneratedLinkResult } from "../components/ui/GeneratedLinkResult";
import { constants } from "../constants";

/**
 * WhatsAppLinkGenerator - Creates shareable WhatsApp links with pre-filled messages
 *
 * This tool allows users to generate wa.me links that open WhatsApp
 * with a specific phone number and optional pre-filled message.
 */
export function WhatsAppLinkGenerator() {
  const { isRTL } = useLanguage();
  const txt = useTranslation();

  const [generatedLink, setGeneratedLink] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");

  // Detect user's country for default phone input
  const userCountry = getUserCountryCode();

  const [formData, setFormData] = useState({
    phone: "",
    countryCode: userCountry,
    localNumber: "",
    message: "",
  });

  // Get translations
  const toolsT = txt.tools;
  const whatsappT = toolsT?.whatsappLink;

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
      setPhoneError(whatsappT?.phoneError || "Please enter a valid phone number (at least 7 digits)");
      return;
    }

    setPhoneError("");

    // Format phone for WhatsApp (just digits, no +)
    const phoneNumber = formatPhoneForWhatsApp(formData.phone);

    let link: string;
    if (formData.message.trim()) {
      link = constants.urls.whatsapp.withMessage(phoneNumber, formData.message.trim());
    } else {
      link = constants.urls.whatsapp.withNumber(phoneNumber);
    }

    setGeneratedLink(link);
  };

  return (
    <InnerPageLayout>
      <InnerPageHeader
        title={whatsappT?.title || "WhatsApp Link Generator"}
        subtitle={whatsappT?.subtitle || "Create a link that opens a WhatsApp chat with a pre-filled message"}
        icon={<WhatsAppIcon size={32} />}
      />

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
                label={whatsappT?.phoneLabel || "Phone number"}
                placeholder={whatsappT?.phonePlaceholder || "501234567"}
                required
                error={phoneError}
              />

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">
                  {whatsappT?.messageLabel || "Pre-filled message (optional)"}
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder={whatsappT?.messagePlaceholder || "Message that will appear in the chat box..."}
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
              {toolsT?.generateButton || "Generate Link"}
            </button>
          </form>
        </div>

        {/* Generated Link */}
        {generatedLink && <GeneratedLinkResult link={generatedLink} />}
      </div>
    </InnerPageLayout>
  );
}
