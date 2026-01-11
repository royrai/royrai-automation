import { Link } from "react-router-dom";
import { useTranslation } from "../hooks/useTranslation";
import { Mail, Wrench } from "lucide-react";
import { WhatsAppIcon } from "../components/ui/SocialIcons";
import { InnerPageLayout } from "../components/common/InnerPageLayout";
import { InnerPageHeader } from "../components/common/InnerPageHeader";

/**
 * ToolsIndex - Landing page for all available tools
 * 
 * Displays a grid of available tools with links to each tool page.
 */
export function ToolsIndex() {
  const txt = useTranslation();
  const toolsT = txt.tools;

  const tools = [
    {
      to: "/tools/email-link",
      icon: <Mail className="w-8 h-8 text-primary" />,
      title: toolsT?.emailLink?.title || "Email Link Generator",
      description: toolsT?.emailLink?.subtitle || "Create email links with pre-filled content",
    },
    {
      to: "/tools/whatsapp-link",
      icon: <WhatsAppIcon size={32} />,
      title: toolsT?.whatsappLink?.title || "WhatsApp Link Generator",
      description: toolsT?.whatsappLink?.subtitle || "Create WhatsApp links with pre-filled messages",
    },
  ];

  return (
    <InnerPageLayout>
      <InnerPageHeader
        title={toolsT?.title || "Free Tools"}
        subtitle={toolsT?.subtitle || "Useful tools to help you with your daily tasks"}
        icon={<Wrench className="w-8 h-8 text-primary" />}
      />

      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.to}
              to={tool.to}
              className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  {tool.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-lg text-text-dark mb-2 group-hover:text-primary transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-text-light text-sm">
                    {tool.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </InnerPageLayout>
  );
}
