import { ReactNode } from "react";

interface IInnerPageLayoutProps {
  /** Page content */
  children: ReactNode;
  /** Additional className for main element */
  className?: string;
  /** Max width variant: "default" (no limit), "narrow" (max-w-2xl), "medium" (max-w-4xl), "wide" (max-w-6xl) */
  maxWidth?: "default" | "narrow" | "medium" | "wide";
}

/**
 * InnerPageLayout - Consistent layout wrapper for inner pages (Tools section)
 *
 * Provides standardized padding, background, and container styling
 * for inner pages in the application.
 */
export function InnerPageLayout({
  children,
  className = "",
  maxWidth = "default"
}: IInnerPageLayoutProps) {
  const maxWidthClasses = {
    default: "",
    narrow: "max-w-2xl mx-auto",
    medium: "max-w-4xl mx-auto",
    wide: "max-w-6xl mx-auto",
  };

  return (
    <main className={`min-h-screen py-16 bg-gray-50 ${className}`}>
      <div className="container-custom">
        <div className={maxWidthClasses[maxWidth]}>
          {children}
        </div>
      </div>
    </main>
  );
}
