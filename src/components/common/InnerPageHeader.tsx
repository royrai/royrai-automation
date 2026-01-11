import { ReactNode } from "react";

interface IInnerPageHeaderProps {
  /** Main title of the page */
  title: string;
  /** Optional subtitle/description */
  subtitle?: string;
  /** Optional icon element to display above the title */
  icon?: ReactNode;
  /** Custom className for additional styling */
  className?: string;
}

/**
 * InnerPageHeader - Consistent header component for inner pages (Tools section)
 *
 * Provides a standardized look for page titles with optional
 * icon and subtitle.
 */
export function InnerPageHeader({
  title,
  subtitle,
  icon,
  className = ""
}: IInnerPageHeaderProps) {
  return (
    <div className={`text-center mb-12 ${className}`}>
      {icon && (
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
          {icon}
        </div>
      )}
      <h1 className="font-heading text-3xl md:text-4xl text-text-dark mb-4">
        {title}
      </h1>
      {subtitle && (
        <p className="text-text-light max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
