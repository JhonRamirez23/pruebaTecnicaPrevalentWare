import * as React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  content: string;
}

export const Card = ({ className, ...props }: CardProps) => (
  <div
    className={`rounded-lg border bg-white shadow-sm ${className ?? ''}`}
    {...props}
  />
);

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  content: string;
}

export const CardHeader = ({ className, ...props }: CardHeaderProps) => (
  <div className={`p-4 border-b ${className ?? ''}`} {...props} />
);

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  title: string;
  content: string;
}

export const CardTitle = ({ className, ...props }: CardTitleProps) => (
  <h3 className={`text-lg font-semibold ${className ?? ''}`} {...props} />
);

interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  title: string;
  content: string;
}

export const CardDescription = ({
  className,
  ...props
}: CardDescriptionProps) => (
  <p className={`text-sm text-gray-500 ${className ?? ''}`} {...props} />
);

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  content: string;
}

export const CardContent = ({ className, ...props }: CardContentProps) => (
  <div className={`p-4 ${className ?? ''}`} {...props} />
);
