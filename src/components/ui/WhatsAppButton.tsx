import { useLanguage } from "../../context/LanguageContext";
import { getWhatsAppUrl } from "../../config";
import { WhatsAppIcon } from "./SocialIcons";

export function WhatsAppButton() {
  const { language, isRTL } = useLanguage();
  const whatsappUrl = getWhatsAppUrl(language);
  const finalUrl = whatsappUrl || "https://wa.me/";

  return (
    <a
      href={finalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-24 ${isRTL ? "left-6" : "right-6"} z-40 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#128C7E] hover:scale-110 transition-all duration-300 flex items-center justify-center group`}
      aria-label="Contact via WhatsApp"
    >
      {/* White icon on green background */}
      <WhatsAppIcon size={28} color="white" />
      
      {/* Tooltip */}
      <span
        className={`absolute ${isRTL ? "left-16" : "right-16"} whitespace-nowrap bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
      >
        {language === "he" ? "שלח הודעה בוואטסאפ" : "Message on WhatsApp"}
      </span>
    </a>
  );
}
