import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { Mail, Wrench, ArrowRight, ArrowLeft } from "lucide-react";
import { WhatsAppIcon } from "../components/ui/SocialIcons";

/**
 * ToolsIndex - Landing page for the Tools section
 * 
 * Displays available tools (Email Link Generator, WhatsApp Link Generator)
 * and allows users to navigate to each tool.
 */
export function ToolsIndex() {
  const { isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const texts = {
    he: {
      title: "כלים",
      subtitle: "כלים שימושיים ליצירת קישורים מוכנים לשליחה",
      emailTool: {
        title: "יוצר קישור מייל",
        description: "צור קישור שפותח הודעת מייל חדשה עם נמען, נושא ותוכן מוכנים. תומך ב-Gmail, Outlook ותוכנות מייל.",
        cta: "צור קישור מייל",
      },
      whatsappTool: {
        title: "יוצר קישור וואטסאפ",
        description: "צור קישור שפותח שיחת וואטסאפ עם מספר טלפון והודעה מוכנה לשליחה.",
        cta: "צור קישור וואטסאפ",
      },
    },
    en: {
      title: "Tools",
      subtitle: "Useful tools for creating ready-to-send links",
      emailTool: {
        title: "Email Link Generator",
        description: "Create a link that opens a new email with pre-filled recipient, subject, and body. Supports Gmail, Outlook, and email apps.",
        cta: "Create Email Link",
      },
      whatsappTool: {
        title: "WhatsApp Link Generator",
        description: "Create a link that opens a WhatsApp chat with a phone number and pre-filled message.",
        cta: "Create WhatsApp Link",
      },
    },
  };

  const t = isRTL ? texts.he : texts.en;

  return (
    <main className="min-h-screen py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Wrench className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-heading text-3xl md:text-4xl text-text-dark mb-4">
            {t.title}
          </h1>
          <p className="text-text-light max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Email Link Generator Card */}
          <Link
            to="/tools/email-link"
            className="group bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-primary/30"
          >
            <div className="flex flex-col h-full">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-4 group-hover:bg-primary/20 transition-colors">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              
              <h2 className="font-heading text-xl text-text-dark mb-2">
                {t.emailTool.title}
              </h2>
              
              <p className="text-text-light text-sm mb-4 flex-grow">
                {t.emailTool.description}
              </p>
              
              <div className={`flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all ${isRTL ? "flex-row-reverse" : ""}`}>
                <span>{t.emailTool.cta}</span>
                <Arrow size={18} />
              </div>
            </div>
          </Link>

          {/* WhatsApp Link Generator Card */}
          <Link
            to="/tools/whatsapp-link"
            className="group bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-primary/30"
          >
            <div className="flex flex-col h-full">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-4 group-hover:bg-primary/20 transition-colors">
                <WhatsAppIcon size={24} />
              </div>
              
              <h2 className="font-heading text-xl text-text-dark mb-2">
                {t.whatsappTool.title}
              </h2>
              
              <p className="text-text-light text-sm mb-4 flex-grow">
                {t.whatsappTool.description}
              </p>
              
              <div className={`flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all ${isRTL ? "flex-row-reverse" : ""}`}>
                <span>{t.whatsappTool.cta}</span>
                <Arrow size={18} />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
