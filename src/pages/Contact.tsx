import { useState, FormEvent } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "../hooks/useTranslation";
import { Send, AlertCircle, CheckCircle } from "lucide-react";
// Import PhoneInput from its folder
import { PhoneInput, validatePhoneNumber, formatPhoneForDisplay, getUserCountryCode } from "../components/ui/PhoneInput";
import { WhatsAppIcon, InstagramIcon, LinkedInIcon, FacebookIcon, EmailIcon } from "../components/ui/SocialIcons";
import { siteData } from "../config/site-data";

// Webhook URL for form submission
const WEBHOOK_URL = "https://hook.eu1.make.com/lshj73hpn4d93q1phj3xqq1dwy6ujqt6";

interface FormData {
  name: string;
  email: string;
  phone: string;
  dialCode: string;
  localNumber: string;
  countryCode: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

/**
 * Contact page component with quick contact buttons and contact form.
 * Form submission is sent to Make.com webhook for automation processing.
 */
export function Contact() {
  const { language, isRTL } = useLanguage();
  const t = useTranslation();
  
  const userCountry = getUserCountryCode();
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    dialCode: "+972",
    localNumber: "",
    countryCode: "IL",
    subject: "",
    message: "",
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const { contact, social } = siteData;
  
  const whatsappMessage = contact.whatsappMessages[language as "en" | "he"] || contact.whatsappMessages.en;
  const whatsappUrl = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const socialLinks = [
    { icon: WhatsAppIcon, label: "WhatsApp", href: whatsappUrl, enabled: !!contact.whatsappNumber },
    { icon: FacebookIcon, label: "Facebook", href: social.facebook, enabled: !!social.facebook },
    { icon: InstagramIcon, label: "Instagram", href: social.instagram, enabled: !!social.instagram },
    { icon: LinkedInIcon, label: "LinkedIn", href: social.linkedin, enabled: !!social.linkedin },
    { icon: EmailIcon, label: "Email", href: `mailto:${contact.email}`, enabled: !!contact.email },
  ];

  const validateEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handlePhoneChange = (fullNumber: string, countryCode: string, localNumber: string, dialCode: string) => {
    setFormData({ ...formData, phone: fullNumber, dialCode, localNumber, countryCode });
    if (errors.phone) setErrors({ ...errors, phone: undefined });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = t.contact?.nameRequired || "Name is required";
    if (!formData.email.trim()) newErrors.email = t.contact?.emailRequired || "Email is required";
    else if (!validateEmail(formData.email.trim())) newErrors.email = t.contact?.emailInvalid || "Invalid email";
    if (!formData.localNumber.trim()) newErrors.phone = t.contact?.phoneRequired || "Phone is required";
    else if (!validatePhoneNumber(formData.localNumber)) newErrors.phone = t.contact?.phoneInvalid || "Invalid phone";
    if (!formData.message.trim()) newErrors.message = t.contact?.messageRequired || "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setSubmitStatus("submitting");

    // Prepare data for webhook
    const webhookData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone, // Full phone with dial code
      dialCode: formData.dialCode,
      localNumber: formData.localNumber,
      countryCode: formData.countryCode,
      phoneFormatted: formatPhoneForDisplay(formData.dialCode, formData.localNumber),
      subject: formData.subject.trim() || "Contact Form",
      message: formData.message.trim(),
      language: language,
      timestamp: new Date().toISOString(),
      source: "royrai.com/contact",
    };

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          phone: "",
          dialCode: "+972",
          localNumber: "",
          countryCode: "IL",
          subject: "",
          message: "",
        });
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus("idle"), 5000);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  return (
    <main className="min-h-screen py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl md:text-4xl text-text-dark mb-4">
            {t.contact?.title || "Contact Us"}
          </h1>
          <p className="text-text-light max-w-2xl mx-auto">
            {t.contact?.subtitle || "We'd love to hear from you!"}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Social Buttons */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h2 className="font-heading text-lg mb-4 text-center text-text-dark">
              {t.contact?.connectWith || "Choose your preferred way to reach us"}
            </h2>
            <div className="flex justify-center gap-4">
              {socialLinks.map((link) => {
                const IconComponent = link.icon;
                if (!link.enabled) {
                  return (
                    <div key={link.label} className="relative group">
                      <div
                        className="flex flex-col items-center gap-1 p-3 rounded-xl border border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed"
                        title={t.contact?.comingSoon || "Coming soon"}
                      >
                        <IconComponent size={28} />
                        <span className="text-xs text-text-light">{link.label}</span>
                      </div>
                    </div>
                  );
                }
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1 p-3 rounded-xl border border-gray-200 hover:border-primary/30 hover:bg-gray-50 transition-all"
                  >
                    <IconComponent size={28} />
                    <span className="text-xs text-text-light">{link.label}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-heading text-lg mb-6 text-center text-text-dark">
              {t.contact?.formTitle || "Send us a message"}
            </h2>
            
            {/* Success Message */}
            {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="text-green-700">
                  {t.contact?.form?.success || "Thank you! I'll get back to you soon."}
                </p>
              </div>
            )}

            {/* Error Message */}
            {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-red-700">
                  {t.contact?.form?.error || "Something went wrong. Please try again."}
                </p>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-1">
                    {t.contact?.nameLabel || "Your name"} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.contact?.namePlaceholder || "What is your name?"}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                      errors.name ? "border-red-500" : "border-gray-200"
                    }`}
                    dir={isRTL ? "rtl" : "ltr"}
                    disabled={submitStatus === "submitting"}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-1">
                    {t.contact?.emailLabel || "Your email"} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t.contact?.emailPlaceholder || "your@email.com"}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                      errors.email ? "border-red-500" : "border-gray-200"
                    }`}
                    dir="ltr"
                    disabled={submitStatus === "submitting"}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <PhoneInput
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  defaultCountry={userCountry}
                  label={t.contact?.phoneLabel || "Your phone number"}
                  placeholder={t.contact?.phonePlaceholder || "501234567"}
                  required
                  error={errors.phone}
                />

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-1">
                    {t.contact?.subjectLabel || "Subject (optional)"}
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder={t.contact?.subjectPlaceholder || "What would you like to discuss?"}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                    dir={isRTL ? "rtl" : "ltr"}
                    disabled={submitStatus === "submitting"}
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-1">
                    {t.contact?.messageLabel || "Your message"} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t.contact?.messagePlaceholder || "Tell us about your project..."}
                    rows={5}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none ${
                      errors.message ? "border-red-500" : "border-gray-200"
                    }`}
                    dir={isRTL ? "rtl" : "ltr"}
                    disabled={submitStatus === "submitting"}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={submitStatus === "submitting"}
                className="w-full mt-6 btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitStatus === "submitting" ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {t.contact?.submitting || "Sending..."}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {t.contact?.submitButton || "Send Message"}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
